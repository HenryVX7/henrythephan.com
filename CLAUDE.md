# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Henry Phan with a terminal/command-line aesthetic theme. It's a static website built with vanilla HTML and CSS (no build tools or frameworks) that showcases professional experience, projects, skills, and contact information.

**Technology Stack:**
- Pure HTML5 (index.html)
- Pure CSS3 (index.css)
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
- `img/` - Project images organized by project (pj1/, pj2/, pj3/), plus logos/
- `HenryPhanResumeREDACTED.pdf` - Embedded resume PDF
- `.github/workflows/main.yml` - CI/CD pipeline

### HTML Structure
The page is organized into these main sections (in order):
1. **Navigation** - Fixed top navbar with smooth scroll links
2. **Hero Section** - Terminal window with animated command-line intro
3. **About Section** - Two-column grid with profile card and embedded PDF resume
4. **Experience Section** - Tree-style display of work history (desktop) / card layout (mobile)
5. **Skills Section** - Four categories: languages, infrastructure, systems, tools
6. **Projects Section** - Three detailed project cards with image galleries and lightbox
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
- Custom lightbox implementation for project images (lines 579-615)
- Accessibility: prefers-reduced-motion support, touch-friendly targets
- Experience section completely restructures on mobile (<768px) - tree view becomes cards

**Responsive Breakpoints:**
- `@media (max-width: 1024px)` - Large tablets
- `@media (max-width: 768px)` - Tablets (major layout shifts)
- `@media (max-width: 480px)` - Mobile phones (hamburger menu would go here)
- `@media (max-width: 360px)` - Very small phones
- `@media (max-height: 500px) and (orientation: landscape)` - Landscape adjustments
- `@media (hover: none) and (pointer: coarse)` - Touch device optimizations

## Development Workflow

### Making Changes
1. Edit `index.html` or `index.css` directly
2. Test locally by opening `index.html` in a browser
3. Commit and push to main branch
4. GitHub Actions automatically deploys to production server

### CI/CD Pipeline
The `.github/workflows/main.yml` file:
- Runs on self-hosted runner (the production server itself)
- Triggers on push/PR to main branch
- Steps: `git pull` in `/var/www/henrythephan.com` → restart Apache

**Important:** Changes pushed to main go directly to production. Test thoroughly before pushing.

### Testing
- **Local testing:** Open `index.html` in browser (works without a server)
- **Responsive testing:** Use browser DevTools to test all breakpoints
- **Cross-browser:** Test in Chrome, Firefox, Safari if making CSS changes
- **Accessibility:** Test with reduced motion preferences enabled

### Adding New Projects
1. Add images to `img/pjN/` where N is the next project number
2. In `index.html`, duplicate a `.project-card` div (lines 315-343)
3. Update project title, description, images, and tech tags
4. Images in `.project-images` automatically get lightbox functionality via inline JS (lines 479-542)

### Modifying the Terminal Animation
- Terminal lines appear with staggered delays (lines 206-227 in index.css)
- Each `.terminal-line:nth-child(N)` gets animation-delay: (N * 0.2s)
- To add/remove lines, update both HTML and corresponding CSS animation delays

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

- **No build process:** This is intentionally simple - just HTML/CSS/JS
- **Self-hosted:** The site runs on a personal Apache server, not GitHub Pages
- **Formspree integration:** Contact form posts to `https://formspree.io/f/xvgbevkz` (line 431)
- **Terminal simulation:** All terminal UI is static HTML/CSS - no actual shell interaction
- **Lightbox:** Custom vanilla JS implementation (lines 479-542 in index.html) - no external libraries
- **Font Awesome:** Icons loaded from CDN (line 8) - check availability if modifying icons
