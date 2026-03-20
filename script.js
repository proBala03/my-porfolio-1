// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navbar = document.querySelector('.navbar');

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ===== Navigation Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Navbar + Active Link on Scroll =====
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    navbar.classList.toggle('scrolled', scrollTop > 16);

    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollTop >= sectionTop - 220) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
    contactForm.reset();

    console.log({ name, email, message });
});

// ===== Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Staggered Reveal =====
const revealTargets = document.querySelectorAll('.skill-tag, .project-card, .stat-card, .skill-category, .social-icon');

revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 6) * 70}ms`);
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealTargets.forEach(element => observer.observe(element));

// ===== Counter Animation for Stats =====
const countUpElements = document.querySelectorAll('.stat-card h3');

const countUp = (element, target, duration = 1800) => {
    let current = 0;
    const increment = target / (duration / 16);

    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCount();
};

let statsAnimated = false;
const statsSection = document.querySelector('.about-stats');

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const targets = [50, 30, 5];

            countUpElements.forEach((element, index) => {
                if (targets[index]) {
                    countUp(element, targets[index]);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Hero Parallax =====
const profileCircle = document.querySelector('.profile-circle');

window.addEventListener('mousemove', event => {
    if (!profileCircle || window.innerWidth < 900) return;

    const moveX = (event.clientX / window.innerWidth - 0.5) * 12;
    const moveY = (event.clientY / window.innerHeight - 0.5) * 12;

    profileCircle.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
});

window.addEventListener('mouseleave', () => {
    if (profileCircle) {
        profileCircle.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
});

// ===== Project Card Tilt =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', event => {
        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = -((y - rect.height / 2) / 18);
        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Scroll to Top Button =====
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '↑';
    button.title = 'Scroll to top';

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.classList.toggle('show', window.pageYOffset > 260);
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTopButton();

// ===== Link Click Placeholders =====
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Project link clicked:', link.textContent);
    });
});

document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const title = icon.getAttribute('title');
        console.log('Social icon clicked:', title);
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Console Welcome Message =====
console.log('%c Welcome to my Portfolio! ', 'background: linear-gradient(135deg, #0b8f87, #f97316); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore and get in touch! ', 'color: #0b8f87; font-size: 14px;');
