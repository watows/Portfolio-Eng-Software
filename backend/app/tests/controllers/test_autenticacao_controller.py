import pytest
from unittest.mock import patch
from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token
from app.controllers.autenticacao_controller import auth_blueprint

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'watows'
    app.config['TESTING'] = True
    JWTManager(app)
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def valid_token(app):
    with app.app_context():
        return create_access_token(identity=1)

@patch("app.services.autenticacao_service.get_user_data")
@patch("app.controllers.autenticacao_controller.get_jwt_identity")
def test_get_user_sucesso(mock_get_jwt_identity, mock_get_user_data, client, valid_token):
    mock_get_jwt_identity.return_value = 1
    mock_get_user_data.return_value = {"nome": "Test User", "email": "test@example.com"}

    headers = {"Authorization": f"Bearer {valid_token}"}
    response = client.get("/auth/user", headers=headers)

    assert response.status_code == 200
    assert response.json == {"nome": "Test User", "email": "test@example.com"}

@patch("app.services.autenticacao_service.get_user_data")
@patch("app.controllers.autenticacao_controller.get_jwt_identity")
def test_get_user_nao_encontrado(mock_get_jwt_identity, mock_get_user_data, client, valid_token):
    mock_get_jwt_identity.return_value = 1
    mock_get_user_data.return_value = None

    headers = {"Authorization": f"Bearer {valid_token}"}
    response = client.get("/auth/user", headers=headers)

    assert response.status_code == 404
    assert response.json == {"message": "Usuário não encontrado"}

@patch("app.services.autenticacao_service.update_user_data")
@patch("app.controllers.autenticacao_controller.get_jwt_identity")
def test_update_user_sucesso(mock_get_jwt_identity, mock_update_user_data, client, valid_token):
    mock_get_jwt_identity.return_value = 1
    mock_update_user_data.return_value = (True, "Dados alterados com sucesso")

    headers = {"Authorization": f"Bearer {valid_token}"}
    response = client.put(
        "/auth/user",
        json={"nome": "Updated User", "email": "updated@example.com", "senha": "newpassword"},
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json == {"message": "Dados alterados com sucesso"}

@patch("app.services.autenticacao_service.update_user_data")
@patch("app.controllers.autenticacao_controller.get_jwt_identity")
def test_update_user_dados_invalidos(mock_get_jwt_identity, mock_update_user_data, client, valid_token):
    mock_get_jwt_identity.return_value = 1

    headers = {"Authorization": f"Bearer {valid_token}"}
    response = client.put("/auth/user", json={}, headers=headers)

    assert response.status_code == 400
    assert response.json == {"message": "Dados inválidos. Nenhum JSON fornecido."}