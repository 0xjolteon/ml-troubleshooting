# MapleStory Private Server - Connection Help Guide

A static HTML site hosted on GitHub Pages to help players connect to the server when it is blocked by ISP DNS filtering or antivirus software, and to help SEA players with frequent disconnections.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home / overview |
| `dns.html` | DNS fix guide (Windows, macOS, Linux tabs) |
| `warp.html` | Cloudflare WARP setup (Windows, macOS, Linux tabs) |
| `antivirus.html` | Antivirus whitelist guide (Avast, Malwarebytes, Defender, Kaspersky, Bitdefender) |
| `troubleshoot.html` | Flowchart troubleshooter for each OS + SEA disconnects |
| `shared.css` | All shared styles |
| `shared.js` | Tab switching, copy buttons, smooth scroll |

## How to edit content

You don't need to know Git. You can edit any file directly in GitHub's web editor:

1. Open the file you want to edit (e.g. `dns.html`).
2. Click the **pencil icon** (Edit this file) in the top right.
3. Make your changes. The content is plain HTML - just edit the text between tags.
4. Scroll down and click **Commit changes**.

### Editing a flowchart

Flowcharts are in `troubleshoot.html` inside `<pre class="mermaid">` blocks. The syntax is Mermaid.js. Example:

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

Preview changes on the live site after committing - Mermaid renders in the browser automatically.

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

## Updating the server domain name

The guides intentionally use `yourserver.ml` as a placeholder. Find and replace it in the relevant files before publishing:

- `dns.html` - in the verify section
- `troubleshoot.html` - in all four flowcharts (`nslookup yourserver.ml`, `dig yourserver.ml`)

---

*If you have questions, ask in the staff Discord channel.*
