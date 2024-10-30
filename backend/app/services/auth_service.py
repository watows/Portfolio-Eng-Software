from flask_bcrypt import Bcrypt
from app.database.connection import get_db_connection
import logging

bcrypt = Bcrypt()
logger = logging.getLogger(__name__)

def verify_user(email, senha):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            senha_hash = user[3]
            if bcrypt.check_password_hash(senha_hash, senha):
                return user
            else:
                logger.info("Senha incorreta para o usuário com email %s", email)
        else:
            logger.info("Usuário com email %s não encontrado", email)
    except Exception as e:
        logger.error("Erro ao verificar usuário: %s", e)
    finally:
        cursor.close()
        conn.close()

    return None

def create_user(nome, email, senha):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        if cursor.fetchone() is not None:
            return False, "E-mail já cadastrado"

        senha_hash = bcrypt.generate_password_hash(senha).decode('utf-8')

        cursor.execute("INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)", (nome, email, senha_hash))
        conn.commit()
        
        return True, "Usuário cadastrado com sucesso"
    except Exception as e:
        logger.error("Erro ao cadastrar usuário: %s", e)
        return False, "Erro ao cadastrar usuário"
    finally:
        conn.close()