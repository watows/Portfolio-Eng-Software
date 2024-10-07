from flask import Flask
from .config.config import Config
from .controllers.menu_controller import menu_blueprint
from .controllers.report_controller import report_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(menu_blueprint)
    app.register_blueprint(report_blueprint)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)