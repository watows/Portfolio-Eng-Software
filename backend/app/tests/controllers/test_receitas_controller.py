import pytest
from unittest.mock import patch
from flask import Flask
from app.controllers.receitas_controller import recipe_blueprint

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(recipe_blueprint, url_prefix='/receitas')
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@patch("app.services.receitas_service.buscar_receita_por_id")
def test_buscar_receita(mock_buscar_receita, client):
    receita_id = 1
    mock_buscar_receita.return_value = {"id": receita_id, "nome": "Receita Teste", "ingredientes": ["Ingrediente1", "Ingrediente2"]}

    response = client.get(f"/receitas/buscar_receita?id={receita_id}")

    assert response.status_code == 200
    assert response.json == {"id": 1, "nome": "Receita Teste", "ingredientes": ["Ingrediente1", "Ingrediente2"]}

def test_buscar_receita_id_invalido(client):
    response = client.get("/receitas/buscar_receita?id=invalid")

    assert response.status_code == 400
    assert response.json == {"message": "ID inválido"}

@patch("app.services.receitas_service.atualizar_receita")
def test_editar_receita(mock_atualizar_receita, client):
    receita_id = 1
    novos_dados = {"nome": "Nova Receita", "ingredientes": ["Novo Ingrediente"]}

    mock_atualizar_receita.return_value = (True, "Receita atualizada com sucesso")

    response = client.put("/receitas/editar_receita", json={"id": receita_id, "dados": novos_dados})

    assert response.status_code == 200
    assert response.json == {"message": "Receita atualizada com sucesso"}

@patch("app.services.receitas_service.inserir_receita")
def test_incluir_receita(mock_inserir_receita, client):
    dados = {"nome": "Receita Nova", "ingredientes": ["Ingrediente1", "Ingrediente2"]}

    mock_inserir_receita.return_value = None

    response = client.post("/receitas/incluir_receita", json=dados)

    assert response.status_code == 201
    assert response.json == {"message": "Receita incluída com sucesso"}

@patch("app.services.receitas_service.excluir_receita_por_id")
def test_excluir_receita(mock_excluir_receita, client):
    receita_id = 1
    mock_excluir_receita.return_value = (True, "Receita excluída com sucesso")

    response = client.delete(f"/receitas/excluir_receita?id={receita_id}")

    assert response.status_code == 200
    assert response.json == {"message": "Receita excluída com sucesso"}

def test_excluir_receita_id_invalido(client):
    response = client.delete("/receitas/excluir_receita?id=invalid")

    assert response.status_code == 400
    assert response.json == {"message": "ID inválido"}