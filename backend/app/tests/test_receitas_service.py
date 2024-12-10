import pytest
from unittest.mock import MagicMock, patch
from app.services.receitas_service import (
    buscar_receita_por_id,
    atualizar_receita,
    inserir_receita,
    excluir_receita_por_id,
)

@pytest.fixture
def mock_db_connection():
    with patch("app.services.receitas_service.get_db_connection") as mock_conn:
        mock_cursor = MagicMock()
        mock_conn.return_value.cursor.return_value = mock_cursor
        yield mock_conn, mock_cursor

def test_buscar_receita_por_id_sucesso(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = (
        "Breve Descrição", "Material", 10.5, "Classe", "Incidência 1",
        "Categoria 1", 5, "Incidência 2", "Categoria 2", 3, True, False, 150, 300,
        50, 20, 10, 5, 2, 8, 100, "Informações adicionais", 1, False, False, True
    )

    receita_id = 1
    result = buscar_receita_por_id(receita_id)

    assert result is not None
    assert result["txt_breve_material"] == "Breve Descrição"
    assert result["material"] == "Material"
    assert result["preco_plano"] == 10.5
    assert result["gluten"] is True
    assert result["espinha"] is True
    mock_cursor.execute.assert_called_once_with("SELECT * FROM receitas WHERE id = %s", (receita_id,))

def test_buscar_receita_por_id_nao_encontrada(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = None

    receita_id = 999
    result = buscar_receita_por_id(receita_id)

    assert result is None
    mock_cursor.execute.assert_called_once_with("SELECT * FROM receitas WHERE id = %s", (receita_id,))

def test_atualizar_receita_sucesso(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.rowcount = 1

    receita_id = 1
    novos_dados = {"preco_plano": 20.0, "gluten": False}

    sucesso, mensagem = atualizar_receita(receita_id, novos_dados)

    assert sucesso is True
    assert mensagem == "Receita atualizada com sucesso"
    query = "UPDATE receitas SET preco_plano = %s, gluten = %s WHERE id = %s"
    mock_cursor.execute.assert_called_once_with(query, (20.0, False, receita_id))

def test_atualizar_receita_nao_encontrada(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.rowcount = 0

    receita_id = 999
    novos_dados = {"preco_plano": 20.0}

    sucesso, mensagem = atualizar_receita(receita_id, novos_dados)

    assert sucesso is False
    assert mensagem == "Erro ao atualizar a receita"
    query = "UPDATE receitas SET preco_plano = %s WHERE id = %s"
    mock_cursor.execute.assert_called_once_with(query, (20.0, receita_id))

def test_inserir_receita_sucesso(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection

    dados = {
        "txt_breve_material": "Receita Nova",
        "material": "Material Novo",
        "preco_plano": 15.0,
        "classe": "Classe A",
        "categoria_incidencia1": "Incidência 1",
        "cat1": "Categoria 1",
        "incidencia_mes1": 3,
        "categoria_incidencia2": "Incidência 2",
        "cat2": "Categoria 2",
        "incidencia_mes2": 2,
        "gluten": True,
        "lactose": False,
        "osso": True,
        "fragmento": False,
        "espinha": True,
        "kcal": 200,
        "cho": 50,
        "ptn": 15,
        "ptn_liq": 10,
        "gord_total": 5,
        "gord_sat": 2,
        "fibra": 8,
        "sodio": 120,
        "info_adicional": "Informações adicionais",
    }

    inserir_receita(dados)

    query = """
        INSERT INTO receitas
        (txt_breve_material, material, preco_plano, classe, categoria_incidencia1, cat1, incidencia_mes1,
         categoria_incidencia2, cat2, incidencia_mes2, gluten, lactose, osso, fragmento, espinha, kcal, cho,
         ptn, ptn_liq, gord_total, gord_sat, fibra, sodio, info_adicional)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    formatted_query = " ".join(query.split())

    mock_calls = [
        " ".join(call[0][0].split()) if isinstance(call[0][0], str) else call
        for call in mock_cursor.execute.call_args_list
    ]
    assert formatted_query in mock_calls[0], f"Expected: {formatted_query}, Actual: {mock_calls[0]}"

def test_excluir_receita_por_id_sucesso(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.rowcount = 1

    receita_id = 1
    sucesso, mensagem = excluir_receita_por_id(receita_id)

    assert sucesso is True
    assert mensagem == "Receita excluída com sucesso"
    mock_cursor.execute.assert_called_once_with("DELETE FROM receitas WHERE id = %s", (receita_id,))

def test_excluir_receita_por_id_nao_encontrada(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.rowcount = 0

    receita_id = 999
    sucesso, mensagem = excluir_receita_por_id(receita_id)

    assert sucesso is False
    assert mensagem == "Receita não encontrada para exclusão"
    mock_cursor.execute.assert_called_once_with("DELETE FROM receitas WHERE id = %s", (receita_id,))