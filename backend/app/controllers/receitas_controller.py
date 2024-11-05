from flask import Blueprint, request, jsonify
from app.services.receitas_service import buscar_receita_por_id, atualizar_receita, inserir_receita, excluir_receita_por_id
import logging

logger = logging.getLogger(__name__)

recipe_blueprint = Blueprint('recipe', __name__)

@recipe_blueprint.route('/buscar_receita', methods=['GET'], endpoint='buscar_receita')
def buscar_receita():
    receita_id = request.args.get('id')
    
    try:
        receita_id = int(receita_id)
    except ValueError:
        logger.error("ID inválido fornecido.")
        return jsonify({"message": "ID inválido"}), 400

    logger.info(f"Recebendo solicitação para buscar receita com ID: {receita_id}")
    receita_data = buscar_receita_por_id(receita_id)

    if not receita_data:
        return jsonify({"message": "Receita não encontrada"}), 404

    return jsonify(receita_data), 200

@recipe_blueprint.route('/editar_receita', methods=['PUT'], endpoint='editar_receita')
def editar_receita():
    receita_id = request.json.get('id')
    novos_dados = request.json.get('dados')

    if not receita_id or not novos_dados:
        return jsonify({"message": "ID da receita e dados são necessários"}), 400

    sucesso, mensagem = atualizar_receita(receita_id, novos_dados)

    if sucesso:
        return jsonify({"message": mensagem}), 200
    else:
        return jsonify({"message": mensagem}), 400

@recipe_blueprint.route('/incluir_receita', methods=['POST'], endpoint='incluir_receita')
def incluir_receita():
    dados = request.json
    try:
        inserir_receita(dados)
        return jsonify({"message": "Receita incluída com sucesso"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@recipe_blueprint.route('/excluir_receita', methods=['DELETE'], endpoint='excluir_receita')
def excluir_receita():
    receita_id = request.args.get('id')
    
    try:
        receita_id = int(receita_id)
    except ValueError:
        logger.error("ID inválido fornecido para exclusão.")
        return jsonify({"message": "ID inválido"}), 400

    sucesso, mensagem = excluir_receita_por_id(receita_id)

    if sucesso:
        return jsonify({"message": mensagem}), 200
    else:
        return jsonify({"message": mensagem}), 404