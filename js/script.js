document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════
    // 1. PAGE TRANSITION — fade in on load
    // ═══════════════════════════════════════════
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // ═══════════════════════════════════════════
    // 2. DARK MODE
    // ═══════════════════════════════════════════
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

    // ═══════════════════════════════════════════
    // 3. TIMELINE — scroll fill + click expand
    // ═══════════════════════════════════════════
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
                    if (entry.isIntersecting) entry.target.classList.add('in-view');
                });
            },
            { threshold: 0.2 }
        );
        timelineEvents.forEach(event => {
            observer.observe(event);
            event.addEventListener('click', () => {
                const details = event.querySelector('.timeline-details');
                if (!details) return;
                const isHidden = details.style.display === 'none' || details.style.display === '';
                details.style.display = isHidden ? 'block' : 'none';
                event.style.transform = isHidden ? 'scale(1.02)' : 'scale(1)';
            });
        });
    }

    if (timeline) {
        window.addEventListener('scroll', updateTimelineFill, { passive: true });
        window.addEventListener('resize', updateTimelineFill);
        updateTimelineFill();
    }

    // ═══════════════════════════════════════════
    // 4. GSAP ANIMATIONS
    // ═══════════════════════════════════════════
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // HERO — index.html
    const heroName   = document.querySelector('.hero-name');
    const heroRole   = document.querySelector('.hero-role');
    const heroLead   = document.querySelector('.hero-lead');
    const heroCta    = document.querySelector('.hero-cta-group');
    const heroBadges = document.querySelector('.hero-badges');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroName) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(heroName,   { y: 60, opacity: 0, duration: 1 })
          .from(heroRole,   { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
          .from(heroLead,   { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .from(heroCta,    { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
          .from(heroBadges, { y: 16, opacity: 0, duration: 0.5 }, '-=0.3');
        if (heroVisual) {
            tl.from(heroVisual, { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, 0.15);
        }
    }

    // PROJECTS PAGE hero
    const projectsHeader  = document.querySelector('.projects-header h1');
    const projectsDesc    = document.querySelector('.projects-header .header-desc');
    const projectsEyebrow = document.querySelector('.projects-header .eyebrow');
    if (projectsHeader) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(projectsEyebrow, { y: 20, opacity: 0, duration: 0.5 })
          .from(projectsHeader,  { y: 50, opacity: 0, duration: 0.9 }, '-=0.2')
          .from(projectsDesc,    { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
    }

    // ABOUT PAGE hero
    const aboutOpening     = document.querySelector('.about-opening h1');
    const aboutEyebrow     = document.querySelector('.about-opening .eyebrow');
    const aboutOpeningBody = document.querySelector('.about-opening .opening-body');
    if (aboutOpening) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(aboutEyebrow,     { y: 20, opacity: 0, duration: 0.5 })
          .from(aboutOpening,     { y: 50, opacity: 0, duration: 0.9 }, '-=0.2')
          .from(aboutOpeningBody, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
    }

    // SECTION EYEBROWS
    document.querySelectorAll('.section-eyebrow').forEach(el => {
        gsap.from(el, {
            x: -30, opacity: 0, duration: 0.6, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
        });
    });

    // SECTION TITLES
    document.querySelectorAll(
        '#about h2, #technical-showcase h2, #timeline h2, #contact h2, #summary h2, .cs-title, .story-section h2'
    ).forEach(el => {
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
    });

    // SHOWCASE CARDS
    const showcaseCards = document.querySelectorAll('.glass-showcase-card');
    if (showcaseCards.length) {
        gsap.from(showcaseCards, {
            y: 50, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
            immediateRender: false,
            scrollTrigger: {
                trigger: showcaseCards[0].closest('.row') || showcaseCards[0],
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }

    // CARD IMAGE HOVER ZOOM
    document.querySelectorAll('.glass-showcase-card').forEach(card => {
        const img = card.querySelector('.project-header-img img');
        if (!img) return;
        card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.07, duration: 0.5, ease: 'power2.out' }));
        card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: 0.5, ease: 'power2.out' }));
    });

    // CASE STUDY IMAGE HOVER ZOOM
    document.querySelectorAll('.cs-image').forEach(img => {
        img.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.04, duration: 0.6, ease: 'power2.out' }));
        img.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: 0.6, ease: 'power2.out' }));
    });

    // KPI STRIPS
    document.querySelectorAll('.kpi-strip').forEach(strip => {
        gsap.from(strip.querySelectorAll('.kpi-block'), {
            y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: strip, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // ─────────────────────────────────────────
    // ABOUT STATS COUNT-UP — FIXED
    // Bug was: gsap.from counts DOWN. Fixed to gsap.to.
    // Bug was: suffix regex broke on ≈$3.4M. Fixed split.
    // ─────────────────────────────────────────
    document.querySelectorAll('.about-stat-number').forEach(el => {
        const originalText = el.textContent.trim();
        const numMatch = originalText.match(/[\d.]+/);
        if (!numMatch) return;

        const rawNum = parseFloat(numMatch[0]);
        const prefix = originalText.replace(/[\d.].*$/, '');       // before first digit
        const suffix = originalText.replace(/^[\s\S]*[\d]/, '');   // after last digit
        const isFloat = numMatch[0].includes('.');

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            onEnter: () => {
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: rawNum,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate() {
                        const v = isFloat
                            ? counter.val.toFixed(1)
                            : Math.round(counter.val);
                        el.textContent = `${prefix}${v}${suffix}`;
                    },
                    onComplete() {
                        el.textContent = originalText; // restore exact original
                    }
                });
            },
            once: true
        });
    });

    // TIMELINE CARDS FROM SIDES
    document.querySelectorAll('.timeline-event-left .timeline-content').forEach(el => {
        gsap.from(el, {
            x: -50, opacity: 0, duration: 0.7, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });
    document.querySelectorAll('.timeline-event-right .timeline-content').forEach(el => {
        gsap.from(el, {
            x: 50, opacity: 0, duration: 0.7, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // STORY GRIDS
    document.querySelectorAll('.story-grid').forEach(grid => {
        gsap.from(grid.querySelectorAll('.story-col'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // TAXONOMY
    document.querySelectorAll('.taxonomy-block').forEach(block => {
        gsap.from(block.querySelectorAll('.taxonomy-item'), {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // VALUE CARDS
    document.querySelectorAll('.values-grid').forEach(grid => {
        gsap.from(grid.querySelectorAll('.value-card'), {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // PASSION ITEMS
    document.querySelectorAll('.passion-item').forEach((item, i) => {
        gsap.from(item, {
            x: i % 2 === 0 ? -30 : 30, opacity: 0, duration: 0.7, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    // CITY STOPS
    const cityStops = document.querySelectorAll('.city-stop');
    if (cityStops.length) {
        gsap.from(cityStops, {
            y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: '.cities-track', start: 'top 85%', toggleActions: 'play none none none' }
        });
    }

    // PULL QUOTE
    const pullQuote = document.querySelector('.pull-quote blockquote');
    if (pullQuote) {
        gsap.from(pullQuote, {
            scale: 0.96, opacity: 0, duration: 0.9, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: pullQuote, start: 'top 85%', toggleActions: 'play none none none' }
        });
    }

    // DRIVES BLOCK
    const drivesBlock = document.querySelector('.drives-block');
    if (drivesBlock) {
        gsap.from(drivesBlock, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: drivesBlock, start: 'top 85%', toggleActions: 'play none none none' }
        });
    }

    // CONTACT LINKS — fixed (immediateRender: false prevents invisible bug)
    const contactLinks = document.querySelectorAll('.contact-link');
    if (contactLinks.length) {
        gsap.from(contactLinks, {
            x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: '#contact', start: 'top 90%', toggleActions: 'play none none none' }
        });
    }

    // SKILL CLOUD
    const skillCloud = document.querySelector('.skill-cloud');
    if (skillCloud) {
        gsap.from(skillCloud, {
            scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: skillCloud, start: 'top 85%', toggleActions: 'play none none none' }
        });
        gsap.from(skillCloud.querySelectorAll('.skill-cloud-tag'), {
            y: 20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: skillCloud, start: 'top 80%', toggleActions: 'play none none none' }
        });
    }

    // DOCK SLIDE IN
    const dock = document.querySelector('.floating-dock');
    if (dock) {
        gsap.from(dock, { x: 80, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 });
    }

    // IMPACT QUOTES
    document.querySelectorAll('.impact-quote').forEach(el => {
        gsap.from(el, {
            x: -20, opacity: 0, duration: 0.7, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    // METHODOLOGY STEPS
    document.querySelectorAll('.methodology-block').forEach(block => {
        gsap.from(block.querySelectorAll('.method-step'), {
            y: 25, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // ABOUT STAT CARDS
    const statsGrid = document.querySelector('.about-stats-grid');
    if (statsGrid) {
        gsap.from(statsGrid.querySelectorAll('.about-stat'), {
            y: 30, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: statsGrid, start: 'top 88%', toggleActions: 'play none none none' }
        });
    }

    // PAGE LINK FADE-OUT on navigation
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;
        link.addEventListener('click', e => {
            e.preventDefault();
            gsap.to(document.body, {
                opacity: 0, duration: 0.3, ease: 'power2.in',
                onComplete: () => { window.location.href = href; }
            });
        });
    });

});