from flask_restful import Resource

class PublicQuestions(Resource):
    def get(self, user_id):
        return {'message': 'All Questions for ID'}

    def post(self, user_id):
        return {'message': 'Add new question here'}


class PrivateQuestions(Resource):
    def put(self, user_id, question_id):
        return {'message': 'Update this question'}

    def delete(self, user_id, question_id):
        return {'message': f'Delete this question'}