import random
from datetime import datetime, timedelta
from app.database.connection import get_db_connection
import logging

logger = logging.getLogger(__name__)

def gerar_cardapio_personalizado(parametros):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        logger.info(f"Parâmetros recebidos: {parametros}")

        if 'date' not in parametros:
            raise ValueError("Data não fornecida nos parâmetros.")
        
        selected_date = parametros.get("date")
        qtd_g = parametros.get("qtd_g", 150)
        kcal = parametros.get("kcal", 300)

        # Validar e converter a data
        try:
            selected_date = datetime.strptime(selected_date, "%Y-%m-%d")
        except ValueError as e:
            logger.error(f"Formato de data inválido: {selected_date}")
            raise ValueError("Formato de data inválido. Esperado: 'YYYY-MM-DD'.")

        # Buscar receitas no banco
        cursor.execute("""
            SELECT id, txt_breve_material, qtd_g, kcal, gluten, lactose, osso, fragmento, espinha, cat1, categoria_incidencia1, incidencia_mes1
            FROM receitas
        """)
        receitas = cursor.fetchall()
        logger.info(f"Receitas obtidas: {len(receitas)}")

        if not receitas:
            raise ValueError("Nenhuma receita encontrada no banco de dados.")

        # Preparar os dados das receitas
        ids, nomes, features, cardapio_tags, categorias, incidencias, incidencias_mes = [], [], [], [], [], [], []
        for receita in receitas:
            ids.append(receita[0])
            nomes.append(receita[1])
            features.append([receita[2] or 0, receita[3] or 0])

            tags = []
            if receita[4]: tags.append("G")
            if receita[5]: tags.append("L")
            if receita[6]: tags.append("O")
            if receita[7]: tags.append("FO")
            if receita[8]: tags.append("E")
            cardapio_tags.append(" ".join(tags))
            categorias.append(receita[9])  # Categoria de receita (ex: C1/C2, A, F, etc.)
            incidencias.append(receita[10])  # Categoria de incidência (ex: PEIXE)
            incidencias_mes.append(receita[11])  # Incidência mensal (quantidade que pode aparecer no mês)

        # Organize categories to fill first two rows with C1/C2
        categorias_distribuidas = {
            "C1/C2": [],
            "OV": [],
            "A": [],
            "AI": [],
            "F": [],
            "GE": [],
            "GL": [],
            "S1": [],
            "S2": [],
            "S3": [],
            "S4": [],
            "S5": [],
            "SE": [],
            "SI": [],
            "FR": []
        }

        for i, categoria in enumerate(categorias):
            # Substitui None por string vazia ou valor default, se necessário
            categoria_incidencia = incidencias_mes[i] if incidencias_mes[i] is not None else 0
            if categoria in categorias_distribuidas:
                categorias_distribuidas[categoria].append({
                    "name": nomes[i].strip(),
                    "quantity": f"{features[i][0]}g",
                    "kcal": f"{features[i][1]} kcal",
                    "tags": cardapio_tags[i] or "-",
                    "incidencia": incidencias[i],  # Armazena a categoria de incidência
                    "incidencia_mes": categoria_incidencia  # Usa o valor de incidência mensal com tratamento de None
                })

        # Embaralhar as categorias antes de selecionar para garantir combinações diferentes
        for categoria in categorias_distribuidas:
            random.shuffle(categorias_distribuidas[categoria])  # Embaralha as receitas dentro da categoria

        # Gerar o cardápio para os dias úteis
        dias_uteis = [selected_date + timedelta(days=i) for i in range(31) if (selected_date + timedelta(days=i)).weekday() < 5]
        logger.info(f"Dias úteis identificados no mês: {len(dias_uteis)}")

        cardapio = []
        semana_com_peixe = False  # Flag para verificar se já foi alocada a categoria 'OV' (Peixe) na semana

        for day in dias_uteis:
            daily_suggestions = []

            # Garantir que 'C1/C2' apareça duas vezes nas duas primeiras linhas
            if categorias_distribuidas["C1/C2"]:
                daily_suggestions.append(categorias_distribuidas["C1/C2"].pop(0))  # Linha 1
            if categorias_distribuidas["C1/C2"]:
                daily_suggestions.append(categorias_distribuidas["C1/C2"].pop(0))  # Linha 2

            # Verificar se já alocamos "OV" (Peixe) na semana
            if not semana_com_peixe and categorias_distribuidas["OV"]:
                # Alocar "OV" no dia com "PEIXE"
                peixe = categorias_distribuidas["OV"].pop(0)  # Remove o primeiro item da categoria "OV"
                daily_suggestions.append(peixe)
                semana_com_peixe = True  # Marca que "OV" já foi alocado

            # Preencher as outras linhas com as outras categorias
            categoriaOrdem = ["A", "AI", "F", "GE", "GL", "S1", "S2", "S3", "S4", "S5", "FR"]
            for categoria in categoriaOrdem:
                if categorias_distribuidas[categoria]:
                    daily_suggestions.append(categorias_distribuidas[categoria].pop(0))

            # Adicionar "SE" ou "SI" no cardápio
            if day.weekday() == 0:  # Segunda-feira
                if categorias_distribuidas["SI"]:
                    daily_suggestions.append(categorias_distribuidas["SI"].pop(0))  # Adiciona SI
            else:  # Demais dias
                if categorias_distribuidas["SE"]:
                    daily_suggestions.append(categorias_distribuidas["SE"].pop(0))  # Adiciona SE

            # Garantir que a categoria "FR" vá para a última linha
            if categorias_distribuidas["FR"]:
                daily_suggestions.append(categorias_distribuidas["FR"].pop(0))  # Adiciona FR no final

            day_data = {
                "date": day.strftime("%Y-%m-%d"),
                "day": day.strftime("%A"),
                "items": daily_suggestions,
            }
            logger.info(f"Gerando dados para o dia {day_data['date']}: {day_data}")
            cardapio.append(day_data)

        # Validar que nenhum dia tenha dados ausentes
        for dia in cardapio:
            if not dia.get("date") or not dia.get("items"):
                logger.error(f"Dados ausentes no dia: {dia}")
                raise ValueError(f"Dados ausentes no cardápio para o dia: {dia}")

        logger.info("Cardápio gerado com sucesso")
        return cardapio
    except Exception as e:
        logger.error(f"Erro ao gerar cardápio personalizado: {e}")
        raise
    finally:
        cursor.close()
        conn.close()