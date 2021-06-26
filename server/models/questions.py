from server.db import db
import json


class QuestionModel(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False)
    asked_on = db.Column(db.DateTime, default=db.func.now())
    answer_text = db.Column(db.Text, default=None)
    answered_on = db.Column(db.DateTime, default=None)
    answer_updated_on = db.Column(db.DateTime, default=None)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, question_text, user_id, asked_on):
        self.question_text = question_text
        self.user_id = user_id
        self.asked_on = asked_on

    def json(self):
        return {
            'id': self.id,
            'question_text': self.question_text,
            'asked_on': json.dumps(self.asked_on, sort_keys=True, default=str)[1:-1],
            'answer_text': self.answer_text,
            'answered_on': json.dumps(self.answered_on, sort_keys=True, default=str)[1:-1] if self.answered_on else self.answered_on,
            'answer_updated_on': json.dumps(self.answer_updated_on, sort_keys=True, default=str)[1:-1] if self.answer_updated_on else self.answer_updated_on,
            'user_id': self.user_id
        }

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id_and_user_id(cls, id, user_id):
        return cls.query.filter_by(id=id, user_id=user_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
