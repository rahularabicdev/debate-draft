function submitVote() {
    alert("Thank you for your vote!");
}

function postComment() {
    let comment = document.getElementById('userComment').value;
    let display = document.getElementById('commentsDisplay');
    if (comment) {
        display.innerHTML += `<p><strong>User:</strong> ${comment}</p>`;
        document.getElementById('userComment').value = '';
        alert("New comment posted!");
    } else {
        alert('Please enter a comment.');
    }
}

function searchComments() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const comments = document.querySelectorAll('#commentsDisplay p');
    comments.forEach(comment => {
        if (comment.innerText.toLowerCase().includes(input)) {
            comment.style.display = '';
        } else {
            comment.style.display = 'none';
        }
    });
}

function sendMessage() {
    let message = document.getElementById('chatMessage').value;
    let chatDisplay = document.getElementById('chatDisplay');
    if (message) {
        chatDisplay.innerHTML += `<p>User: ${message}</p>`;
        document.getElementById('chatMessage').value = '';
        chatDisplay.scrollTop = chatDisplay.scrollHeight; 
    }
}


let currentHighlightIndex = 0;

function bookmarkHighlight() {
   
    if (currentHighlightIndex >= highlights.length) {
        currentHighlightIndex = 0;
    }

    
    const currentHighlight = highlights[currentHighlightIndex];

  
    currentHighlightIndex++;

   
    let highlightList = document.getElementById('highlightList');
    highlightList.innerHTML += `<p>Highlighted bookmarked: <img src="${currentHighlight}" width="50"></p>`;
}

let timeLeft = 180;
setInterval(function () {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timeLeft').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}, 1000);


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