const profileBtn = document.querySelector('.profile-btn');
const profileModal = document.getElementById('profileModal');
const closeBtn = document.getElementById('closeBtn');

profileBtn.addEventListener('click', () => {
    profileModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === profileModal) {
        profileModal.style.display = 'none';
    }
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

const joinButtons = document.querySelectorAll('.join-btn');
joinButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('You have joined the discussion!');
    });
});

