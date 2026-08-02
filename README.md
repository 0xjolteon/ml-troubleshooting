# MapleStory Private Server - Connection Help Guide

A static HTML site hosted on GitHub Pages to help players get to the website when it's blocked by ISP DNS filtering or antivirus software (a common side effect of running on a `.ml` domain), and to help players who get frequent in-game disconnects or lag.

The site is config-driven: almost everything server-specific (name, domain, Discord, Zero Trust team name, etc.) lives in one file, `config.js`, so it can be easily updated without editing every page.

## Pages

| Page | Purpose |
|------|---------|
| `index` | Home - lets the player pick which problem they have (site access vs. in-game lag/disconnects) |
| `diagnose` | Single flowchart that routes the player to `website` or `game` based on their symptom |
| `website` | Problem 1 - can't reach the site at all. Per-OS flowcharts plus 5 fixes in detail (DNS, Firefox DoH, antivirus, VPN, Cloudflare WARP) |
| `game` | Problem 2 - lagging or disconnecting from the game. Explains the Montreal/OVH routing angle, a flowchart, WARP testing steps, and per-OS traceroute commands |
| `dns` | DNS fix guide - Per-OS instructions to change your resolver(s) to Cloudflare/Google |
| `antivirus` | Antivirus whitelist guide (Avast/AVG, Malwarebytes, Windows Defender, Kaspersky, Bitdefender) |
| `warp` | Basic Cloudflare WARP install/setup guide (Windows, macOS, Linux tabs) |
| `warp-zero-trust` | Advanced Cloudflare Zero Trust setup with split tunneling including screenshots. Allows only server related traffic to go through WARP. |

## Site-wide files

| File | Purpose |
|------|---------|
| `config.js` | **The one file most edits should start with.** Server name, game name, domain/TLD, the TLD explainer text, Discord invite/channel, GitHub repo link, Zero Trust team name, and footer text. Also contains the script that stamps these values into every page automatically - don't edit below the `DO NOT EDIT BELOW THIS LINE` marker unless you're changing that behavior. |
| `components/header.html` | Shared nav bar (logo + links, including the "Fixes" dropdown) |
| `components/footer.html` | Empty shell filled in by `config.js` with the footer text and GitHub edit link |
| `loader.js` | Fetches `header`/`footer` into any page with `<div data-component="...">`, marks the active nav link, then loads `config.js` and `shared.js` in order |
| `shared.css` | All shared styles (layout, cards, callouts, tabs, flowchart wrapper, screenshot lightbox, etc.) |
| `shared.js` | Initializes Mermaid, adds copy buttons to code blocks, wires up OS/topic tab switching, and powers the click-to-enlarge screenshot lightbox |
| `images/` | Screenshots used in the `warp-zero-trust` guide (Cloudflare One Client + Zero Trust dashboard) |

## How to edit content

You don't need to know Git. You can edit any file directly in GitHub's web editor:

1. Open the file you want to edit (e.g. `dns`).
2. Click the **pencil icon** (Edit this file) in the top right.
3. Make your changes. The content is plain HTML - just edit the text between tags.
4. Scroll down and click **Commit changes**.

For anything that's just server identity, wording, or links (server name, domain, Discord invite, footer text, etc.), edit `config.js` instead - see [Updating server details](#updating-server-details-domain-name-discord-etc) below. That way you only need to change it in one place.

### Editing a flowchart

Flowcharts appear in `website`, `game`, and `diagnose` inside `<pre class="mermaid">` blocks. The syntax is Mermaid.js. Example:

```
flowchart TD
    A([Start]) --> B{Question?}
    B -->|Yes| C[Do this]
    B -->|No| D[Do that]
```

- `TD` = top-down layout, `LR` = left-right
- `([text])` = rounded pill (start/end nodes)
- `{text}` = diamond (decision)
- `[text]` = rectangle (step)
- `-->|label|` = labeled arrow
- `click NODE_ID "page" "tooltip"` = makes a node clickable, linking to another page (used in `diagnose` and `game` to jump straight to `website`/`warp`)

The `website` page's flowcharts use the literal placeholder text `DOMAIN` instead of a hardcoded address - a small script on that page swaps it for the real `serverDomain` value from `config.js` at render time, so you don't need to edit the flowchart text itself when the domain changes.

Preview changes on the live site after committing - Mermaid renders in the browser automatically.

## Updating server details (domain name, Discord, etc.)

Almost all server-specific values are centralized in **`config.js`** and propagate to every page automatically - you only need to change them in one place:

| Setting | What it controls |
|---|---|
| `serverName`, `gameName`, `serverEmoji` | Header logo, page titles, and body text throughout the site |
| `serverDomain` | The actual domain shown in commands (`nslookup`, `dig`, `tracert`, etc.) and antivirus/DNS instructions |
| `serverTLD` | The TLD mentioned in explanatory text (e.g. "the `.ml` domain") |
| `tldExplainer` | The explanation of why that TLD gets flagged by antivirus/ISPs |
| `discordInvite`, `discordChannel` | Everywhere a Discord link or channel name is referenced |
| `githubRepo` | The "Suggest edits on GitHub" footer link |
| `footerText` | Footer credit line |

One exception: the `warp-zero-trust` split-tunnel include list (the domains added in Cloudflare's dashboard) is documented with real example values in that page's text/screenshots, since it walks through an actual Cloudflare setup - update those references manually if the domain changes.

## How to deploy on GitHub Pages

1. Push this folder to a GitHub repository (under an **Organization** for shared ownership).
2. Go to the repo **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch = `main`, folder = `/ (root)`.
4. Save. The site will be live at `https://your-org.github.io/repo-name/` within a minute.

## Adding maintainers

1. Go to the GitHub **Organization → People → Invite member**.
2. Add staff members and set their role to **Member** or **Owner**.
3. In the repo **Settings → Collaborators and teams**, give them **Write** access.

They can then edit files directly in the GitHub web editor without needing Git knowledge.

---

*If you have questions, ask in the Discord server.*