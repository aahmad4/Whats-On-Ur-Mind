from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
    get_jwt_claims,
    fresh_jwt_required,
    jwt_optional
)
from datetime import datetime
from server.models.questions import QuestionModel
from server.models.users import UserModel


class QuestionList(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('question_text', type=str, required=True,
                        help="This field cannot be left blank!")

    def get(self, username):
        user = UserModel.find_by_username(username)

        if not user:
            return {'message': 'User Not Found'}, 404

        return user.json()

    def post(self, username):
        data = self.parser.parse_args()

        user = UserModel.find_by_username(username)

        if not user:
            return {'message': 'User Not Found'}, 404

        question = QuestionModel(
            question_text=data['question_text'], user_id=user.id, asked_on=datetime.now())

        question.save_to_db()

        return question.json()


class QuestionOptions(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('answer_text', type=str)
    parser.add_argument('update_text', type=str)

    @jwt_required
    def put(self, username, question_id):
        data = self.parser.parse_args()

        user = UserModel.find_by_username(username)
        current_user = UserModel.query.filter_by(
            username=get_jwt_identity()).first()

        if current_user.id != user.id:
            return {'message': 'You cannot edit a question you do not own!'}, 401

        if not data['update_text']:
            question = QuestionModel.find_by_id_and_user_id(
                id=question_id, user_id=user.id)

            question.answer_text = data['answer_text']
            question.answered_on = datetime.now()

            question.save_to_db()

            return question.json()

        if data['update_text']:
            question = QuestionModel.find_by_id_and_user_id(
                id=question_id, user_id=user.id)

            question.answer_text = data['update_text']
            question.answer_updated_on = datetime.now()

            question.save_to_db()

            return question.json()

    def delete(self, username, question_id):
        return {'message': f'Delete this question'}
