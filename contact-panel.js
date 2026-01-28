document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONTACT_CONFIG = {
        cssPath: 'contact-panel.css',
        htmlPath: 'contact-panel.html',
        selectors: {
            navLink: 'a[href="#hire"]',
            cardLink: '.card.hire-card', // The "Want to hire me?" card
            container: '#contact-panel-container',
            panel: '#contact-panel',
            overlay: '#contact-panel-overlay',
            closeBtn: '.contact-close-btn',
            backBtn: '.back-home-btn',
            form: '#contact-form'
        }
    };

    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONTACT_CONFIG.cssPath;
    document.head.appendChild(link);

    // 2. Prepare Container
    const panelContainer = document.createElement('div');
    panelContainer.id = 'contact-panel-container';

    const overlay = document.createElement('div');
    overlay.id = 'contact-panel-overlay';

    panelContainer.appendChild(overlay);
    document.body.appendChild(panelContainer);

    // 3. Load HTML Content
    fetch(CONTACT_CONFIG.htmlPath)
        .then(response => response.text())
        .then(html => {
            const panel = document.createElement('div');
            panel.id = 'contact-panel';
            panel.innerHTML = html;

            panelContainer.appendChild(panel);

            // Initialize functionality after injection
            initContactPanelInteractions();
        })
        .catch(err => console.error('Failed to load contact panel:', err));

    function initContactPanelInteractions() {
        // Elements that open the panel
        const navLink = document.querySelector(CONTACT_CONFIG.selectors.navLink);
        const cardLink = document.querySelector(CONTACT_CONFIG.selectors.cardLink); // Might fail if selector is wrong, check logic

        // Panel elements
        const closeBtn = document.querySelector(CONTACT_CONFIG.selectors.closeBtn);
        const backBtn = document.querySelector(CONTACT_CONFIG.selectors.backBtn);
        const overlay = document.querySelector(CONTACT_CONFIG.selectors.overlay);
        const form = document.querySelector(CONTACT_CONFIG.selectors.form);

        function openPanel(e) {
            e.preventDefault();
            document.body.classList.add('contact-panel-open');

            // Add content-shift to main elements if not already there (shared with about-panel)
            const shiftElements = document.querySelectorAll('nav.navbar, .container, footer.social-footer');
            shiftElements.forEach(el => el.classList.add('content-shift'));

            // Close about panel if open
            if (document.body.classList.contains('panel-open')) {
                document.body.classList.remove('panel-open');
            }
        }

        function closePanel() {
            document.body.classList.remove('contact-panel-open');
        }

        // Attach listeners
        if (navLink) navLink.addEventListener('click', openPanel);
        // Note: The card might be inside a link or just a div. The original HTML had buttons inside?
        // Let's check the original HTML structure.
        // It seems .hire-card is a div, maybe wrapper anchor or JS click? 
        // Existing script.js might handle clicks. We should add our listener carefully.
        if (cardLink) {
            cardLink.addEventListener('click', openPanel);
        }

        if (closeBtn) closeBtn.addEventListener('click', closePanel);
        if (backBtn) backBtn.addEventListener('click', closePanel);
        if (overlay) overlay.addEventListener('click', closePanel);

        // Form handling
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form Submitted:', data);
                alert('Message logged to console! (Simulation)');
                form.reset();
                closePanel();
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('contact-panel-open')) {
                closePanel();
            }
        });
    }
});
