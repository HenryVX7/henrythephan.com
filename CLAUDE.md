# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Henry Phan with a terminal/command-line aesthetic theme. It's a static website built with vanilla HTML and CSS (no build tools or frameworks) that showcases professional experience, projects, skills, and contact information.

**Technology Stack:**
- Pure HTML5 (index.html)
- Pure CSS3 (index.css)
- Vanilla JavaScript (index.js)
- Font Awesome 6.6.0 (CDN)
- JetBrains Mono & Inter fonts (Google Fonts)
- Formspree for contact form handling

**Deployment:**
- Self-hosted on Apache web server
- Automated deployment via GitHub Actions (self-hosted runner)
- Deployed to `/var/www/henrythephan.com` on push to main branch

## Architecture & Design

### File Structure
- `index.html` - Single-page application with all content sections
- `index.css` - All styling with comprehensive responsive design
- `index.js` - Interactive functionality (lightbox, terminal input, project card toggles)
- `img/` - Project images organized by project (pj1/, pj2/, pj3/), plus logos/
- `HenryPhanResumeREDACTED.pdf` - Embedded resume PDF
- `.github/workflows/main.yml` - CI/CD pipeline

### HTML Structure
The page is organized into these main sections (in order):
1. **Navigation** - Fixed top navbar with smooth scroll links
2. **Hero Section** - Interactive terminal window with command input (see JavaScript section)
3. **About Section** - Two-column grid with profile card and embedded PDF resume
4. **Experience Section** - Tree-style display of work history (desktop) / card layout (mobile)
5. **Skills Section** - Four categories: languages, infrastructure, systems, tools
6. **Projects Section** - Collapsible project cards with image galleries and lightbox
7. **Contact Section** - Social links + Formspree contact form
8. **Footer** - Terminal-themed footer with uptime info

### CSS Architecture

