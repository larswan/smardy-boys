import os
from flask import Flask, send_file, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db, User, Message, Room
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__, static_folder='public')
CORS(app, origins=['*'])
app.config.from_object(Config)
jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins='*')


@app.get('/')
def home():
    return send_file('welcome.html')


@app.get('/example')
def example():
    return {'message': 'Your app is running python'}

# run user.to_dict() for every user in users


@app.get('/users')
def all_users():
    users = User.query.all()
    User.query.count()
    return jsonify([user.to_dict() for user in users])

@app.get('/users/<int:id>')
def show_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.to_dict())
    else:
        return {}, 404

@app.post('/users')
def users():
    data = request.json
    user = User(data['screen_name'], data['password'])
    print(data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

# get all messages original route
# @app.get('/messages')
# def all_mesages():
#     allMessages = Message.query.all()
#     messages = allMessages[::-1]
#     Message.query.count()
#     return jsonify([message.to_dict() for message in messages])


@app.get('/messages/<int:room>')
def all_mesages(room):
    allMessages = Message.query.filter_by(roomId=room)
    messages = allMessages[::-1]
    Message.query.count()
    return jsonify([message.to_dict() for message in messages])

@app.post('/messages')
def messages():
    data = request.json
    message = Message(data['content'], data['userId'], data['roomId'])
    # print(data)
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201

@app.get('/rooms')
def all_rooms():
    rooms = Room.query.all()
    Room.query.count()
    return jsonify([room.to_dict() for room in rooms])

@app.get('/rooms/<int:id>')
def show_room(id):
    room = Room.query.get(id)
    return jsonify(room.to_dict())

@app.post('/rooms/<int:roomId>/<int:roomId2>')
def rooms(roomId, roomId2):
    # print(roomId, roomId2)
    findRoom1 = Room.query.filter_by(userId1=roomId, userId2=roomId2).first()
    findRoom2 = Room.query.filter_by(userId2=roomId, userId1=roomId2).first()
    print(findRoom1)
    if findRoom1:
        return jsonify(findRoom1.id), 201
    elif findRoom2:
        return jsonify(findRoom2.id), 201
    else:
        room = Room(roomId, roomId2)
        print("new room is ", room.id)
        db.session.add(room)
        db.session.commit()
        return jsonify(room.id), 201

@app.post('/login')
def login():
    data = request.json
    user = User.query.filter_by(screen_name=data['screen_name']).first()
    if not user:
        return jsonify({'error': 'No user found'}), 404
    given_password = data['password']
    if user.password == given_password:
        # encode JWT as the token variable, signing it with our application's secret key
        # we store only what the token will need while identifying the users on any given request
        user.active = True
        print(user.active)
        db.session.commit()
        token = create_access_token(identity=user.id)
        return jsonify({'user': user.to_dict(), 'token': token})
    else:
        return jsonify({'error': 'Invalid screen name or password'}), 422

@socketio.on('connect')
def connected():
    # '''This function is an event listener that gets called when the client connects to the server'''
    print(f'Client {request.sid} has connected')
    emit('connect', {
         'data': f'id: {request.sid} is connected'}, broadcast=True)


    # '''This function runs whenever a client sends a socket message to be broadcast'''
@socketio.on('message')
# @jwt_required()
def handle_message(data):
    # user = User.query.get(id)
    # if user:
    #     current_user = get_jwt_identity()
    print(f'Message from Client {request.sid} : ', data)
    emit('message', data, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    # '''This function is an event listener that gets called when the client disconnects from the server'''
    print(f'Client {request.sid} has disconnected')
    emit('disconnect',
         f'Client {request.sid} has disconnected', broadcast=True)


@socketio.on('join')
def on_join(data):
    screen_name = data['screen_name']
    room = data['roomId']
    join_room(room)
    send(screen_name + ' has entered room', to=room)
    emit('join', data, to=room, broadcast=True)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT', 3000))
