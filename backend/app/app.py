from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.controllers.autenticacao_controller import auth_blueprint
from app.controllers.receitas_controller import recipe_blueprint
from app.config.config import Config
from werkzeug.exceptions import HTTPException
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/auth/*": {"origins": "http://localhost:3000"}})
jwt = JWTManager(app)

app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(recipe_blueprint, url_prefix='/recipe')

@app.route('/')
def home():
    return "Servidor está funcionando!"

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e

    logger.error(f"Erro inesperado: {e}")
    return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)