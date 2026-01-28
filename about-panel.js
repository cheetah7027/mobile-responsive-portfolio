document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        cssPath: 'about-panel.css',
        htmlPath: 'about-panel.html',
        selectors: {
            navLink: 'a[href="#about"]',
            container: '#about-panel-container',
            panel: '#about-panel',
            overlay: '#about-panel-overlay',
            closeBtn: '.close-btn',
            shiftElements: ['nav.navbar', '.container', 'footer.social-footer']
        }
    };

    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.cssPath;
    document.head.appendChild(link);

    // 2. Prepare Container
    const panelContainer = document.createElement('div');
    panelContainer.id = 'about-panel-container';

    const overlay = document.createElement('div');
    overlay.id = 'about-panel-overlay';

    panelContainer.appendChild(overlay);
    document.body.appendChild(panelContainer);

    // 3. Load HTML Content
    // 3. Load HTML Content (About, Story, and Process)
    let aboutContent = '';
    let storyContent = '';
    let processContent = '';

    Promise.all([
        fetch(CONFIG.htmlPath).then(res => res.text()),
        fetch('story-panel.html').then(res => res.text()),
        fetch('process-panel.html').then(res => res.text())
    ]).then(([about, story, process]) => {
        aboutContent = about;
        storyContent = story;
        processContent = process;

        // Create Panel
        const panel = document.createElement('div');
        panel.id = 'about-panel';
        panel.innerHTML = aboutContent; // Default to About
        panelContainer.appendChild(panel);

        initPanelInteractions(panel);
    }).catch(err => console.error('Failed to load panels:', err));

    function initPanelInteractions(panelElement) {
        const aboutLink = document.querySelector(CONFIG.selectors.navLink);
        const closeBtnSelector = CONFIG.selectors.closeBtn;
        const overlay = document.querySelector(CONFIG.selectors.overlay);

        // Add transition classes to existing elements we want to shift
        const elementsToShift = document.querySelectorAll(CONFIG.selectors.shiftElements);
        elementsToShift.forEach(el => el.classList.add('content-shift'));

        function openPanel(content) {
            if (content) {
                panelElement.innerHTML = content;
                // Re-attach close button listener since content changed
                const closeBtn = panelElement.querySelector(closeBtnSelector);
                if (closeBtn) closeBtn.addEventListener('click', closePanel);

                // If opening story panel, attach "View Full About" listener
                const viewAboutBtn = panelElement.querySelector('#view-full-about-btn');
                if (viewAboutBtn) {
                    viewAboutBtn.addEventListener('click', () => openPanel(aboutContent));
                }

                // If opening process panel, attach "View Full About" listener
                const viewAboutBtnProcess = panelElement.querySelector('#view-full-about-btn-process');
                if (viewAboutBtnProcess) {
                    viewAboutBtnProcess.addEventListener('click', () => openPanel(aboutContent));
                }
            }
            document.body.classList.add('panel-open');
        }

        function closePanel() {
            document.body.classList.remove('panel-open');
        }

        // About Link -> Default Content
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                openPanel(aboutContent);
            });
        }

        // Feature: Link "Crafting sleek experiences..." card to About Panel
        const allCards = document.querySelectorAll('.card');

        // Helper to find card by partial text h2
        const findCardByText = (text) => {
            let found = null;
            allCards.forEach(card => {
                const h2 = card.querySelector('h2');
                if (h2 && h2.innerText.includes(text)) {
                    found = card;
                }
            });
            return found;
        };

        const heroCard = findCardByText('Crafting sleek experiences');
        if (heroCard) {
            heroCard.style.cursor = 'pointer';
            heroCard.setAttribute('title', 'Click to view About Me');
            heroCard.addEventListener('click', () => openPanel(aboutContent));
        }

        // Feature: Link "Ashwani — Shipping..." card to Story Panel
        const impactCard = findCardByText('Ashwani — Shipping');
        if (impactCard) {
            impactCard.style.cursor = 'pointer';
            impactCard.setAttribute('title', 'Click to view Story');
            impactCard.addEventListener('click', () => openPanel(storyContent));
        }

        // Feature: Link "From insight to impact..." card to Process Panel
        const processCard = findCardByText('From insight to impact');
        if (processCard) {
            processCard.style.cursor = 'pointer';
            processCard.setAttribute('title', 'Click to view Process');
            processCard.addEventListener('click', () => openPanel(processContent));
        }

        if (overlay) {
            overlay.addEventListener('click', closePanel);
        }

        // Initial Close Button (if about content loaded first)
        const initialCloseBtn = panelElement.querySelector(closeBtnSelector);
        if (initialCloseBtn) initialCloseBtn.addEventListener('click', closePanel);

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('panel-open')) {
                closePanel();
            }
        });
    }
});
