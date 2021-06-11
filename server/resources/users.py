from flask_restful import Resource

class UserRegistration(Resource):
    def post(self):
        return {'message': 'User registration'}


class UserLogin(Resource):
    def post(self):
        return {'message': 'User login'}