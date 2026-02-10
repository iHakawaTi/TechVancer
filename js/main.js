/* ============================================
   TechVancer Main JavaScript
   ============================================ */

(function () {
    // Mobile Navigation Toggle
    function initMobileNav() {
        const toggle = document.querySelector('.navbar-toggle');
        const menu = document.querySelector('.navbar-menu');
        const links = document.querySelectorAll('.navbar-link');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);

            // Toggle hamburger/close icon
            const iconHamburger = toggle.querySelector('.icon-hamburger');
            const iconClose = toggle.querySelector('.icon-close');
            if (iconHamburger && iconClose) {
                iconHamburger.style.display = isOpen ? 'none' : 'block';
                iconClose.style.display = isOpen ? 'block' : 'none';
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        links.forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active nav link based on current page
    function initActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-link');

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === currentPath ||
                (currentPath === '/' && href === 'index.html') ||
                (currentPath.endsWith('/') && href === 'index.html') ||
                currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
        });
    }

    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Form validation and submission
    function initForms() {
        const forms = document.querySelectorAll('form[data-form]');

        forms.forEach((form) => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                // Basic validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach((field) => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (!isValid) {
                    return;
                }

                // Show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                // Collect form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                try {
                    // Simulate form submission (replace with actual endpoint)
                    await new Promise((resolve) => setTimeout(resolve, 1500));

                    // Success
                    form.reset();
                    submitBtn.textContent = 'Sent!';
                    submitBtn.classList.add('success');

                    // Show success message
                    const successMsg = form.querySelector('.form-success');
                    if (successMsg) {
                        successMsg.style.display = 'block';
                    }

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);

                } catch (error) {
                    // Error handling
                    submitBtn.textContent = 'Error. Try again.';
                    submitBtn.classList.add('error');

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('error');
                    }, 3000);
                }
            });
        });
    }

    // Cookie consent banner
    function initCookieConsent() {
        const banner = document.querySelector('.cookie-banner');
        if (!banner) return;

        const accepted = localStorage.getItem('cookies-accepted');

        if (!accepted) {
            banner.style.display = 'block';

            banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
                localStorage.setItem('cookies-accepted', 'true');
                banner.style.display = 'none';
            });

            banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
                localStorage.setItem('cookies-accepted', 'false');
                banner.style.display = 'none';
            });
        }
    }

    // Initialize everything on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // Clear hash on Home load to prevent sticky navigation
        if (window.location.hash === '#services' && window.scrollY < 100) {
            history.replaceState(null, null, window.location.pathname);
            window.scrollTo(0, 0);
        }

        initMobileNav();
        initSmoothScroll();
        initActiveNavLink();
        initNavbarScroll();
        initForms();
        initCookieConsent();

        // Add page transition class (animation targets content only via CSS)
        document.body.classList.add('page-transition');
    });
})();
