document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    function updateHeaderBackground() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(250, 248, 246, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(250, 248, 246, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', function() {
        updateActiveNav();
        animateOnScroll();
        updateHeaderBackground();
    });
    
    updateActiveNav();
    animateOnScroll();
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinksContainer.classList.toggle('mobile-active');
            mobileMenu.classList.toggle('active');
            
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    const modal = document.getElementById('artworkModal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.querySelector('.modal-info h3');
    const modalDetails = document.querySelector('.artwork-details');
    const modalDescription = document.querySelector('.artwork-description');
    const modalImage = document.getElementById('modalArtworkImage');

    
    const artworkData = {
        'Nov.10-16,2024': {
            medium: 'Graphite and charcoal on paper',
            year: '2024',
            description: 'So I drew this portrait of someone I really admire - started it on November 10th, 2024 but didnt finish until the 16th because, well, I was being super lazy that week haha! The person in the drawing is someone Ive always looked up to because theyre a working student and just seeing how hard they work while juggling everything really inspires me. Its crazy how some people can balance work and school like that.'
        },
        'Smiley Eyes': {
            medium: 'Charcoal and graphite pencil on paper',
            year: '2024',
            description: 'This is a portrait I worked on back in October - started on the 10th and wrapped it up on the 14th, 2024. Its of this guy I really respect because hes a working student, and honestly that takes so much dedication. Like, I can barely handle one thing at a time and here he is managing both work and studies! Ive always admired people like that who just push through no matter what.'
        },
        'My Crushiee(ASPA)': {
            medium: 'Graphite pencil on paper',
            year: '2025',
            description: 'This is a portrait of my college crush, Aspa! I started admiring him back on December 17th, 2024, and finally got around to drawing him on May 12th, 2025 haha. Honestly, hes just so charming, cute, and handsome, like seriously, hes like a shining star to me! I dont know if its just me. It took me months to actually sit down and draw him, but when I did, I just wanted to show how amazing he looks. Hes got that special something that makes him stand out from everyone else 😍'
        },
        'Little Mark': {
            medium: 'Graphite and charcoal on paper',
            year: '2024',
            description: 'This is a portrait of little Mark, my crush who is a working student! I drew this from October 31st to November 3rd, 2024. I really admire how hard he works balancing school and work. There is something so attractive about his dedication that made me fall for him before. '
        }
    };
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const artworkCard = this.closest('.artwork-card');
            const artworkTitle = artworkCard.querySelector('.artwork-info h3').textContent;
            const imageSrc = artworkCard.querySelector('.artwork-image img').getAttribute('src');
            const artworkInfo = artworkData[artworkTitle];
            
            if (artworkInfo && modal && modalTitle && modalDetails && modalDescription) {
                modalTitle.textContent = artworkTitle;
                modalDetails.textContent = `${artworkInfo.medium} • ${artworkInfo.year}`;
                modalDescription.textContent = artworkInfo.description;
                modalImage.setAttribute('src', imageSrc);
                modalImage.setAttribute('alt', artworkTitle);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-pink)' : '#ff6b6b'};
            color: var(--charcoal);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const project = formData.get('project');
            const message = formData.get('message');
            
            if (!name || !email || !project || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your commission request has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-3deg) scale(1)';
        });
    }
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        const overlay = card.querySelector('.artwork-overlay');
        const image = card.querySelector('.artwork-image');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) rotate(0deg)';
        });
    });
    
    function createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 4}px;
                height: ${Math.random() * 6 + 4}px;
                background: var(--primary-pink);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatRandom ${Math.random() * 10 + 15}s linear infinite;
                pointer-events: none;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatRandom {
                    0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
                    50% { transform: translateY(-10px) translateX(-15px) rotate(180deg); }
                    75% { transform: translateY(-30px) translateX(5px) rotate(270deg); }
                    100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            hero.appendChild(element);
        }
    }
    
    createFloatingElements();
    
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                animateOnScroll();
                updateHeaderBackground();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }
    }, 300);
});