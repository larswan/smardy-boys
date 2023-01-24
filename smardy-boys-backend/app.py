import os
from flask import Flask, send_file, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db, User, Message
from flask_socketio import SocketIO, emit
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__, static_folder='public')
CORS(app, origins=['*'])
app.config.from_object(Config)
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


@app.post('/users')
def users():
    data = request.form
    user = User(data['screen_name'], data['password'])
    print(data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@app.post('/login')
def login():
    data = request.form
    user = User.query.filter_by(screen_name=data['screen_name']).first()
    if not user:
        return jsonify({'error': 'No user found'}), 404
    given_password = data['password']
    if user.password == given_password:
        # encode JWT as the token variable, signing it with our application's secret key
        # we store only what the token will need while identifying the users on any given request
        token = create_access_token(identity=user.id)
        return jsonify({'user': user.to_dict(), 'token': token})
    else:
        return jsonify({'error': 'Invalid screen name or password'}), 422

@socketio.on('connect')
def connected():
    # '''This function is an event listener that gets called when the client connects to the server'''
    print(f'Client {request.sid} has connected')
    emit('connect', {'data': f'id: {request.sid} is connected'})


@socketio.on('message')
def handle_message(data):
    # '''This function runs whenever a client sends a socket message to be broadcast'''
    print(f'Message from Client {request.sid} : ', data)
    emit('data', {'data': 'data', 'id': request.sid}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    # '''This function is an event listener that gets called when the client disconnects from the server'''
    print(f'Client {request.sid} has disconnected')
    emit('disconnect',
         f'Client {request.sid} has disconnected', broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT', 3000))
