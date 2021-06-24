from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required
)

from server.models.users import UserModel

import stripe
import os
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')


class CreateCheckoutSession(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('priceId', type=str)

    def post(self):
        data = self.parser.parse_args()

        try:
            checkout_session = stripe.checkout.Session.create(
                success_url='https://whatsonurmind.herokuapp.com/?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='https://whatsonurmind.herokuapp.com/',
                payment_method_types=['card'],
                mode='subscription',
                line_items=[{
                    'price': data['priceId'],
                    'quantity': 1
                }],
            )

            return {'sessionId': checkout_session['id']}

        except Exception as e:
            return {"message": str(e)}, 400


class CreateSubscription(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('sessionId', type=str)

    @jwt_required
    def post(self):
        data = self.parser.parse_args()
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()
        ).first()
        access_token = create_access_token(
            identity=current_user.username,
            fresh=True
        )
        refresh_token = create_refresh_token(current_user.username)

        if current_user.is_subscribed:
            return {
                "message": "Already subscribed!",
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email,
                'is_subscribed': current_user.is_subscribed,
                'access_token': access_token,
                'refresh_token': refresh_token
            }

        session = stripe.checkout.Session.retrieve(data['sessionId'])

        if session['payment_status'] == 'paid':
            current_user.is_subscribed = True
            current_user.subscription_id = session['subscription']
            current_user.save_to_db()

            return {
                'message': 'Successfully subscribed!',
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email,
                'is_subscribed': current_user.is_subscribed,
                'access_token': access_token,
                'refresh_token': refresh_token
            }


class CancelSubscription(Resource):
    @jwt_required
    def put(self):
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()
        ).first()
        access_token = create_access_token(
            identity=current_user.username,
            fresh=True
        )
        refresh_token = create_refresh_token(current_user.username)

        if not current_user.is_subscribed:
            return {
                "message": "You're not even subscribed...",
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email,
                'is_subscribed': current_user.is_subscribed,
                'access_token': access_token,
                'refresh_token': refresh_token
            }

        stripe.Subscription.delete(current_user.subscription_id)

        current_user.is_subscribed = False
        current_user.subscription_id = None
        current_user.save_to_db()

        return {
            'message': 'Successfully cancelled subscription',
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'is_subscribed': current_user.is_subscribed,
            'access_token': access_token,
            'refresh_token': refresh_token
        }
