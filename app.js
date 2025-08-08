// Kevin Shah Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme management: system default with user override
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeMeta = document.getElementById('theme-color-meta');

    function getSystemPref() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(scheme, persist=false) {
        root.setAttribute('data-color-scheme', scheme);
        if (persist) localStorage.setItem('theme', scheme);
        if (themeToggle) themeToggle.setAttribute('aria-pressed', String(scheme === 'light'));
        if (themeMeta) themeMeta.setAttribute('content', scheme === 'light' ? '#f8fafc' : '#0b0d0f');
    }

    const stored = localStorage.getItem('theme');
    const initial = stored || getSystemPref();
    applyTheme(initial);

    if (themeToggle) {
        const sun = document.getElementById('icon-sun');
        const moon = document.getElementById('icon-moon');
        const reflect = () => {
            const scheme = root.getAttribute('data-color-scheme');
            if (scheme === 'light') { sun.classList.remove('hidden'); moon.classList.add('hidden'); }
            else { sun.classList.add('hidden'); moon.classList.remove('hidden'); }
        };
        reflect();
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-color-scheme') || initial;
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next, true);
            reflect();
        });
    }

    // Sync with system if no user override
    const media = window.matchMedia('(prefers-color-scheme: light)');
    if (media && !stored) {
        media.addEventListener('change', (e) => {
            applyTheme(e.matches ? 'light' : 'dark');
        });
    }
    // Navigation functionality
    const nav = document.querySelector('.nav');
    const navMenu = document.getElementById('primary-menu');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
    const menuToggle = document.getElementById('menu-toggle');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    nav.addEventListener('click', (e) => {
        const t = e.target.closest('a[href^="#"]');
        if (!t) return;
        e.preventDefault();
        const targetSection = document.querySelector(t.getAttribute('href'));
        if (targetSection) {
            const headerOffset = 100;
            const offsetPosition = targetSection.offsetTop - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        if (menuToggle && navMenu) { menuToggle.setAttribute('aria-expanded', 'false'); navMenu.classList.remove('open'); }
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
        });
    }

    // Active navigation highlighting
    function updateActiveNavigation() {
        let current = 'home'; // Default to home
        const scrollPosition = window.scrollY + 120; // Adjust offset

        // Check each section to find which one is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        // Update navigation active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            const linkHref = link.getAttribute('href').substring(1); // Remove #
            if (linkHref === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Header background on scroll
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(252, 252, 249, 0.95)';
            header.style.backdropFilter = 'blur(12px)';
        } else {
            header.style.backgroundColor = 'var(--color-surface)';
            header.style.backdropFilter = 'blur(8px)';
        }
    }

    // Throttled scroll handler for better performance
    let ticking = false;
    function throttledScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavigation();
                updateHeaderBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Initialize on page load
    updateActiveNavigation();
    updateHeaderBackground();

    // Enhanced project hover effects
    // Hover effects handled via CSS only; remove JS style thrash

    // Enhanced tech tag interactions
    // Tech tag hovers: CSS handles transitions

    // Resume download with feedback
    const resumeButton = document.querySelector('a[download]');
    if (resumeButton) {
        resumeButton.addEventListener('click', function(e) {
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            this.style.opacity = '0.7';
            
            // Reset button after short delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
            
            console.log('Kevin Shah Resume download initiated');
        });
    }

    // Enhanced external link handling
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            const originalOpacity = this.style.opacity;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.opacity = originalOpacity || '1';
            }, 200);
            
            console.log('External link opened:', this.href);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections and cards
    const animatedElements = document.querySelectorAll('.job, .project, .value, .skill-category, .education-item, .project-category');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });

    // Add hover effects to contact items
    // Contact tile hovers: CSS handles transitions

    // Add subtle animations to value cards
    const valueCards = document.querySelectorAll('.value');
    valueCards.forEach(card => {
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
            this.style.boxShadow = '4px 4px 12px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add hover effects to project categories
    const projectCategories = document.querySelectorAll('.project-category');
    projectCategories.forEach(category => {
        category.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add hover effects to education items
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        item.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Add hover effects to job cards
    const jobCards = document.querySelectorAll('.job');
    jobCards.forEach(job => {
        job.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        job.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Arrow key navigation for sections
        if (e.ctrlKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            const currentIndex = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom > 150;
            });
            
            let targetIndex;
            if (e.key === 'ArrowDown') {
                targetIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            if (targetIndex !== currentIndex && sections[targetIndex]) {
                const headerOffset = 100;
                const elementPosition = sections[targetIndex].offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Add loading states for better UX
    function addLoadingState(element, duration = 1000) {
        element.style.opacity = '0.7';
        element.style.pointerEvents = 'none';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.pointerEvents = 'auto';
        }, duration);
    }

    // Email click handler with copy functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Also copy email to clipboard
            const email = this.href.replace('mailto:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    console.log('Email copied to clipboard:', email);
                }).catch(err => {
                    console.log('Could not copy email:', err);
                });
            }
        });
    }

    // Phone number click handler for mobile
    const phoneElement = document.querySelector('.contact__item span');
    if (phoneElement && phoneElement.textContent.includes('+91')) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', function() {
            const phone = this.textContent.replace(/[^\d+]/g, '');
            window.location.href = `tel:${phone}`;
        });
    }

    // Scroll to top functionality
    let scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    }, { passive: true });

    // Console welcome message
    console.log('🚀 Kevin Shah Portfolio loaded successfully');
    console.log('💻 AI Software Developer specializing in agentic automation workflows');
    console.log('🎨 Built with minimal JavaScript for optimal performance');
    console.log('📧 Contact: kevinshah.professional@gmail.com');
    console.log('🔗 LinkedIn: https://www.linkedin.com/in/-kevinshah/');
});