from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@localhost/askmeanything'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'randomsecretthingylolll'

db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)