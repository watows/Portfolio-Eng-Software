from app.database.connection import get_db_connection
import logging

logger = logging.getLogger(__name__)

def buscar_receita_por_id(receita_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        logger.info(f"Buscando receita com ID: {receita_id}")
        
        cursor.execute("SELECT * FROM receitas WHERE id = %s", (receita_id,))
        receita = cursor.fetchone()
        
        if not receita:
            logger.warning("Receita não encontrada no banco de dados")
            return None

        receita_data = {
            "txt_breve_material": receita[0],
            "material": receita[1],
            "preco_plano": receita[2],
            "classe": receita[3],
            "categoria_incidencia1": receita[4],
            "cat1": receita[5],
            "incidencia_mes1": receita[6],
            "categoria_incidencia2": receita[7],
            "cat2": receita[8],
            "incidencia_mes2": receita[9],
            "gluten": receita[10],
            "lactose": receita[11],
            "qtd_g": receita[12],
            "kcal": receita[13],
            "cho": receita[14],
            "ptn": receita[15],
            "ptn_liq": receita[16],
            "gord_total": receita[17],
            "gord_sat": receita[18],
            "fibra": receita[19],
            "sodio": receita[20],
            "info_adicional": receita[21],
            "id": receita[22],
            "osso": receita[23],
            "fragmento": receita[24],
            "espinha": receita[25],
        }
        
        logger.info("Receita encontrada com sucesso")
        
        return receita_data

    except Exception as e:
        logger.error(f"Erro ao buscar receita: {e}")
        return None
    finally:
        cursor.close()
        conn.close()

def atualizar_receita(receita_id, novos_dados):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        campos = []
        valores = []
        
        for campo, valor in novos_dados.items():
            campos.append(f"{campo} = %s")
            valores.append(valor)

        valores.append(receita_id)
        query = f"UPDATE receitas SET {', '.join(campos)} WHERE id = %s"
        cursor.execute(query, tuple(valores))
        conn.commit()

        return True, "Receita atualizada com sucesso"
    except Exception as e:
        logger.error(f"Erro ao atualizar receita: {e}")
        return False, "Erro ao atualizar a receita"
    finally:
        cursor.close()
        conn.close()

def inserir_receita(dados):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        query = """
        INSERT INTO tabela_receitas 
        (material, preco_plano, classe, categoria_incidencia1, cat1, incidencia_mes1, 
         categoria_incidencia2, cat2, incidencia_mes2, gluten, lactose, osso, fragmento, 
         espinha, cho, ptn, ptn_liq, gord_total, gord_sat, fibra, sodio, info_adicional)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            dados['material'], dados['preco_plano'], dados['classe'], dados['categoria_incidencia1'], 
            dados['cat1'], dados['incidencia_mes1'], dados['categoria_incidencia2'], dados['cat2'], 
            dados['incidencia_mes2'], dados['gluten'], dados['lactose'], dados['osso'], 
            dados['fragmento'], dados['espinha'], dados['cho'], dados['ptn'], dados['ptn_liq'], 
            dados['gord_total'], dados['gord_sat'], dados['fibra'], dados['sodio'], dados['info_adicional']
        ))
        conn.commit()
    finally:
        cursor.close()
        conn.close()