// Vijay Kumawat Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const downloadResumeBtn = document.getElementById('downloadResume');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Improved active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.nav').offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 50;

        let activeSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + (sectionHeight / 2);
            const distanceFromCenter = Math.abs(scrollPosition - sectionCenter);

            // If we're within the section bounds or it's the closest section
            if ((scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) || 
                distanceFromCenter < closestDistance) {
                if (distanceFromCenter < closestDistance) {
                    closestDistance = distanceFromCenter;
                    activeSection = section;
                }
            }
        });

        // Special case for top of page - always highlight home
        if (window.scrollY < 100) {
            activeSection = document.querySelector('#home');
        }

        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (activeSection) {
            const sectionId = activeSection.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    }

    // Optimized scroll handler with throttling
    let scrollTimeout;
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                revealElements();
                updateNavBackground();
                ticking = false;
            });
            ticking = true;
        }
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a timeout to ensure final update
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
        }, 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Navigation background opacity based on scroll
    function updateNavBackground() {
        const nav = document.querySelector('.nav');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            nav.style.background = 'rgba(10, 14, 39, 0.98)';
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(10, 14, 39, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = 'none';
        }
    }

    // Scroll reveal animation
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Add reveal class to elements for animation
    function initializeRevealElements() {
        const elementsToReveal = [
            '.about__content',
            '.experience__item',
            '.project-card',
            '.skill-category',
            '.cert-card',
            '.training-item',
            '.education__item',
            '.contact__item'
        ];

        elementsToReveal.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('reveal');
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Download Resume functionality
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            showNotification('Resume download feature would be implemented here. Please contact directly for resume.', 'info');
        });
    }

    // Project card interactions
    function initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add glow class for hover effect
            card.classList.add('glow');
            
            // GitHub and Demo button functionality
            const githubBtn = card.querySelector('.btn--outline');
            const demoBtn = card.querySelector('.btn--primary');
            
            if (githubBtn) {
                githubBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('GitHub repository link would be available here.', 'info');
                });
            }
            
            if (demoBtn) {
                demoBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('Live demo would be available here.', 'info');
                });
            }
        });
    }

    // Social links functionality
    function initializeSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                //e.preventDefault();
                const platform = this.textContent.trim();
                //showNotification(`${platform} profile link would be available here.`, 'info');
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(45, 55, 72, 0.95);
            color: #e2e8f0;
            padding: 16px 20px;
            border-radius: 8px;
            border: 1px solid rgba(31, 184, 205, 0.3);
            max-width: 400px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #1fb8cd;
            font-size: 20px;
            cursor: pointer;
            margin-left: 12px;
            padding: 0;
        `;

        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            if (document.contains(notification)) {
                hideNotification(notification);
            }
        }, 5000);
    }

    function hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.contains(notification)) {
                notification.remove();
            }
        }, 300);
    }

    // Typing animation for hero title
    function initializeTypingAnimation() {
        const heroTitle = document.querySelector('.hero__title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let index = 0;
            function typeWriter() {
                if (index < originalText.length) {
                    heroTitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing animation after a short delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Skill tag hover effects
    function initializeSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-2px) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Certificate card animations
    function initializeCertCards() {
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = 'rgba(0, 255, 136, 0.5)';
                this.style.boxShadow = '0 5px 15px rgba(0, 255, 136, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Contact item interactions
    function initializeContactItems() {
        const contactItems = document.querySelectorAll('.contact__value');
        
        contactItems.forEach(item => {
            if (item.href) {
                item.addEventListener('click', function(e) {
                    // For mailto and tel links, let them work normally
                    if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                        return; // Allow default behavior
                    }
                });
            }
        });
    }

    // Parallax effect for hero background
    function initializeParallax() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    // Initialize all functionality
    function init() {
        initializeRevealElements();
        initializeProjectCards();
        initializeSocialLinks();
        initializeTypingAnimation();
        initializeSkillTags();
        initializeCertCards();
        initializeContactItems();
        initializeParallax();
        
        // Initial calls
        setTimeout(() => {
            updateActiveNavLink();
            revealElements();
            updateNavBackground();
        }, 100);
        
        // Add fade-in animation to hero content
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }

    // Start initialization
    init();

    // Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
            document.body.style.animation = 'rainbow 2s linear infinite';
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization - throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate positions if needed
            updateActiveNavLink();
        }, 150);
    });

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && !e.shiftKey) {
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            
            // Add focus outline to currently focused element
            const currentFocus = document.activeElement;
            if (currentFocus && focusableElements.length > 0) {
                currentFocus.style.outline = '2px solid #1fb8cd';
                currentFocus.style.outlineOffset = '2px';
            }
        }
    });

    // Remove focus outline when clicking
    document.addEventListener('mousedown', function() {
        const focusedElement = document.activeElement;
        if (focusedElement) {
            focusedElement.style.outline = 'none';
        }
    });

    console.log('🚀 Vijay Kumawat Portfolio loaded successfully!');
    console.log('💻 Built with modern web technologies');
    console.log('🔒 Cybersecurity themed design');
});