const socket = io('http://localhost:5000')
// const username = prompt('What is your name?', '')

socket.on('connect', () => {
    console.log('Connected to the websocket server...')
})

socket.on('disconnect', () => {
    console.log('Disconnected from websocket server...')
})

socket.on('get_message', msg => {
    const chatMessage = ChatMessage({
        writer: msg.username,
        text: msg.message,
        mode: msg.username === username? 'mine' : 'other'
    })
    document.querySelector('.chat-view').appendChild(chatMessage)
})

function postMessage(e) {
    e.preventDefault()
    const [message] = e.target
    if (message.value.trim() === "") return

    socket.emit('post_message', {
        username,
        message: message.value
    })

    message.value = ""
}

document.querySelector('form').addEventListener('submit', postMessage)