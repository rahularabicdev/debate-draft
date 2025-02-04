// Submit Vote and Update Poll Chart
function submitVote() {
    const votesA = document.getElementById('votesA');
    const votesB = document.getElementById('votesB');
    
    if (document.querySelector('input[name="vote"]:checked').value === "Speaker A") {
        votesA.textContent = parseInt(votesA.textContent) + 1;
    } else {
        votesB.textContent = parseInt(votesB.textContent) + 1;
    }

    updatePollChart(); // Update chart dynamically
    alert("Thank you for your vote!");
}

function updatePollChart() {
    const votesA = parseInt(document.getElementById('votesA').textContent);
    const votesB = parseInt(document.getElementById('votesB').textContent);

    pollChart.data.datasets[0].data = [votesA, votesB];
    pollChart.update();
}

// Chat with Typing Indicator
let typingTimeout;
function showTypingIndicator() {
    clearTimeout(typingTimeout);
    document.getElementById('typingIndicator').style.display = 'block';
    typingTimeout = setTimeout(function() {
        document.getElementById('typingIndicator').style.display = 'none';
    }, 1500);
}

// Send Message to Chat
function sendMessage() {
    let message = document.getElementById('chatMessage').value;
    let chatDisplay = document.getElementById('chatDisplay');
    if (message) {
        chatDisplay.innerHTML += `<p>User: ${message}</p>`;
        document.getElementById('chatMessage').value = '';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}

// Countdown Timer with Sound Alert
let timeLeft = 180;
let timerInterval = setInterval(function () {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timeLeft').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
        clearInterval(timerInterval);
        playAlertSound(); // Play sound when time is up
    }
}, 1000);

function playAlertSound() {
    const audio = new Audio('alert.mp3');
    audio.play();
}

// Social Media Feed
let posts = [
    { username: 'Rohini', content: 'Amazing points being made right now! #ClimateDebate', likes: 5, replies: [] },
    { username: 'Neha', content: 'Speaker B is really turning things around. #EconomicImpact', likes: 8, replies: [] }
];

function renderPosts() {
    let socialFeed = document.getElementById('socialFeed');
    socialFeed.innerHTML = '';
    posts.forEach((post, index) => {
        socialFeed.innerHTML += `
            <div class="post">
                <p><strong>${post.username}:</strong> ${post.content}</p>
                <div class="post-actions">
                    <button onclick="likePost(${index})">👍 ${post.likes}</button>
                    <button onclick="replyToPost(${index})">💬 Reply</button>
                    <button onclick="sharePost(${index})">🔗 Share</button>
                </div>
                <div class="replies">
                    ${post.replies.map(reply => `<p>${reply}</p>`).join('')}
                </div>
            </div>
        `;
    });
}

function likePost(index) {
    posts[index].likes++;
    renderPosts();
}

function postToFeed() {
    let newPost = document.getElementById('newPost').value;
    if (newPost) {
        posts.unshift({ username: '@currentUser', content: newPost, likes: 0, replies: [] });
        document.getElementById('newPost').value = '';
        renderPosts();
    } else {
        alert('Please enter some content.');
    }
}

function replyToPost(index) {
    let reply = prompt("Enter your reply:");
    if (reply) {
        posts[index].replies.push(reply);
        renderPosts();
    }
}

function sharePost(index) {
    alert(`Post shared: ${posts[index].content}`);
}

renderPosts();

// Poll Chart Setup
const ctx = document.getElementById('pollChart').getContext('2d');
const pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Speaker A', 'Speaker B'],
        datasets: [{
            label: 'Votes',
            data: [250, 250],
            backgroundColor: ['#28a745', '#dc3545']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

