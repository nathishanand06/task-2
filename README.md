# Responsive Internship Board

A beginner-friendly, responsive internship listing interface built without a framework using HTML, CSS, and vanilla JavaScript.

## Features
- Responsive layout for mobile, tablet, and desktop
- Search by role, company, domain, or location
- Domain dropdown filter and clear-filters action
- Accessible labels, skip link, visible keyboard focus, and live status announcements
- Empty-results state and data-loading error state with retry
- Internship cards rendered from reusable JSON data

## Run locally
Because the page loads JSON with `fetch`, run it through a local web server rather than opening `index.html` directly.

### Option 1: Python
```bash
python -m http.server 8000
```
Then open http://localhost:8000

### Option 2: VS Code
Install the Live Server extension, right-click `index.html`, and choose **Open with Live Server**.

## Test responsive widths
Use browser DevTools device toolbar and check:
- 360px: one-column cards and stacked search controls
- 768px: two-column cards and two-column filter area
- 1280px: three-column cards and horizontal search controls

## Important data note
The included `data/internships.json` contains fictional sample records for demonstration. The application links are placeholders (`example.com`) and are not real internship applications. Replace these records and links with the supplied dataset before publishing if the reviewer expects that exact seed data.

## Publish one view-only link
1. Create a GitHub repository named `responsive-internship-board`.
2. Upload all files while preserving the `data` folder.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Share the resulting GitHub Pages URL and the repository URL if requested. Ensure the repository is public or otherwise viewable by the reviewer.
