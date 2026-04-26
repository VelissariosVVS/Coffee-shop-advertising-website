// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        const navUl = navbar.querySelector('ul');
        navUl.classList.toggle('show');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after click
            const navUl = navbar.querySelector('ul');
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
            }
        }
    });
});

// Contact form submission (to backend)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        formStatus.innerHTML = 'Sending...';
        formStatus.style.color = '#2d4a3e';
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            const result = await response.json();
            
            if (result.success) {
                formStatus.innerHTML = '✅ Message sent! We\'ll reply soon.';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '❌ Error: ' + result.error;
                formStatus.style.color = '#b00020';
            }
        } catch (err) {
            formStatus.innerHTML = '❌ Could not send. Please try again later.';
            formStatus.style.color = '#b00020';
        }
        
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 4000);
    });
}

// Simple animation on scroll (fade-in)
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});