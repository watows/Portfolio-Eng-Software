from app.database.connection import get_db_connection
from sklearn.neighbors import NearestNeighbors
from datetime import datetime, timedelta
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
            SELECT id, txt_breve_material, qtd_g, kcal, gluten, lactose, osso, fragmento, espinha
            FROM receitas
        """)
        receitas = cursor.fetchall()
        logger.info(f"Receitas obtidas: {len(receitas)}")

        if not receitas:
            raise ValueError("Nenhuma receita encontrada no banco de dados.")

        # Preparar os dados das receitas
        ids, nomes, features, cardapio_tags = [], [], [], []
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

        # Configurar o modelo KNN
        knn = NearestNeighbors(n_neighbors=min(10, len(features)))
        knn.fit(features)
        _, indices = knn.kneighbors([[qtd_g, kcal]])

        # Gerar o cardápio para os dias úteis
        dias_uteis = [selected_date + timedelta(days=i) for i in range(31) if (selected_date + timedelta(days=i)).weekday() < 5]
        logger.info(f"Dias úteis identificados no mês: {len(dias_uteis)}")

        cardapio = []
        for day in dias_uteis:
            daily_suggestions = []
            for j in range(10):
                recipe_index = indices[0][j % len(indices[0])]
                daily_suggestions.append({
                    "name": nomes[recipe_index].strip(),
                    "quantity": f"{features[recipe_index][0]}g",
                    "kcal": f"{features[recipe_index][1]} kcal",
                    "tags": cardapio_tags[recipe_index] or "-"
                })

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