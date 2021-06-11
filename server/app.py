from flask import Flask
from flask_restful import Api
from resources.models import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@localhost/askmeanything'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'randomsecretthingylolll'

db.init_app(app)

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

from resources import questions, users

api.add_resource(users.UserRegistration, '/api/users/register')
api.add_resource(users.UserLogin, '/api/users/login')

api.add_resource(questions.PublicQuestions, '/api/questions/<int:user_id>')
api.add_resource(questions.PrivateQuestions, '/api/questions/<int:user_id>/<int:question_id>')

if __name__ == "__main__":
    app.run(debug=True)