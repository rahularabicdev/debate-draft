// Function to send a new message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') {
        return; // Do nothing if message is empty
    }

    const chatBox = document.getElementById('chatBox');
    const messageId = Date.now(); // Unique ID for each message (timestamp)
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'sent');
    messageElement.setAttribute('data-messageid', messageId);
    messageElement.innerHTML = `
        <span class="message">${messageText}</span>
        <span class="timestamp">${getCurrentTime()}</span>
        <button class="edit-btn" onclick="editMessage(this)">Edit</button>
        <button class="delete-btn" onclick="deleteMessage(this)">Delete</button>`;
    chatBox.appendChild(messageElement);

    // Clear input after sending message
    messageInput.value = '';

    // Scroll to bottom of chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to edit a message
function editMessage(btnElement) {
    const messageElement = btnElement.parentElement;
    const messageTextElement = messageElement.querySelector('.message');
    const newMessageText = prompt('Enter new message:');
    if (newMessageText !== null) {
        messageTextElement.textContent = newMessageText.trim();
        messageElement.querySelector('.timestamp').textContent = getCurrentTime();
    }
}

// Function to delete a message
function deleteMessage(btnElement) {
    const messageElement = btnElement.parentElement;
    messageElement.remove();
}

// Function to get current time in HH:mm format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
