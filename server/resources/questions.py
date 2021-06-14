from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
    get_jwt_claims,
    fresh_jwt_required,
    jwt_optional
)
from server.models.questions import QuestionModel
from server.models.users import UserModel


class QuestionList(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('question_text', type=str, required=True,
                        help="This field cannot be left blank!")

    def get(self, user_id):
        user = UserModel.find_by_id(user_id)

        if not user:
            return {'message': 'User Not Found'}, 404

        return user.json()

    def post(self, user_id):
        data = self.parser.parse_args()

        question = QuestionModel(
            question_text=data['question_text'], user_id=user_id)

        question.save_to_db()

        return question.json()


class QuestionOptions(Resource):
    def put(self, user_id, question_id):
        return {'message': 'Update this question'}

    def delete(self, user_id, question_id):
        return {'message': f'Delete this question'}
