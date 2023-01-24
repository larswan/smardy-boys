from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(db)


class User(db.Model):
    # this is the migration part
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    screen_name = db.Column(db.String(80))  # nullable=False
    email = db.Column(db.String(120), unique=True)  # nullable=False
    password = db.Column(db.String(120))  # nullable=False
    away_message = db.Column(db.String(120))  # nullable=False
    active = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # this is basic python classes
    # Here is where we whitelist what can be set on create by a user client
    def __init__(self, screen_name, email, away_message, password, active):
        self.screen_name = screen_name
        self.email = email
        self.away_message = away_message
        self.password = password
        self.active = active

    def to_dict(self):  # this is how we serialize (similar to_json)
        return {
            'id': self.id,
            'screen_name': self.screen_name,
            'away_message': self.away_message,
            'email': self.email,
            'password': self.password,
            'active': self.active
        }

    def __repr__(self):
        return '<User %r>' % self.screen_name
    

class Message(db.Model):
    # this is the migration part
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)  # nullable=False
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)  # nullable=False
    seen = db.Column(db.Boolean)  # nullable=False
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # this is basic python classes
    # Here is where we whitelist what can be set on create by a user client
    def __init__(self, content, userId, seen):
        self.content = content
        self.userId = userId
        self.seen = seen

    def to_dict(self):  # this is how we serialize (similar to_json)
        return {
            'content': self.content,
            'userId': self.userId,
            'seen': self.seen
        }

    def __repr__(self): # simple return of the instance
        return '<Message %r>' % self.content
