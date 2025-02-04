let carouselIndex = 0;

// Show selected tab content
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

// Filter experts by topic
function filterContent(topic) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.getAttribute('data-topic') === topic || topic === 'All') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Navigate carousel items
function showCarouselItem(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const container = document.querySelector('.carousel-container');

    items[carouselIndex].classList.remove('active');
    carouselIndex = (carouselIndex + direction + items.length) % items.length;
    items[carouselIndex].classList.add('active');

    container.style.transform = `translateX(-${carouselIndex * 220}px)`;
}

// Toggle expert details
function viewDetails(expertName) {
    const expertDetails = document.getElementById(`${expertName}-details`);
    expertDetails.classList.toggle('active');
}

// Follow Expert with Notification
function followExpert(button) {
    const card = button.closest('.card');
    const expertName = card.querySelector('h3').textContent;
    const expertTitle = card.querySelector('p').textContent;

    // Show notification with updated design
    showNotification(`You followed ${expertName}, ${expertTitle}`);
}

// Display a styled notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Append notification to the body
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    items[0].classList.add('active');
});