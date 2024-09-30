import pandas as pd
import os

def carregar_dados_excel(filepath):
    try:
        df = pd.read_excel(filepath)
        return df
    except Exception as e:
        print(f"Erro ao carregar o arquivo: {e}")
        return None

if __name__ == "__main__":
    filepath = '../data/receitas.xlsm'
    
    df_receitas = carregar_dados_excel(filepath)
    
    if df_receitas is not None:
        print("Arquivo carregado com sucesso!")
        print(df_receitas.head())