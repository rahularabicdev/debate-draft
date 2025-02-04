function searchOpinions() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const cards = document.getElementsByClassName('opinion-card');

    for (let i = 0; i < cards.length; i++) {
        const h2 = cards[i].getElementsByTagName('h2')[0];
        if (h2) {
            const txtValue = h2.textContent || h2.innerText;
            cards[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

const opinionCards = document.querySelectorAll('.opinion-card');
opinionCards.forEach(card => {
    card.addEventListener('click', () => {
        const expertName = card.querySelector('h2').innerText;
        const expertField = card.querySelector('h3').innerText;
        const expertQuote = card.querySelector('p').innerText;
        
        document.getElementById('modal-expert-name').innerText = expertName;
        document.getElementById('modal-expert-field').innerText = expertField;
        document.getElementById('modal-expert-quote').innerText = expertQuote;

        document.getElementById('modal').style.display = "block"; // Show modal
    });
});

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}
