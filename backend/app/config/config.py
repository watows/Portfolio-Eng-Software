import os

class Config:
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://postgres:watows@localhost/receitas')

if __name__ == '__main__':
    print("DEBUG:", Config.DEBUG)
    print("DATABASE_URI:", Config.DATABASE_URI)