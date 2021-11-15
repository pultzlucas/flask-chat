function ChatMessage({ writer, text, mode }) {
    const div = document.createElement('div')
    div.classList.add('chat-message', `chat-message-${mode}`)

    const strong = document.createElement('strong')
    
    const h3 = document.createElement('h3')
    h3.classList.add('chat-message-writer')
    
    const p = document.createElement('p')
    p.classList.add('chat-message-text')
    
    strong.textContent = writer
    p.textContent = text

    h3.appendChild(strong)
    div.appendChild(h3)
    div.appendChild(p)
    return div
}