from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from app.services.autenticacao_service import verify_user, create_user, get_user_data, update_user_data

auth_blueprint = Blueprint('auth', __name__)
jwt = JWTManager()

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')
    
    if not email or not senha:
        return jsonify({"message": "Por favor, forneça o e-mail e a senha"}), 400
    
    user = verify_user(email, senha)

    if not user:
        return jsonify({"message": "Usuário não encontrado ou senha incorreta"}), 400

    access_token = create_access_token(identity=user[0])
    return jsonify({"message": "Login bem-sucedido", "token": access_token}), 200

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    
    if not nome or not email or not senha:
        return jsonify({"message": "Por favor, forneça nome, e-mail e senha"}), 400

    result, message = create_user(nome, email, senha)

    if result:
        return jsonify({"message": message}), 201
    else:
        return jsonify({"message": message}), 400

@auth_blueprint.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = get_user_data(user_id)
    
    if not user:
        return jsonify({"message": "Usuário não encontrado"}), 404
    
    return jsonify({"nome": user['nome'], "email": user['email']}), 200

@auth_blueprint.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    result, message = update_user_data(user_id, nome, email, senha)

    if result:
        return jsonify({"message": message}), 200
    else:
        return jsonify({"message": message}), 400