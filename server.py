from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_url_path="", static_folder="static")
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def home():
    return render_template('chat.html')

@socketio.on('join')
def join(user):
    print(f"'{user['username']}' is connected...")

@socketio.on('leave')
def leave(user):
    print(f"'{user['username']}' was disconnected...")


@socketio.on('post_message')
def post_message(data):
    emit('get_message', data, broadcast=True, json=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)