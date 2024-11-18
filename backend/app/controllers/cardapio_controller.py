from app.database.connection import get_db_connection
from flask import Blueprint, request, jsonify
from app.services.cardapio_service import gerar_cardapio_personalizado
import logging

logger = logging.getLogger(__name__)

cardapio_blueprint = Blueprint('menu', __name__)

@cardapio_blueprint.route('/gerar_cardapio', methods=['POST'], endpoint='gerar_cardapio')
def gerar_cardapio():
    try:
        parametros = request.get_json()
        logger.info(f"Gerando cardápio personalizado com parâmetros: {parametros}")
        
        if 'date' not in parametros:
            raise ValueError("Data não fornecida nos parâmetros.")
        
        cardapio = gerar_cardapio_personalizado(parametros)
        return jsonify(cardapio), 200
    except Exception as e:
        logger.error(f"Erro ao gerar cardápio personalizado: {e}")
        return jsonify({"message": "Erro ao gerar cardápio personalizado", "detalhes": str(e)}), 400

@cardapio_blueprint.route('/verificar_cardapio', methods=['POST'])
def verificar_cardapio():
    try:
        data = request.json
        month = data.get("month")
        year = data.get("year")

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT COUNT(*) FROM cardapios
            WHERE month = %s AND year = %s
        """, (month, year))
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        exists = resultado[0] > 0
        return jsonify({"exists": exists}), 200
    except Exception as e:
        logger.error(f"Erro ao verificar cardápio existente: {e}")
        return jsonify({"message": "Erro ao verificar cardápio existente", "detalhes": str(e)}), 500

@cardapio_blueprint.route('/salvar_cardapio', methods=['POST'])
def salvar_cardapio():
    try:
        data = request.json
        month = data.get("month")
        year = data.get("year")
        cardapio = data.get("cardapio", [])
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        for dia in cardapio:
            date_day = dia.get("date")
            for item in dia.get("items", []):
                cursor.execute(
                    """
                    INSERT INTO cardapios (month, year, date, txt_breve_material, qtd_g, kcal, tags)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (month, year, date_day, item["name"], item["quantity"], item["kcal"], item.get("tags", ""))
                )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Cardápio salvo com sucesso"}), 201
    except Exception as e:
        logger.error(f"Erro ao salvar cardápio: {e}")
        return jsonify({"message": "Erro ao salvar cardápio"}), 500

