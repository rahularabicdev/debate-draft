const socket = new WebSocket('wss://ws.ifelse.io'); // Replace with your WebSocket server URL
let users = {};
let currentUserId = null;

// WebSocket events
socket.onopen = function () {
    console.log('WebSocket connection established');
};

socket.onerror = function (error) {
    console.error('WebSocket Error:', error);
    alert('WebSocket connection error. Please try again later.');
};

socket.onclose = function () {
    console.log('WebSocket connection closed');
};

socket.onmessage = function (event) {
    const msg = JSON.parse(event.data);
    const messageContainer = document.getElementById('message-container');

    // Display the message with the username and reactions
    if (msg.text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${msg.user}</strong>: ${msg.text} <span class="message-time">(${msg.time})</span>`;
        
        // Add a placeholder for reactions
        const reactionsDiv = document.createElement('div');
        reactionsDiv.classList.add('reactions-display');
        messageElement.appendChild(reactionsDiv);

        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    } else if (msg.typing) {
        document.getElementById('typing-indicator').textContent = `${msg.user} is typing...`;
    } else {
        document.getElementById('typing-indicator').textContent = '';
    }
};

// Set username and user ID
function setUsername() {
    const input = document.getElementById('usernameInput');
    const username = input.value.trim();

    // Check if username is valid and not taken
    if (username && !Object.values(users).some(user => user.name === username)) {
        currentUserId = Date.now().toString();  // Use current time as unique ID
        users[currentUserId] = { name: username, id: currentUserId };

        alert('Username set as ' + username);
        input.value = '';
        document.getElementById('usernameSection').style.display = 'none';

        document.querySelector('header h1').textContent = `Live Discussions (${username})`;
    } else if (Object.values(users).some(user => user.name === username)) {
        alert('Username already exists. Try another one.');
    } else {
        alert('Please enter a valid username.');
    }
}

// Send message with user info
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message && currentUserId && socket.readyState === WebSocket.OPEN) {
        const currentUser = users[currentUserId];
        const msg = {
            text: message,
            user: currentUser.name,
            userId: currentUser.id,  // Send unique ID with the message
            time: new Date().toLocaleTimeString()
        };
        socket.send(JSON.stringify(msg));  // Send message to WebSocket server
        messageInput.value = '';
        hideTypingIndicator();
    } else {
        alert('Please set a username and ensure the WebSocket connection is open.');
    }
}

// Show typing indicator
function showTypingIndicator() {
    if (currentUserId && socket.readyState === WebSocket.OPEN) {
        const currentUser = users[currentUserId];
        const typingMsg = { typing: true, user: currentUser.name, userId: currentUser.id };
        socket.send(JSON.stringify(typingMsg));  // Notify WebSocket server that user is typing
    }
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingMsg = { typing: false, userId: currentUserId };
    socket.send(JSON.stringify(typingMsg));  // Notify WebSocket server that typing stopped
}

// Timer functionality
function startTimer() {
    let timerElement = document.getElementById('timeLeft');
    let totalTime = 15 * 60;

    const interval = setInterval(() => {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        totalTime--;

        if (totalTime < 0) {
            clearInterval(interval);
            timerElement.textContent = "Time's up!";
        }
    }, 1000);
}

startTimer();

// "Other" Topic Input Show/Hide
function showOtherTopicInput() {
    document.getElementById('otherTopicSection').style.display = 'block';
}

// Add "Other" Topic to the list
function addOtherTopic() {
    const otherTopicInput = document.getElementById('otherTopicInput');
    const topic = otherTopicInput.value.trim();

    if (topic) {
        const topicsContainer = document.querySelector('.topics');
        const newTopicButton = document.createElement('button');
        newTopicButton.classList.add('topic-card');
        newTopicButton.textContent = topic;
        newTopicButton.onclick = function() {
            // Handle new topic selection
            alert(`You selected: ${topic}`);
        };
        topicsContainer.appendChild(newTopicButton);

        otherTopicInput.value = '';
        document.getElementById('otherTopicSection').style.display = 'none';
    } else {
        alert('Please enter a topic.');
    }
}

// Add reaction to message
function addReaction(emoji) {
    const reactionsDisplay = document.querySelector('.reactions-display');
    const reaction = document.createElement('span');
    reaction.textContent = emoji;
    reactionsDisplay.appendChild(reaction);
}