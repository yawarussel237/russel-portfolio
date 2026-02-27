// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile_menu');
const desktopMenu = document.getElementById("desktop_menu");

mobileMenu.addEventListener('click', () => {
    desktopMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const menuLinks = desktopMenu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        desktopMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
const projectCards = document.querySelectorAll('.project_card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe all about cards
const aboutCards = document.querySelectorAll('.About-card');
aboutCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(54, 179, 126, 0.08) 100%)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'linear-gradient(135deg, rgba(54, 179, 126, 0.05) 0%, transparent 100%)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to buttons on hover
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation and submission feedback
const contactForm = document.querySelector('.contact_form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#d32f2f';
            } else {
                input.style.borderColor = 'transparent';
            }
        });
        
        if (isValid) {
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Message sent! ✓';
            button.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                this.reset();
            }, 3000);
        }
    });
}