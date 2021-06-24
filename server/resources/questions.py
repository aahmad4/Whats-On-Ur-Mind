from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
    jwt_optional
)

from server.models.questions import QuestionModel
from server.models.users import UserModel

from datetime import datetime


class QuestionList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('question_text', type=str)

    @jwt_optional
    def get(self, username):
        user = UserModel.find_by_username(username)
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()
        ).first()

        if not user:
            return {'message': 'User Not Found'}, 404

        if not current_user or user.id != current_user.id:
            return user.answered_questions()

        if current_user.id == user.id:
            return user.json()

        return {"message": "Something went wrong."}, 500

    def post(self, username):
        data = self.parser.parse_args()
        user = UserModel.find_by_username(username)

        if not user:
            return {'message': 'User Not Found'}, 404

        question = QuestionModel(
            question_text=data['question_text'],
            user_id=user.id,
            asked_on=datetime.now()
        )

        try:
            question.save_to_db()

            return question.json()
        except:
            return {'message': 'Something went wrong'}, 500


class QuestionOptions(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('answer_text', type=str)
    parser.add_argument('update_text', type=str)

    @jwt_required
    def put(self, username, question_id):
        data = self.parser.parse_args()
        user = UserModel.find_by_username(username)
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()
        ).first()

        if current_user.id != user.id:
            return {'message': 'You cannot edit a question you do not own!'}, 401

        if not data['update_text']:
            if not user.is_subscribed and len([question for question in user.questions.all() if question.answered_on != None]) >= 5:
                return {'message': 'Upgrade to premium to answer more questions'}, 401

            question = QuestionModel.find_by_id_and_user_id(
                id=question_id,
                user_id=user.id
            )

            question.answer_text = data['answer_text']
            question.answered_on = datetime.now()
            question.save_to_db()

            return question.json()

        if data['update_text']:
            question = QuestionModel.find_by_id_and_user_id(
                id=question_id,
                user_id=user.id
            )

            question.answer_text = data['update_text']
            question.answer_updated_on = datetime.now()
            question.save_to_db()

            return question.json()

    @jwt_required
    def delete(self, username, question_id):
        user = UserModel.find_by_username(username)
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()
        ).first()

        if current_user.id != user.id:
            return {'message': 'You cannot delete a question you do not own!'}, 401

        question = QuestionModel.find_by_id_and_user_id(
            id=question_id,
            user_id=user.id
        )

        question.delete_from_db()

        return {'message': 'Successfully deleted that question!'}