@cardapio_blueprint.route('/consultar_cardapio', methods=['POST'])
def consultar_cardapio():
    try:
        data = request.json
        mes = data.get("month")
        ano = data.get("year")
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT date, txt_breve_material, qtd_g, kcal, tags
            FROM cardapios
            WHERE month = %s AND year = %s
            ORDER BY date
        """, (mes, ano))
        
        cardapio = cursor.fetchall()
        
        if not cardapio:
            return jsonify({"message": "Nenhum cardápio encontrado para o mês/ano selecionado"}), 404

        cardapio_formatado = []
        for row in cardapio:
            dia = row[0].strftime("%Y-%m-%d")
            item = {
                "name": row[1],
                "quantity": row[2],
                "kcal": row[3],
                "tags": row[4]
            }
            dia_existente = next((d for d in cardapio_formatado if d['date'] == dia), None)
            if dia_existente:
                dia_existente["items"].append(item)
            else:
                cardapio_formatado.append({
                    "date": dia,
                    "items": [item]
                })

        cursor.close()
        conn.close()
        
        return jsonify(cardapio_formatado), 200
    except Exception as e:
        logger.error(f"Erro ao consultar cardápio: {e}")
        return jsonify({"message": "Erro ao consultar cardápio", "detalhes": str(e)}), 500

@cardapio_blueprint.route('/custo_cardapio', methods=['POST'])
def custo_cardapio():
    try:
        data = request.json
        mes = data.get("month")
        ano = data.get("year")
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        logger.info(f"Consultando custos diários para o mês: {mes}, ano: {ano}")
        
        cursor.execute("""
            SELECT c.date, SUM(r.preco_plano) AS custo_diario
            FROM cardapios c
            LEFT JOIN receitas r ON TRIM(c.txt_breve_material) = TRIM(r.txt_breve_material)
            WHERE c.month = %s AND c.year = %s
            GROUP BY c.date
            ORDER BY c.date
        """, (mes, ano))
        
        custos_diarios = cursor.fetchall()
        logger.info(f"Custos diários retornados: {custos_diarios}")
        
        cursor.close()
        conn.close()
        
        custo_total = sum([float(custo[1]) for custo in custos_diarios])
        media_mensal = custo_total / len(custos_diarios) if custos_diarios else 0
        logger.info(f"Custo total: {custo_total}, Média mensal: {media_mensal}")
        
        return jsonify({
            "custosDiarios": [{"date": str(custo[0]), "custo": float(custo[1])} for custo in custos_diarios],
            "mediaMensal": round(media_mensal, 2)
        }), 200
    except Exception as e:
        logger.error(f"Erro ao calcular custo do cardápio: {e}")
        return jsonify({"message": "Erro ao calcular custo do cardápio", "detalhes": str(e)}), 500

@cardapio_blueprint.route('/nutricional_cardapio', methods=['POST'])
def nutricional_cardapio():
    try:
        data = request.json
        mes = data.get("month")
        ano = data.get("year")

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT c.date,
                   SUM(r.kcal) AS total_kcal,
                   AVG(r.cho) AS media_cho,
                   AVG(r.ptn) AS media_ptn,
                   SUM(r.fibra) AS total_fibra,
                   SUM(r.sodio) AS total_sodio
            FROM cardapios c
            LEFT JOIN receitas r ON TRIM(c.txt_breve_material) = TRIM(r.txt_breve_material)
            WHERE c.month = %s AND c.year = %s
            GROUP BY c.date
            ORDER BY c.date
        """, (mes, ano))

        nutricional_diario = cursor.fetchall()
        cursor.close()
        conn.close()

        if not nutricional_diario:
            return jsonify({"message": "Nenhum cardápio encontrado para o mês/ano selecionado"}), 404

        dados_nutricionais = []
        total_kcal, total_cho, total_ptn, total_fibra, total_sodio = 0, 0, 0, 0, 0

        for dia in nutricional_diario:
            date, kcal, cho, ptn, fibra, sodio = dia
            dados_nutricionais.append({
                "date": str(date),
                "kcal": float(kcal) if kcal is not None else 0,
                "cho": float(cho) if cho is not None else 0,
                "ptn": float(ptn) if ptn is not None else 0,
                "fibra": float(fibra) if fibra is not None else 0,
                "sodio": float(sodio) if sodio is not None else 0,
            })

            total_kcal += kcal if kcal is not None else 0
            total_cho += cho if cho is not None else 0
            total_ptn += ptn if ptn is not None else 0
            total_fibra += fibra if fibra is not None else 0
            total_sodio += sodio if sodio is not None else 0

        dias_totais = len(nutricional_diario)
        media_mensal = {
            "kcal": round(total_kcal / dias_totais, 2) if dias_totais > 0 else 0,
            "cho": round(total_cho / dias_totais, 2) if dias_totais > 0 else 0,
            "ptn": round(total_ptn / dias_totais, 2) if dias_totais > 0 else 0,
            "fibra": round(total_fibra / dias_totais, 2) if dias_totais > 0 else 0,
            "sodio": round(total_sodio / dias_totais, 2) if dias_totais > 0 else 0
        }

        print("Valores diários de sódio:", [d["sodio"] for d in dados_nutricionais])
        print("Total de sódio:", total_sodio)
        print("Média mensal de sódio calculada:", media_mensal["sodio"])

        return jsonify({
            "nutricionalDiario": dados_nutricionais,
            "mediaMensal": media_mensal
        }), 200

    except Exception as e:
        logger.error(f"Erro ao consultar dados nutricionais: {e}")
        return jsonify({"message": "Erro ao consultar dados nutricionais", "detalhes": str(e)}), 500