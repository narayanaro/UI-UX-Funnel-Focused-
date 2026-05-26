document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggler
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Scroll Reveal & Sticky Header
    const header = document.querySelector('header');
    const floatTop = document.getElementById('floatTop');
    const reveals = document.querySelectorAll('.reveal');

    const handleScroll = () => {
        const scrollPos = window.scrollY;

        // Sticky Header class
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPos > 500) {
            floatTop.classList.add('show');
        } else {
            floatTop.classList.remove('show');
        }

        // Section Scroll Reveal
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 120; // threshold

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });

        // Dynamic Nav Link Highlighting
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - 150;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (top >= offset && top < offset + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run to show elements already in view
    handleScroll();

    // 3. Metric Count-Up Animation
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const startCountAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    const prefix = stat.getAttribute('data-prefix') || '';
                    const suffix = stat.getAttribute('data-suffix') || '';
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const stepTime = Math.max(Math.floor(duration / target), 15);
                    
                    const timer = setInterval(() => {
                        current += Math.ceil(target / (duration / stepTime));
                        if (current >= target) {
                            stat.textContent = prefix + target + suffix;
                            clearInterval(timer);
                        } else {
                            stat.textContent = prefix + current + suffix;
                        }
                    }, stepTime);
                });
                animated = true;
                observer.disconnect(); // Only animate once
            }
        });
    };

    const statsObserver = new IntersectionObserver(startCountAnimation, {
        threshold: 0.1
    });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 4. Form Submission & Custom Pipelines
    const auditForm = document.getElementById('auditForm');
    const formFields = document.getElementById('formFields');
    const successMessage = document.getElementById('successMessage');

    if (auditForm && formFields && successMessage) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple validation
            const name = document.getElementById('clientName').value.trim();
            const email = document.getElementById('clientEmail').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const website = document.getElementById('clientWebsite').value.trim();

            if (!name || !email || !phone || !website) {
                alert('Please fill out all the fields so we can generate your audit!');
                return;
            }

            // Simulate form submission to backend/analytics
            const btnSubmit = auditForm.querySelector('.btn-submit');
            const originalBtnText = btnSubmit.innerHTML;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing Website...';

            setTimeout(() => {
                btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Auditing SEO Profile...';
                
                setTimeout(() => {
                    btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Checking Core Web Vitals...';
                    
                    setTimeout(() => {
                        // Switch view to success state
                        formFields.style.animation = 'fadeOut 0.3s ease forwards';
                        
                        setTimeout(() => {
                            formFields.style.display = 'none';
                            successMessage.style.display = 'block';
                            
                            // Log capture metrics
                            console.log('Capture Lead Success:', { name, email, phone, website });
                        }, 300);
                        
                    }, 1200);
                }, 1000);
            }, 1000);
        });
    }

    // Add extra CSS fadeOut animation helper dynamically
    const styleHelper = document.createElement('style');
    styleHelper.innerHTML = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(styleHelper);

    // 5. Mouse Reactive Glow Effect
    const glowCards = document.querySelectorAll('.service-card, .process-step-item, .audit-form-container, .thankyou-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
