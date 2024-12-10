import pytest
from unittest.mock import MagicMock, patch
from app.services.autenticacao_service import (
    verify_user,
    create_user,
    get_user_data,
    update_user_data,
)

@pytest.fixture
def mock_db_connection():
    with patch("app.services.autenticacao_service.get_db_connection") as mock_conn:
        mock_cursor = MagicMock()
        mock_conn.return_value.cursor.return_value = mock_cursor
        yield mock_conn, mock_cursor

@pytest.fixture
def mock_bcrypt():
    with patch("app.services.autenticacao_service.bcrypt") as mock_bcrypt:
        yield mock_bcrypt

def test_verify_user_success(mock_db_connection, mock_bcrypt):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("User", "email@example.com", None, "hashed_password")
    mock_bcrypt.check_password_hash.return_value = True

    result = verify_user("email@example.com", "password")

    assert result is not None
    mock_cursor.execute.assert_called_once_with("SELECT * FROM usuarios WHERE email = %s", ("email@example.com",))
    mock_bcrypt.check_password_hash.assert_called_once_with("hashed_password", "password")

def test_verify_user_wrong_password(mock_db_connection, mock_bcrypt):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("User", "email@example.com", None, "hashed_password")
    mock_bcrypt.check_password_hash.return_value = False

    result = verify_user("email@example.com", "wrong_password")

    assert result is None
    mock_bcrypt.check_password_hash.assert_called_once_with("hashed_password", "wrong_password")

def test_verify_user_not_found(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = None

    result = verify_user("email@example.com", "password")

    assert result is None
    mock_cursor.execute.assert_called_once_with("SELECT * FROM usuarios WHERE email = %s", ("email@example.com",))

def test_create_user_success(mock_db_connection, mock_bcrypt):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = None
    mock_bcrypt.generate_password_hash.return_value.decode.return_value = "hashed_password"

    success, message = create_user("User", "email@example.com", "password")

    assert success is True
    assert message == "Usuário cadastrado com sucesso"
    mock_cursor.execute.assert_any_call("SELECT * FROM usuarios WHERE email = %s", ("email@example.com",))
    mock_cursor.execute.assert_any_call(
        "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)",
        ("User", "email@example.com", "hashed_password"),
    )

def test_create_user_email_exists(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("User", "email@example.com")

    success, message = create_user("User", "email@example.com", "password")

    assert success is False
    assert message == "E-mail já cadastrado"
    mock_cursor.execute.assert_called_once_with("SELECT * FROM usuarios WHERE email = %s", ("email@example.com",))

def test_get_user_data_success(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("User", "email@example.com")

    result = get_user_data(1)

    assert result == {"nome": "User", "email": "email@example.com"}
    mock_cursor.execute.assert_called_once_with("SELECT nome, email FROM usuarios WHERE id = %s", (1,))

def test_get_user_data_not_found(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = None

    result = get_user_data(1)

    assert result is None
    mock_cursor.execute.assert_called_once_with("SELECT nome, email FROM usuarios WHERE id = %s", (1,))

def test_update_user_data_success(mock_db_connection, mock_bcrypt):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("Old User", "old_email@example.com")
    mock_bcrypt.generate_password_hash.return_value.decode.return_value = "new_hashed_password"

    success, message = update_user_data(1, "New User", "new_email@example.com", "new_password")

    assert success is True
    assert message == "Dados alterados com sucesso"
    mock_cursor.execute.assert_any_call("SELECT nome, email FROM usuarios WHERE id = %s", (1,))
    mock_cursor.execute.assert_any_call(
        "UPDATE usuarios SET nome = %s, email = %s, senha = %s WHERE id = %s",
        ("New User", "new_email@example.com", "new_hashed_password", 1),
    )

def test_update_user_data_no_changes(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = ("User", "email@example.com")

    success, message = update_user_data(1, "User", "email@example.com")

    assert success is False
    assert message == "Dados não tiveram alteração"
    mock_cursor.execute.assert_called_once_with("SELECT nome, email FROM usuarios WHERE id = %s", (1,))

def test_update_user_data_user_not_found(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    mock_cursor.fetchone.return_value = None

    success, message = update_user_data(1, "New User", "new_email@example.com", "new_password")

    assert success is False
    assert message == "Usuário não encontrado"
    mock_cursor.execute.assert_called_once_with("SELECT nome, email FROM usuarios WHERE id = %s", (1,))