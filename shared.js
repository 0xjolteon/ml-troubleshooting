// Mermaid
// Theme setup only - each page renders its own chart(s) explicitly, once
// ready, the same way website.html already does. This avoids racing
// Mermaid's internal setup by rendering immediately after initialize().
if (typeof mermaid !== 'undefined') {
    try {
        // Pull the site's own palette so diagrams always match shared.css,
        // instead of relying on Mermaid's generic built-in "dark" theme.
        const css = getComputedStyle(document.documentElement);
        const v = name => css.getPropertyValue(name).trim();

        mermaid.initialize({
            startOnLoad: false, // each page's head script already turned this off;
            // each page renders explicitly once it's ready.
            theme: 'base',
            themeVariables: {
                background: v('--bg'),
                primaryColor: v('--surface'), // node fill
                primaryTextColor: v('--text'), // node text
                primaryBorderColor: v('--border'),
                secondaryColor: v('--surface'),
                tertiaryColor: v('--surface'),
                lineColor: v('--muted'), // arrows/branches
                edgeLabelBackground: v('--surface'),
                fontFamily: v('--font-body'),
                clusterBkg: v('--surface'),
                clusterBorder: v('--border'),
            },
            flowchart: {
                curve: 'basis', // smoother branch lines instead of sharp elbows
                padding: 12,
                nodeSpacing: 40,
                rankSpacing: 55,
            },
            // securityLevel 'loose' is required for click/href bindings on nodes.
            // Safe here since all diagram source is our own static content, not
            // user-supplied input.
            securityLevel: 'loose',
        });

        // Explicit signal that the theme is configured and it's safe to
        // render charts. Pages poll for this directly instead of an
        // indirect proxy (like config.js having loaded) that doesn't
        // actually guarantee the theme is ready.
        window.mermaidThemeReady = true;
    } catch (err) {
        console.error('[mermaid] initialize failed', err);
    }
}

// Copy buttons on code blocks
document.querySelectorAll('pre').forEach(pre => {
    // Don't add copy button to mermaid blocks
    if (pre.classList.contains('mermaid')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 2000);
        });
    });
    pre.appendChild(btn);
});

// OS/topic tab switching
document.querySelectorAll('.os-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const target = tabGroup.querySelector('#' + btn.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
});

// Screenshot lightbox - click any .screenshot image to view full size
(function() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector('img');

    function open(src, alt) {
        overlayImg.src = src;
        overlayImg.alt = alt || '';
        overlay.classList.add('open');
    }

    function close() {
        overlay.classList.remove('open');
    }

    document.querySelectorAll('.screenshot img').forEach(img => {
        img.addEventListener('click', () => open(img.getAttribute('src'), img.getAttribute('alt')));
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
})();

// Nav "Fixes" dropdown - click to open (hover also works via CSS),
// click outside or press Escape to close
(function() {
    const dropdowns = document.querySelectorAll('nav .dropdown');
    if (!dropdowns.length) return;

    function closeAll() {
        dropdowns.forEach(d => {
            d.classList.remove('open');
            const toggle = d.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');
            closeAll();
            if (!isOpen) {
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAll();
    });
})();

// Smooth scroll for anchor links (troubleshoot page OS pills)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});