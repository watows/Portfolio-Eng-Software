import random
from datetime import datetime, timedelta
from app.database.connection import get_db_connection
import logging

logger = logging.getLogger(__name__)

def gerar_cardapio_personalizado(parametros):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        selected_date = parametros.get("date")
        if not selected_date:
            raise ValueError("Data não fornecida nos parâmetros.")

        selected_date = datetime.strptime(selected_date, "%Y-%m-%d")
        cursor.execute("""
            SELECT id, txt_breve_material, qtd_g, kcal, gluten, lactose, osso, fragmento, espinha, cat1, categoria_incidencia1, incidencia_mes1, preco_plano
            FROM receitas
            WHERE kcal > 0 AND preco_plano > 0
        """)
        receitas = cursor.fetchall()

        if not receitas:
            raise ValueError("Nenhuma receita válida encontrada no banco de dados.")

        categorias_distribuidas = {cat: [] for cat in ["C1/C2", "A", "AI", "F", "GE", "GL", "S1", "S2", "S3", "S5", "SI", "SE", "FR"]}
        incidencias_restantes = {}

        for receita in receitas:
            categoria = receita[9]
            incidencia = receita[11] or 0
            kcal = receita[3] or 0
            preco = receita[12] or 0

            if categoria in categorias_distribuidas:
                categorias_distribuidas[categoria].append({
                    "id": receita[0],
                    "name": receita[1].strip(),
                    "quantity": f"{receita[2]}g",
                    "kcal": kcal,
                    "tags": " ".join(tag for i, tag in enumerate(["G", "L", "O", "FO", "E"]) if receita[4 + i]),
                    "incidencia_restante": incidencia,
                    "preco": preco
                })
                incidencias_restantes[receita[0]] = incidencia

        dias_uteis = [selected_date + timedelta(days=i) for i in range(31) if (selected_date + timedelta(days=i)).weekday() < 5]
        cardapio = []

        for day in dias_uteis:
            daily_menu = []

            # Garantir duas carnes distintas (C1/C2)
            carnes = random.sample(categorias_distribuidas["C1/C2"], 2)
            if len(carnes) < 2:
                raise ValueError("Não foi possível selecionar duas carnes distintas para o cardápio.")
            daily_menu.extend(carnes)

            # Preencher demais categorias
            ordem_categorias = ["A", "AI", "F", "GE", "GL", "S1", "S2", "S3", "S3", "S5"]
            for categoria in ordem_categorias:
                if categorias_distribuidas[categoria]:
                    receita = random.choice(categorias_distribuidas[categoria])
                    if receita not in daily_menu:
                        daily_menu.append(receita)

            # Adicionar sobremesa (SI ou SE)
            sobremesa_categoria = "SI" if day.weekday() == 0 else "SE"
            if categorias_distribuidas[sobremesa_categoria]:
                sobremesa = random.choice(categorias_distribuidas[sobremesa_categoria])
                daily_menu.append(sobremesa)

            # Adicionar fruta (FR)
            if categorias_distribuidas["FR"]:
                fruta = random.choice(categorias_distribuidas["FR"])
                daily_menu.append(fruta)

            # Finalizar o dia no cardápio
            day_data = {
                "date": day.strftime("%Y-%m-%d"),
                "day": day.strftime("%A"),
                "items": daily_menu,
            }
            cardapio.append(day_data)

        for receita_id, incidencia in incidencias_restantes.items():
            if incidencia > 0:
                logger.warning(f"Receita ID {receita_id} não foi alocada completamente (restam {incidencia} usos).")

        return cardapio
    except Exception as e:
        logger.error(f"Erro ao gerar cardápio: {e}")
        raise
    finally:
        cursor.close()
        conn.close()