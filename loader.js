/**
 * ============================================================
 *  COMPONENT LOADER
 * ============================================================
 *  Fetches HTML components and injects them into the page,
 *  then runs config.js and shared.js once all components
 *  have been stamped in.
 *
 *  Usage in HTML:
 *    <div data-component="header"></div>
 *    <div data-component="footer"></div>
 *
 *  The loader reads the data-component attribute, fetches
 *  components/<name>.html, and replaces the element with
 *  the fetched content.
 * ============================================================
 */

(async function () {

  // ── 1. Find all component placeholders ───────────────────
  const slots = document.querySelectorAll("[data-component]");
  if (!slots.length) return bootScripts();

  // ── 2. Fetch and inject each component in parallel ───────
  await Promise.all(
    [...slots].map(async (slot) => {
      const name = slot.dataset.component;
      try {
        const res = await fetch(`components/${name}.html`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();

        // Replace placeholder element with the component markup
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        slot.replaceWith(...wrapper.childNodes);
      } catch (err) {
        console.warn(`[loader] Could not load component "${name}":`, err);
        slot.remove();
      }
    })
  );

  // ── 3. Mark active nav link ───────────────────────────────
  const currentFile = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const linkFile = link.getAttribute("href");
    link.classList.toggle("active", linkFile === currentFile);
  });

  // ── 4. Boot config + shared scripts ──────────────────────
  bootScripts();

})();

// Dynamically load a script and return a Promise
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Don't double-load
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

async function bootScripts() {
  try {
    await loadScript("config.js");
    await loadScript("shared.js");
  } catch (err) {
    console.error("[loader] Script boot error:", err);
  }
}
