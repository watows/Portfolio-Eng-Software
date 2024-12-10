import unittest
from unittest.mock import patch, MagicMock
from app.database.connection import get_db_connection

class TestDatabaseConnection(unittest.TestCase):
    
    @patch('psycopg2.connect')
    def test_get_db_connection_success(self, mock_connect):
        mock_conn = MagicMock()
        mock_connect.return_value = mock_conn

        connection = get_db_connection()

        self.assertIsNotNone(connection)
        mock_connect.assert_called_once_with(
            dbname='receitas',
            user='postgres',
            password='watows',
            host='localhost',
            port='5432'
        )
        print("Teste de conexão bem-sucedida passou.")

    @patch('psycopg2.connect')
    def test_get_db_connection_failure(self, mock_connect):
        mock_connect.side_effect = Exception("Erro ao conectar ao banco de dados")

        connection = get_db_connection()

        self.assertIsNone(connection)
        mock_connect.assert_called_once_with(
            dbname='receitas',
            user='postgres',
            password='watows',
            host='localhost',
            port='5432'
        )
        print("Teste de falha na conexão passou.")

if __name__ == '__main__':
    unittest.main()