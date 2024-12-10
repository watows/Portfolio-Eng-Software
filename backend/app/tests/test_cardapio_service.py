import pytest
from unittest.mock import patch, MagicMock
from app.services.cardapio_service import gerar_cardapio_personalizado

@patch("app.services.cardapio_service.get_db_connection")
@patch("app.services.cardapio_service.NearestNeighbors")
def test_gerar_cardapio_sucesso(mock_knn, mock_get_db_connection):
    mock_cursor = MagicMock()
    mock_get_db_connection.return_value = mock_cursor

    mock_cursor.fetchall.return_value = [
        (1, 'Receita A', 100, 300, True, False, False, False, False, 'C1', 5, 2, 10),
        (2, 'Receita B', 200, 400, True, False, True, False, False, 'C2', 5, 3, 15),
        (3, 'Receita C', 150, 350, True, True, False, True, False, 'C1', 6, 4, 12),
    ]
    
    mock_knn.return_value = MagicMock()
    mock_knn.return_value.kneighbors.return_value = ([], [])
    
    parametros = {
        "date": "2024-12-10"
    }

    cardapio = gerar_cardapio_personalizado(parametros)

    assert len(cardapio) > 0
    assert "date" in cardapio[0]
    assert "items" in cardapio[0]

@patch("app.services.cardapio_service.get_db_connection")
@patch("app.services.cardapio_service.NearestNeighbors")
def test_gerar_cardapio_sem_data(mock_knn, mock_get_db_connection):
    mock_cursor = MagicMock()
    mock_get_db_connection.return_value = mock_cursor

    parametros = {}

    with pytest.raises(ValueError, match="Data não fornecida nos parâmetros."):
        gerar_cardapio_personalizado(parametros)

@patch("app.services.cardapio_service.get_db_connection")
@patch("app.services.cardapio_service.NearestNeighbors")
def test_gerar_cardapio_sem_receitas(mock_knn, mock_get_db_connection):
    mock_cursor = MagicMock()
    mock_get_db_connection.return_value = mock_cursor

    mock_cursor.fetchall.return_value = []

    parametros = {
        "date": "2024-12-10"
    }

    with pytest.raises(ValueError, match="Nenhuma receita válida encontrada no banco de dados."):
        gerar_cardapio_personalizado(parametros)

@patch("app.services.cardapio_service.get_db_connection")
@patch("app.services.cardapio_service.NearestNeighbors")
def test_gerar_cardapio_erro_ao_atualizar(mock_knn, mock_get_db_connection):
    mock_cursor = MagicMock()
    mock_get_db_connection.return_value = mock_cursor

    mock_cursor.fetchall.return_value = [
        (1, 'Receita A', 100, 300, True, False, False, False, False, 'C1', 5, 2, 10),
        (2, 'Receita B', 200, 400, True, False, True, False, False, 'C2', 5, 3, 15),
    ]
    
    mock_knn.return_value = MagicMock()
    mock_knn.return_value.kneighbors.side_effect = ValueError("Erro ao gerar cardápio")

    parametros = {
        "date": "2024-12-10"
    }

    with pytest.raises(ValueError, match="Não foi possível encontrar receitas suficientes para o cardápio."):
        gerar_cardapio_personalizado(parametros)