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

def get_user_data(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT nome, email FROM usuarios WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if user:
            return {"nome": user[0], "email": user[1]}
        return None
    except Exception as e:
        logger.error("Erro ao buscar dados do usuário: %s", e)
        return None
    finally:
        cursor.close()
        conn.close()

def update_user_data(user_id, nome, email, senha=None):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT nome, email FROM usuarios WHERE id = %s", (user_id,))
        current_user = cursor.fetchone()
        
        if not current_user:
            return False, "Usuário não encontrado"

        if current_user[0] == nome and current_user[1] == email and not senha:
            return False, "Dados não tiveram alteração"

        if senha:
            senha_hash = bcrypt.generate_password_hash(senha).decode('utf-8')
            cursor.execute("UPDATE usuarios SET nome = %s, email = %s, senha = %s WHERE id = %s",
                           (nome, email, senha_hash, user_id))
        else:
            cursor.execute("UPDATE usuarios SET nome = %s, email = %s WHERE id = %s",
                           (nome, email, user_id))

        conn.commit()
        return True, "Dados alterados com sucesso"
    except Exception as e:
        logger.error("Erro ao atualizar dados do usuário: %s", e)
        return False, "Erro ao atualizar dados do usuário"
    finally:
        cursor.close()
        conn.close()