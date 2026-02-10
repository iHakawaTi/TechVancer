/* ============================================
   TechVancer Scroll Animations
   ============================================ */

(function () {
    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');

        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Optionally stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        animatedElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // Staggered animation for card grids
    function initStaggeredAnimations() {
        const grids = document.querySelectorAll('[data-stagger]');

        grids.forEach((grid) => {
            const children = grid.children;
            const delay = parseInt(grid.dataset.stagger) || 100;

            Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * delay}ms`;
            });
        });
    }

    // Parallax effect for hero sections
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Counter animation for statistics
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');

        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach((counter) => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 2000;
        const suffix = element.dataset.suffix || '';
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Initialize all animations on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initStaggeredAnimations();
        initParallax();
        initCounters();
    });
})();
