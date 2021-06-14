from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    get_raw_jwt,
    jwt_required
)
import re
from models.users import UserModel
from blacklist import BLACKLIST

_user_parser = reqparse.RequestParser()
_user_parser.add_argument('first_name', type=str)
_user_parser.add_argument('last_name', type=str)
_user_parser.add_argument('username', type=str)
_user_parser.add_argument('email', type=str)
_user_parser.add_argument('password', type=str)


class UserRegister(Resource):
    def post(self):
        data = _user_parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400

        if UserModel.find_by_email(data['email']):
            return {"message": "A user with that email already exists"}, 400

        if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
            return {"message": "Invalid email format!"}, 400

        if len(data['password']) < 6:
            return {"message": "Password must be at least 6 characters"}, 400

        user = UserModel(
            username=data['username'],
            email=data['email'],
            password=UserModel.generate_hash(data['password']),
            first_name=data['first_name'],
            last_name=data['last_name'],
        )

        try:
            user.save_to_db()

            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            return {
                'message': f"User {data['username']} was created",
                'username': user.username,
                'email': user.email,
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 201

        except:
            return {'message': 'Something went wrong'}, 500


class UserLogin(Resource):
    def post(self):
        data = _user_parser.parse_args()

        user = UserModel.find_by_username(data['username'])

        if not user:
            user = UserModel.find_by_email(data['email'])

        if user and UserModel.verify_hash(data['password'], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            return {
                'message': f"User {data['username']} was logged in",
                'username': user.username,
                'email': user.email,
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200

        return {'message': 'Invalid credentials!'}, 401


class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200
