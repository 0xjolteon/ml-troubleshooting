/**
 * ============================================================
 *  SITE CONFIGURATION - edit this file only
 * ============================================================
 *  All values here propagate automatically to every page.
 *  After saving, commit the file and the site will update.
 * ============================================================
 */

const SITE_CONFIG = {

    // ── Server identity ────────────────────────────────────────
    serverName: "MapleLegends", // Displayed in header and page titles
    gameName: "MapleStory", // Used in guide text
    serverEmoji: "🍁", // Emoji shown in the header logo

    // ── Domain ────────────────────────────────────────────────
    // The full domain players are trying to reach (used in nslookup/dig commands)
    serverDomain: "legends.ml",

    // The TLD alone (used in explanatory text e.g. "the .ml domain")
    serverTLD: ".ml",

    // Human-readable explanation of why the TLD causes issues
    // (shown on the home page "Why is this happening?" section)
    tldExplainer: "Mali's country-code TLD (.ml) is frequently abused by phishing " +
        "and malware sites, so many antivirus products and ISPs automatically " +
        "block or flag it regardless of the actual site content.",

    // ── Community links ───────────────────────────────────────
    discordInvite: "https://discord.gg/XXXXXXXX", // Your Discord invite URL
    discordChannel: "#support", // Channel name to mention in guides
    githubRepo: "https://github.com/0xjolteon/ml-troubleshooting", // For footer "suggest edits" link

    // ── Cloudflare Zero Trust ─────────────────────────────────
    // Your Zero Trust team name (the short name, not the full .cloudflareaccess.com domain)
    // Players enter this when enrolling their device in the WARP Zero Trust guide
    zeroTrustTeamName: "yourteamname",

    // ── Routing callout visibility ────────────────────────────
    // Set to false to hide the "experiencing disconnects? try WARP" callout boxes
    highlightSEA: false,

    // ── Footer text ───────────────────────────────────────────
    footerText: "Maintained by 0xjolteon",

};

// ── DO NOT EDIT BELOW THIS LINE ───────────────────────────────
// This applies all config values to the page automatically.

(function applyConfig() {

    // Helper: replace text content of all matching elements
    const fill = (selector, value) => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.tagName === "A") el.href = value;
            else el.textContent = value;
        });
    };

    // ── Inject into data-config elements ─────────────────────
    // Any element with data-config="KEY" gets filled with SITE_CONFIG[KEY]
    document.querySelectorAll("[data-config]").forEach(el => {
        const key = el.dataset.config;
        if (SITE_CONFIG[key] !== undefined) {
            if (el.tagName === "A" && key.toLowerCase().includes("link") || key.toLowerCase().includes("invite") || key.toLowerCase().includes("repo") || key.toLowerCase().includes("discord")) {
                el.href = SITE_CONFIG[key];
            } else {
                el.textContent = SITE_CONFIG[key];
            }
        }
    });

    // ── Page <title> ─────────────────────────────────────────
    // Append server name to whatever the page title already says
    const currentTitle = document.title;
    if (!currentTitle.includes(SITE_CONFIG.serverName)) {
        document.title = currentTitle.replace("Connection Help", `${SITE_CONFIG.serverName} - Connection Help`);
    }

    // ── Header logo ──────────────────────────────────────────
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.textContent = `${SITE_CONFIG.serverEmoji} ${SITE_CONFIG.serverName} - Connection Help`;
    }

    // ── Footer ───────────────────────────────────────────────
    const footer = document.querySelector("footer");
    if (footer) {
        footer.innerHTML =
            `${SITE_CONFIG.footerText} · ` +
            `<a href="${SITE_CONFIG.githubRepo}" target="_blank" rel="noopener">Suggest edits on GitHub</a>`;
    }

    // ── SEA callout visibility ────────────────────────────────
    if (!SITE_CONFIG.highlightSEA) {
        document.querySelectorAll(".sea-callout").forEach(el => el.style.display = "none");
    }

    // ── Discord links ─────────────────────────────────────────
    document.querySelectorAll("a[data-discord]").forEach(el => {
        el.href = SITE_CONFIG.discordInvite;
        if (!el.textContent.trim()) el.textContent = "Join our Discord";
    });

})();