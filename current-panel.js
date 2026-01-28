document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CURRENT_CONFIG = {
        cssPath: 'current-panel.css',
        htmlPath: 'current-panel.html',
        selectors: {
            container: '#current-panel-container',
            panel: '#current-panel',
            overlay: '#current-panel-overlay',
            closeBtn: '.current-close-btn',
        }
    };

    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CURRENT_CONFIG.cssPath;
    document.head.appendChild(link);

    // 2. Prepare Container
    const panelContainer = document.createElement('div');
    panelContainer.id = 'current-panel-container';

    const overlay = document.createElement('div');
    overlay.id = 'current-panel-overlay';

    panelContainer.appendChild(overlay);
    document.body.appendChild(panelContainer);

    // 3. Load HTML Content
    fetch(CURRENT_CONFIG.htmlPath)
        .then(response => response.text())
        .then(html => {
            const panel = document.createElement('div');
            panel.id = 'current-panel';
            panel.innerHTML = html;

            panelContainer.appendChild(panel);

            initCurrentPanelInteractions();
        })
        .catch(err => console.error('Failed to load current panel:', err));

    function initCurrentPanelInteractions() {
        const closeBtn = document.querySelector(CURRENT_CONFIG.selectors.closeBtn);
        const overlay = document.querySelector(CURRENT_CONFIG.selectors.overlay);

        function openPanel() {
            document.body.classList.add('current-panel-open');

            // Add content-shift
            const shiftElements = document.querySelectorAll('nav.navbar, .container, footer.social-footer');
            shiftElements.forEach(el => el.classList.add('content-shift'));

            // Close other panels if open
            document.body.classList.remove('panel-open', 'contact-panel-open');
        }

        function closePanel() {
            document.body.classList.remove('current-panel-open');
        }

        if (closeBtn) closeBtn.addEventListener('click', closePanel);
        if (overlay) overlay.addEventListener('click', closePanel);

        // Find the "Currently exploring" card
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            const h2 = card.querySelector('h2');
            if (h2 && (h2.innerText.includes('Currently exploring') || h2.innerText.includes('Currently working on'))) {
                card.style.cursor = 'pointer';
                card.setAttribute('title', 'Click to view what I\'m building');
                card.addEventListener('click', (e) => {
                    e.preventDefault(); // Just in case
                    openPanel();
                });
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('current-panel-open')) {
                closePanel();
            }
        });
    }
});
