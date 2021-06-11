from flask_restful import Resource, reqparse
from .models import User

parser = reqparse.RequestParser()

parser.add_argument('username', help='This field cannot be blank')
parser.add_argument('email', help='This field cannot be blank')
parser.add_argument('password', help='This field cannot be blank')
parser.add_argument('first_name', help='This field cannot be blank')
parser.add_argument('last_name', help='This field cannot be blank')

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

        if User.find_by_username(data['username']):
            return {'message': f'User {data["username"]} already exists'}

        if User.find_by_email(data['email']):
            return {'message': f'User {data["email"]} already exists'}

        new_user = User(
            username = data['username'],
            email = data['email'],
            password = data['password'],
            first_name = data['first_name'],
            last_name = data['last_name'],
        )

        try:
            new_user.save_to_db()
            return {'message': f"User {data['username']} was created"}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()

        if data['username']:
            current_user = User.find_by_username(data['username'])
        elif data['email']:
            current_user = User.find_by_email(data['email'])

        if not current_user:
            return {'message': f'User doesn\'t exist'}
        
        if data['password'] == current_user.password:
            return {'message': f'Logged in as {current_user.username}'}
        else:
            return {'message': 'Wrong credentials'}