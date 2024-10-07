import psycopg2
from config.config import Config

class ReceitaRepository:
    def __init__(self):
        self.connection = psycopg2.connect(Config.DATABASE_URI)
        self.cursor = self.connection.cursor()

    def close(self):
        self.cursor.close()
        self.connection.close()

    def add_receita(self, id, txt_breve_material, material, preco_plano, classe, categoria_incidencia1,
                    cat1, incidencia_mes1, categoria_incidencia2, cat2, incidencia_mes2, gluten, 
                    lactose, qtd_g, kcal, cho, ptn, ptn_liq, gord_total, gord_sat, fibra, sodio, 
                    info_adicional):
        query = """
        INSERT INTO receitas (id, txt_breve_material, material, preco_plano, classe, categoria_incidencia1,
                              cat1, incidencia_mes1, categoria_incidencia2, cat2, incidencia_mes2, gluten, 
                              lactose, qtd_g, kcal, cho, ptn, ptn_liq, gord_total, gord_sat, fibra, sodio, 
                              info_adicional)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        self.cursor.execute(query, (id, txt_breve_material, material, preco_plano, classe, categoria_incidencia1,
                                     cat1, incidencia_mes1, categoria_incidencia2, cat2, incidencia_mes2, gluten, 
                                     lactose, qtd_g, kcal, cho, ptn, ptn_liq, gord_total, gord_sat, fibra, sodio, 
                                     info_adicional))
        self.connection.commit()

    def get_receita_by_material(self, material):
        query = "SELECT * FROM receitas WHERE material = %s"
        self.cursor.execute(query, (material,))
        return self.cursor.fetchone()

    def update_receita(self, id, txt_breve_material=None, preco_plano=None, classe=None):
        updates = []
        params = []

        if txt_breve_material:
            updates.append("txt_breve_material = %s")
            params.append(txt_breve_material)

        if preco_plano is not None:
            updates.append("preco_plano = %s")
            params.append(preco_plano)

        if classe:
            updates.append("classe = %s")
            params.append(classe)

        params.append(id)
        query = f"UPDATE receitas SET {', '.join(updates)} WHERE id = %s"

        self.cursor.execute(query, params)
        self.connection.commit()

    def delete_receita(self, id):
        query = "DELETE FROM receitas WHERE id = %s"
        self.cursor.execute(query, (id,))
        self.connection.commit()

    def get_all_receitas(self):
        query = "SELECT * FROM receitas"
        self.cursor.execute(query)
        return self.cursor.fetchall()