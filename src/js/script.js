document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const hero_section = document.getElementById('accueil');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.add(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
    
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Language switch functionality
    const frBtn = document.getElementById('fr-btn');
    const enBtn = document.getElementById('en-btn');
    let currentLang = localStorage.getItem('language') || 'fr';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Update active button based on current language
    if (currentLang === 'fr') {
        frBtn.classList.add('active');
        enBtn.classList.remove('active');
    } else {
        enBtn.classList.add('active');
        frBtn.classList.remove('active');
    }
    
    frBtn.addEventListener('click', () => {
        if (currentLang !== 'fr') {
            setLanguage('fr');
            currentLang = 'fr';
            localStorage.setItem('language', 'fr');
            frBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
    });
    
    enBtn.addEventListener('click', () => {
        if (currentLang !== 'en') {
            setLanguage('en');
            currentLang = 'en';
            localStorage.setItem('language', 'en');
            enBtn.classList.add('active');
            frBtn.classList.remove('active');
        }
    });
    
    // Function to set language
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            
            // Navigate through the nested keys
            for (const key of keys) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                element.textContent = value;
            }
        });

        // Update placeholders for form inputs
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const keys = element.getAttribute('data-i18n-placeholder').split('.');
            let value = translations[lang];
            
            // Navigate through the nested keys
            for (const key of keys) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                element.placeholder = value;
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert(currentLang === 'fr' ? 
                'Merci pour votre message ! Nous vous contacterons bientôt.' : 
                'Thank you for your message! We will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-item, .skills-category, .contact-item, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
});
