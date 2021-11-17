const socket = io('http://localhost:5000')
const user = {
    username: prompt('What is your name?', '')
}

socket.on('connect', () => {
    console.log('Connected to the websocket server...')
    showUsername(user)
    socket.emit('join', user)
})

socket.on('newMember', ({ user: member, room }) => {
    console.log(`New Member: '${member.username}'`)

    if(member.username == user.username) {
        for (let { writer, text } of room.messages) {
            document.querySelector('.chat-view').appendChild(
                ChatMessage({
                    writer: writer.username,
                    text,
                    mode: writer.username === user.username ? 'mine' : 'other'
                })
            )
        }
    }

    updateMembers(room.members)
})

socket.on('leftMember', ({ user: leftUser, room }) => {
    console.log(`Left Member: '${leftUser.username}'`)
    updateMembers(room.members)
})

socket.on('disconnect', () => {
    console.log('Disconnected from websocket server')
    socket.emit('leave', user)
})

socket.on('get_message', ({ user: writer, message }) => {
    document.querySelector('.chat-view').appendChild(
        ChatMessage({
            writer: writer.username,
            text: message,
            mode: writer.username === user.username ? 'mine' : 'other'
        })
    )
})

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const [message] = e.target
    if (message.value.trim() === '') return
    postMessage(user, message)
    message.value = ""
})

window.addEventListener('beforeunload', e => {
    e.preventDefault()
    socket.emit('leave', user)
})