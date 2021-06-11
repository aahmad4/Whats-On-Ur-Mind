from flask_restful import Resource, reqparse
from .models import User

parser = reqparse.RequestParser()

parser.add_argument('username', help='This field cannot be blank', required=True)
parser.add_argument('email', help='This field cannot be blank', required=True)
parser.add_argument('password', help='This field cannot be blank', required=True)
parser.add_argument('first_name', help='This field cannot be blank', required=True)
parser.add_argument('last_name', help='This field cannot be blank', required=True)

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

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
        return {'message': 'User login'}