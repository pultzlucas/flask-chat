from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from Room import Room
from Message import Message

main_room = Room('batata')
room_messages = []

app = Flask(__name__, static_url_path="", static_folder="static")
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def home():
    return render_template('chat.html')

@socketio.on('join')
def join(user):
    print(f"'{user['username']}' joined to the room.")

    join_room(main_room.name)
    main_room.add_member(user)

    data = {
        'user': user,
        'room': {
            'members': main_room.members,
            'messages': room_messages
        }
    }
    print(data)
    emit('newMember', data, to=main_room.name, broadcast=True, json=True)

@socketio.on('leave')
def leave(user):
    print(f"'{user['username']}' quit room.")

    leave_room(main_room.name)
    main_room.remove_member(user['username'])
    
    data = {
        'user': user,
        'room': {
            'members': main_room.members
        }
    }

    emit('leftMember', data, to=main_room.name, broadcast=True, json=True)


@socketio.on('post_message')
def post_message(data):
    room_messages.append({
        'writer': data['user'],
        'text': data['message']
    })
    emit('get_message', data, to=main_room, broadcast=True, json=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)