**Design System (CSS Variables):**
- Colors: Black/white primary with arch-blue (#1793d1) and ubuntu-orange (#e95420) accents
- Fonts: JetBrains Mono for terminal/code elements, Inter for body text
- Terminal aesthetic with monospace fonts and command-line styling

**Key Features:**
- Mobile-first responsive design with breakpoints at 1024px, 768px, 480px, 360px
- Terminal animations with staggered `terminal-appear` keyframes
- Blinking cursor animation
- Custom lightbox styling for project images
- Collapsible project cards with smooth max-height transitions
- Accessibility: prefers-reduced-motion support, touch-friendly targets
- Experience section completely restructures on mobile (<768px) - tree view becomes cards

**Responsive Breakpoints:**
- `@media (max-width: 1024px)` - Large tablets
- `@media (max-width: 768px)` - Tablets (major layout shifts)
- `@media (max-width: 480px)` - Mobile phones (hamburger menu would go here)
- `@media (max-width: 360px)` - Very small phones
- `@media (max-height: 500px) and (orientation: landscape)` - Landscape adjustments
- `@media (hover: none) and (pointer: coarse)` - Touch device optimizations

### JavaScript Architecture

The `index.js` file contains three main IIFE (Immediately Invoked Function Expression) modules:

1. **Lightbox Module** (lines 2-63)
   - Handles image gallery functionality for project screenshots
   - Tracks gallery array and current index per project
   - Keyboard navigation: Escape to close, Arrow keys to navigate
   - Click backdrop to close, prev/next buttons for navigation
   - Prevents body scroll when lightbox is open

2. **Terminal Input Module** (lines 66-161)
   - Interactive command-line interface in hero section
   - Available commands defined in `commands` object (lines 72-85):
     - `whoami`, `cat role.txt`, `ls hobbies/`, `ls skills/`
     - `tree experience/`, `cat about.log`, `help`, `clear`
   - Auto-focus terminal input when clicking terminal body
   - Command history displayed above input line
   - HTML escaping for security

3. **Project Card Toggle Module** (lines 164-206)
   - Collapse/expand functionality for project cards
   - Respects `data-default-open="true"` attribute
   - Smooth transitions via dynamic max-height calculation
   - Recalculates max-height on window resize

**Important:** All JavaScript is vanilla - no frameworks or external dependencies.

## Development Workflow

### Making Changes
1. Edit `index.html`, `index.css`, or `index.js` directly
2. Test locally by opening `index.html` in a browser (works without a server)
3. Commit and push to main branch
4. GitHub Actions automatically deploys to production server

### CI/CD Pipeline
The `.github/workflows/main.yml` workflow:
- Runs on self-hosted runner (the production server itself)
- Triggers on push/PR to main branch
- Steps:
  1. `git fetch --all` and `git pull` in `/var/www/henrythephan.com`
  2. `sudo systemctl restart apache2.service`

**Important:** Changes pushed to main go directly to production. Test thoroughly before pushing.

### Testing
- **Local testing:** Open `index.html` in browser (works without a server, JavaScript included via `<script src="index.js" defer>`)
- **Responsive testing:** Use browser DevTools to test all breakpoints
- **Cross-browser:** Test in Chrome, Firefox, Safari if making CSS/JS changes
- **Accessibility:** Test with reduced motion preferences enabled
- **JavaScript features:** Test terminal commands, lightbox navigation, project card toggles

### Adding New Projects
1. Add images to `img/pjN/` where N is the next project number
2. In `index.html`, duplicate a `.project-card` div
3. Update project title, description, images, and tech tags
4. Set `data-default-open="true"` if project should be expanded by default
5. Images in `.project-images` automatically get lightbox functionality via `index.js`
6. No changes needed to JavaScript - lightbox and toggle work automatically

### Modifying Terminal Features

**Static Animation (CSS):**
- Terminal lines appear with staggered delays in index.css
- Each `.terminal-line:nth-child(N)` gets animation-delay: (N * 0.2s)
- To add/remove static lines, update both HTML and corresponding CSS animation delays

**Interactive Commands (JavaScript):**
- Available commands defined in `index.js` lines 72-85
- To add a new command: add entry to `commands` object with format `'command': 'output'`
- Special command: `'clear': 'CLEAR_TERMINAL'` triggers terminal clearing
- Commands support multiline output (use `\n` in string)
- Command normalization: `ls` and `tree` commands auto-append trailing `/` if missing

### Styling Conventions
- Use CSS variables from `:root` for colors (line 3-18 in index.css)
- Terminal elements use `var(--mono-font)`
- Body text uses `var(--sans-font)`
- Maintain the command-line aesthetic: prompts use `<span class="prompt">`, commands use `<span class="command">`, outputs use `<span class="output">`

## Common Tasks

### Update Resume
Replace `HenryPhanResumeREDACTED.pdf` with new PDF file (keep same filename or update references in index.html line 127 and 129)

### Add Social Links
Add new `.contact-item` in the contact section (lines 407-427 in index.html)

### Modify Color Scheme
Update CSS variables in `:root` (index.css lines 3-18)

### Fix Mobile Layout Issues
Most mobile-specific styles are in `@media (max-width: 768px)` and below (index.css lines 879-1366)

### Update Experience
- Desktop: Modify the tree structure in lines 140-189 of index.html
- Mobile: The CSS automatically restructures this (lines 963-1028 in index.css)
- Keep icon colors defined in lines 440-454 of index.css

## Important Notes

- **No build process:** This is intentionally simple - just HTML/CSS/vanilla JS
- **Self-hosted:** The site runs on a personal Apache server, not GitHub Pages
- **Formspree integration:** Contact form posts to `https://formspree.io/f/xvgbevkz`
- **Terminal simulation:** Interactive terminal via JavaScript, but no actual shell - just predefined commands
- **Lightbox:** Custom vanilla JS implementation in `index.js` (lines 2-63) - no external libraries
- **Project cards:** Collapsible via JavaScript in `index.js` (lines 164-206)
- **Font Awesome:** Icons loaded from CDN - check availability if modifying icons
- **JavaScript loading:** Script loaded with `defer` attribute - executes after DOM parsing
