import os

class Config:
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://postgres:watows@localhost/receitas')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'watows')