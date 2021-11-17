function updateMembers(members) {
    const membersList = document.querySelector('.chat-members').querySelector('ul')
    membersList.innerHTML = ''

    for (let member of members) {
        const item = document.createElement('li')
        item.textContent = member.username
        membersList.appendChild(item)
    }
}

function showUsername(user) {
    const username = document.querySelector('.my-name').querySelector('p')
    username.textContent = user.username
}

function postMessage(user, message) {
    socket.emit('post_message', {
        user,
        message: message.value,
    })
}