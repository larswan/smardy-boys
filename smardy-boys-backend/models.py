from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(db)


class User(db.Model):
    # this is the migration part
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    screen_name = db.Column(db.String(80))  # nullable=False
    email = db.Column(db.String(120), unique=True, nullable=True)  # nullable=False
    password = db.Column(db.String(120))  # nullable=False
    away_message = db.Column(db.String(120))  # nullable=False
    active = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # this is basic python classes
    # Here is where we whitelist what can be set on create by a user client
    def __init__(self, screen_name, password, away_message="not here", active=False):
        self.screen_name = screen_name
        # self.email = email
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
    roomId = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=True)  # nullable=False
    seen = db.Column(db.Boolean)  # nullable=False
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # this is basic python classes
    # Here is where we whitelist what can be set on create by a user client
    def __init__(self, content, userId, roomId):
        self.content = content
        self.userId = userId
        self.roomId = roomId
        self.seen = False

    def ownerName(self):
        owner = User.query.get(self.userId)
        return owner.screen_name

    def to_dict(self):  # this is how we serialize (similar to_json)
        return {
            'content': self.content,
            'id': self.id,
            'seen': self.seen,
            'userId': self.userId,
            'roomId': self.roomId,
            'screen_name': self.ownerName()
        }

    def __repr__(self): # simple return of the instance
        return '<Message %r>' % self.content


class Room(db.Model):
    # this is the migration part
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    userId1 = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)  # nullable=False
    userId2 = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)  # nullable=False
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # this is basic python classes
    # Here is where we whitelist what can be set on create by a user client
    def __init__(self, userId1, userId2):
        self.userId1 = userId1
        self.userId2 = userId2

    def to_dict(self):  # this is how we serialize (similar to_json)
        return {
            'id': self.id,
            'userId1': self.userId1,
            'userId2': self.userId2,
        }

    def __repr__(self): # simple return of the instance
        return '<Room %r>' % self.id
