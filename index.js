// Simple Lightbox for .project-images
  (() => {
    const lightbox = document.getElementById('lightbox');
    const imgEl = lightbox.querySelector('.lb-img');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');
    const btnClose = lightbox.querySelector('.lb-close');

    let gallery = [];     // array of URLs for the current project
    let index = 0;        // current image index

    // Find all project thumbnails
    document.querySelectorAll('.project-images img').forEach((thumb) => {
      thumb.addEventListener('click', (e) => {
        const container = e.currentTarget.closest('.project-images');
        const imgs = [...container.querySelectorAll('img')];

        // Build gallery from this project row
        gallery = imgs.map(i => i.dataset.full || i.src);
        index = imgs.indexOf(e.currentTarget);

        openLightbox(gallery[index]);
      });
    });

    function openLightbox(url) {
      imgEl.src = url;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent page scroll
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.body.style.overflow = '';
    }

    function show(delta) {
      if (!gallery.length) return;
      index = (index + delta + gallery.length) % gallery.length;
      imgEl.src = gallery[index];
    }

    // Controls
    btnPrev.addEventListener('click', () => show(-1));
    btnNext.addEventListener('click', () => show(1));
    btnClose.addEventListener('click', closeLightbox);

    // Click backdrop to close (but not when clicking the image or buttons)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') show(1);
      if (e.key === 'ArrowLeft') show(-1);
    });
  })();

  // Terminal input functionality
  (() => {
    const terminalBody = document.querySelector('.terminal-body');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalInputLine = document.querySelector('.terminal-input-line');

    // Define available commands and their outputs
    const commands = {
      'whoami': 'Henry Phan, senior studying information technology @ arizona state university',
      'cat role.txt': 'IT-Deskside-Support for SCAI\'s IT group',
      'ls hobbies/': 'homelab/ hardware.cfg cars/ basketball.mkv baseball.mp4 edc.fstab',
      'ls skills/': 'bash/ javascript/ python/ linux/ virtualization/ kubernetes/ ci-cd/',
      'tree experience/': `experience/
├── scai-it_deskside_support
├── godaddy_systems_engineer
├── bestbuy_geek_squad_agent
└── chandler-gilbert-cc_esports_lab_tech`,
      'cat about.log': 'My passion for technology was ignited by a childhood curiosity that sprouted from building my first computer at the age of 7. This early exposure fueled my exploration of various aspects of technology and IT, including production, troubleshooting, coding, hardware, and networking. After gaining valuable communication and work ethic skills in the service industry, I am eager to transition into a career that aligns more closely with my academic background and personal interests.',
      'help': 'Available commands: whoami, cat role.txt, ls hobbies/, ls skills/, tree experience/, cat about.log, clear',
      'clear': 'CLEAR_TERMINAL'
    };

    // Auto-focus input when clicking anywhere in the terminal
    if (terminalBody && terminalInput) {
      terminalBody.addEventListener('click', () => {
        terminalInput.focus();
      });

      // Prevent the click on the input itself from bubbling
      terminalInput.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Handle Enter key - execute command
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const command = terminalInput.value.trim();

          if (command) {
            // Create command line
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line user-command';
            commandLine.innerHTML = `<span class="prompt">henrys@portfolio:~$</span> <span class="command">${escapeHtml(command)}</span>`;

            // Insert before the input line
            terminalInputLine.parentNode.insertBefore(commandLine, terminalInputLine);

            // Normalize command (handle trailing slashes for ls commands)
            let normalizedCommand = command;
            if (command.startsWith('ls ') && !command.endsWith('/')) {
              normalizedCommand = command + '/';
            } else if (command.startsWith('tree ') && !command.endsWith('/')) {
              normalizedCommand = command + '/';
            }

            // Check if command exists (try normalized version first, then original)
            if (commands[normalizedCommand] || commands[command]) {
              const output = commands[normalizedCommand] || commands[command];

              // Special case for clear command
              if (output === 'CLEAR_TERMINAL') {
                // Remove all terminal lines except the input line
                const allLines = terminalBody.querySelectorAll('.terminal-line:not(.terminal-input-line)');
                allLines.forEach(line => line.remove());
              } else {
                // Create output line
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line user-command';
                outputLine.innerHTML = `<span class="output">${escapeHtml(output).replace(/\n/g, '<br>')}</span>`;
                terminalInputLine.parentNode.insertBefore(outputLine, terminalInputLine);
              }
            } else if (command) {
              // Command not found
              const errorLine = document.createElement('div');
              errorLine.className = 'terminal-line user-command';
              errorLine.innerHTML = `<span class="output" style="color: #ff6b6b;">command not found: ${escapeHtml(command)}. Type 'help' for available commands.</span>`;
              terminalInputLine.parentNode.insertBefore(errorLine, terminalInputLine);
            }

            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }

          // Clear input
          terminalInput.value = '';
        }
      });
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  })();

  // Project card toggle functionality
  (() => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      const header = card.querySelector('.project-header');
      const content = card.querySelector('.project-content');
      const defaultOpen = card.dataset.defaultOpen === 'true';

      // Function to update max-height for expanded cards
      const updateMaxHeight = () => {
        if (card.classList.contains('expanded')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      };

      // Set initial state
      if (!defaultOpen) {
        card.classList.add('collapsed');
        content.style.maxHeight = '0';
      } else {
        card.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
      }

      // Toggle function
      const toggleCard = () => {
        if (card.classList.contains('collapsed')) {
          // Expand
          card.classList.remove('collapsed');
          card.classList.add('expanded');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          // Collapse
          card.classList.remove('expanded');
          card.classList.add('collapsed');
          content.style.maxHeight = '0';
        }
      };

      // Toggle on header click
      header.addEventListener('click', toggleCard);

      // Update max-height on window resize for expanded cards
      window.addEventListener('resize', updateMaxHeight);

      // Recalculate max-height after images and fonts load
      window.addEventListener('load', updateMaxHeight);
    });
  })();