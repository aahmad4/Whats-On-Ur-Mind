from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager

from server.db import db
from server.blacklist import BLACKLIST
from server.resources.users import UserRegister, UserLogin, UserLogout, UserTokenRefresh
from server.resources.questions import QuestionList, QuestionOptions
from server.resources.payments import CreateCheckoutSession, CreateSubscription, CancelSubscription

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('POSTGRES_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
api = Api(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt = JWTManager(app)


@jwt.user_claims_loader
def add_claims_to_jwt(identity):
    if identity == 1:
        return {'is_admin': True}
    return {'is_admin': False}


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token['jti'] in BLACKLIST


@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({
        'message': 'The token has expired.',
        'error': 'token_expired'
    }), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'message': 'Signature verification failed.',
        'error': 'invalid_token'
    }), 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "description": "Request does not contain an access token.",
        'error': 'authorization_required'
    }), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return jsonify({
        "description": "The token is not fresh.",
        'error': 'fresh_token_required'
    }), 401


@jwt.revoked_token_loader
def revoked_token_callback():
    return jsonify({
        "description": "The token has been revoked.",
        'error': 'token_revoked'
    }), 401


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


api.add_resource(UserRegister, '/api/users/register')
api.add_resource(UserLogin, '/api/users/login')
api.add_resource(UserLogout, '/api/users/logout')
api.add_resource(UserTokenRefresh, '/api/users/refresh')

api.add_resource(QuestionList, '/api/questions/<string:username>')
api.add_resource(QuestionOptions, '/api/questions/<string:username>/<int:question_id>')

api.add_resource(CreateCheckoutSession, '/api/create-checkout-session')
api.add_resource(CreateSubscription, '/api/create-subscription')
api.add_resource(CancelSubscription, '/api/cancel-subscription')
