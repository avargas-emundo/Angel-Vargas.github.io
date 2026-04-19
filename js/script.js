document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. Dark Mode Logic
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleIcon = document.getElementById('themeToggleIcon');

    const setThemeIcon = isDark => {
        if (themeToggleIcon) {
            themeToggleIcon.classList.toggle('bi-moon-fill', !isDark);
            themeToggleIcon.classList.toggle('bi-sun-fill', isDark);
        }
    };

    const applyTheme = theme => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        setThemeIcon(isDark);
        localStorage.setItem('theme', theme);
    };

    const storedTheme = localStorage.getItem('theme');
    applyTheme(storedTheme === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    // 3. Timeline Logic
    const timeline = document.querySelector('.timeline-track');
    const timelineFill = document.querySelector('.timeline-fill');
    const timelineEvents = document.querySelectorAll('.timeline-event');

    const updateTimelineFill = () => {
        if (!timeline || !timelineFill) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const progress = Math.min(rect.height, windowHeight - rect.top);
        const fillHeight = Math.max(0, Math.min(rect.height, progress));
        timelineFill.style.height = `${fillHeight}px`;
    };

    if (timelineEvents.length > 0) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.35 }
        );
        timelineEvents.forEach(event => {
            observer.observe(event);

            event.addEventListener('click', () => {
                const details = event.querySelector('.timeline-details');
                if (!details) return;
                const isVisible = window.getComputedStyle(details).display !== 'none';
                details.style.display = isVisible ? 'none' : 'block';
            });
        });
    }

    if (timeline) {
        window.addEventListener('scroll', updateTimelineFill, { passive: true });
        window.addEventListener('resize', updateTimelineFill);
        updateTimelineFill();
    }

    // Timeline Click-to-Expand Logic
    const timelineCards = document.querySelectorAll('.timeline-event');

    timelineCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const details = card.querySelector('.timeline-details');
            if (details) {
                const isHidden = details.style.display === 'none';
                details.style.display = isHidden ? 'block' : 'none';
                
                // Optional: Add a slight scale effect when active
                card.style.transform = isHidden ? 'scale(1.02)' : 'scale(1)';
            }
        });
    });
});