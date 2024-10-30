import psycopg2
from psycopg2 import sql

def get_db_connection():
    try:
        connection = psycopg2.connect(
            dbname='receitas',
            user='postgres',
            password='watows',
            host='localhost',
            port='5432'
        )
        print("Conexão ao banco de dados realizada com sucesso.")
        return connection
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None