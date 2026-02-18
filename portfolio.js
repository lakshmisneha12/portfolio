// Dark mode toggle functionality
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for navigation links
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

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Resume upload functionality
const resumeUpload = document.getElementById('resume-upload');
const uploadArea = document.querySelector('.upload-area');

resumeUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
        
        if (file.type === 'application/pdf' || 
            file.type === 'application/msword' || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            
            uploadArea.innerHTML = `
                <div style="color: green;">
                    <p>✅ File uploaded successfully!</p>
                    <p><strong>${fileName}</strong> (${fileSize} MB)</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Upload Another</button>
                </div>
            `;
        } else {
            alert('Please upload a PDF or Word document.');
            this.value = '';
        }
    }
});

// Drag and drop functionality for resume upload
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.background = 'var(--primary-color)';
    this.style.color = 'white';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.background = 'var(--section-bg)';
    this.style.color = 'var(--text-color)';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.background = 'var(--section-bg)';
    this.style.color = 'var(--text-color)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        resumeUpload.files = files;
        resumeUpload.dispatchEvent(new Event('change'));
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    
    if (heroTitle && heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Enthusiastic Computer Science student specializing in AI, ML, and Software Development', 80);
        }, 1000);
    }
});

// Add active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation
const style = document.createElement('style');
style.textContent = `
    #nav-links a.active {
        color: var(--primary-color) !important;
        font-weight: 700;
    }
`;
document.head.appendChild(style);