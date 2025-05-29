// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Executive carousel navigation
const cards = document.querySelectorAll('.executive-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');
let currentCard = 0;
let autoRotateInterval;

function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    cards[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextCard() {
    currentCard = (currentCard + 1) % cards.length;
    showCard(currentCard);
}

function prevCard() {
    currentCard = (currentCard - 1 + cards.length) % cards.length;
    showCard(currentCard);
}

// Event listeners
prevBtn.addEventListener('click', () => {
    clearInterval(autoRotateInterval);
    prevCard();
    autoRotateInterval = setInterval(nextCard, 5000);
});

nextBtn.addEventListener('click', () => {
    clearInterval(autoRotateInterval);
    nextCard();
    autoRotateInterval = setInterval(nextCard, 5000);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(autoRotateInterval);
        currentCard = index;
        showCard(currentCard);
        autoRotateInterval = setInterval(nextCard, 5000);
    });
});

// Start auto-rotation
autoRotateInterval = setInterval(nextCard, 5000);

// Scroll-based animations for services
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});
