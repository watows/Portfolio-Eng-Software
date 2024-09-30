from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Carregar o arquivo Excel
caminho_arquivo = os.path.join(os.path.dirname(__file__), '../data/receitas.xlsm')
df_receitas = pd.read_excel(caminho_arquivo, sheet_name='DATA_BASE', header=6)

# 1. Consultar Receitas
@app.route('/consultar', methods=['GET'])
def consultar():
    material = request.args.get('material')
    if material:
        resultado = df_receitas[df_receitas['Material'] == material]
        return jsonify(resultado.to_dict(orient='records'))
    return jsonify(df_receitas.to_dict(orient='records'))

# 2. Adicionar Nova Receita
@app.route('/adicionar', methods=['POST'])
def adicionar():
    nova_receita = request.json
    global df_receitas
    df_receitas = df_receitas.append(nova_receita, ignore_index=True)
    df_receitas.to_excel(caminho_arquivo, sheet_name='DATA_BASE', index=False, header=True, startrow=6)
    return jsonify(nova_receita), 201

# 3. Editar Receita Existente
@app.route('/editar/<string:material>', methods=['PUT'])
def editar(material):
    receita_existente = df_receitas[df_receitas['Material'] == material]
    if not receita_existente.empty:
        dados_atualizados = request.json
        df_receitas.loc[df_receitas['Material'] == material] = dados_atualizados
        df_receitas.to_excel(caminho_arquivo, sheet_name='DATA_BASE', index=False, header=True, startrow=6)
        return jsonify(dados_atualizados)
    return jsonify({'message': 'Receita não encontrada'}), 404

# 4. Excluir Receita
@app.route('/excluir/<string:material>', methods=['DELETE'])
def excluir(material):
    global df_receitas
    df_receitas = df_receitas[df_receitas['Material'] != material]
    df_receitas.to_excel(caminho_arquivo, sheet_name='DATA_BASE', index=False, header=True, startrow=6)
    return jsonify({'message': 'Receita excluída com sucesso'}), 204

if __name__ == "__main__":
    app.run(debug=True)