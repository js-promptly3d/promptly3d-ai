# Footer Sections Reduction and Coming Soon Functionality

> Task to reduce footer complexity and add "coming soon" messaging for unavailable links

## Goal
Transform the current comprehensive footer with multiple section links into a minimal footer that shows "coming soon" messages when users click on unavailable links, maintaining brand presence while setting proper expectations.

## Why
- Reduce visual clutter and simplify the page design
- Set clear expectations that features are not yet available
- Maintain professional appearance while being transparent about development status
- Prevent user frustration from clicking non-functional links
- Keep essential branding and social presence

## Implementation Tasks

```yaml
context:
  patterns:
    - file: index.html
      copy: Current footer structure with Product, Company, Resources sections
    - file: style.css
      copy: Existing footer and modal styles
    - file: script.js
      copy: Event handling patterns for click interactions

  gotchas:
    - issue: "Footer links currently link to hash anchors"
      fix: "Convert to click handlers that show coming soon modal"
    - issue: "Social media links point to placeholder URLs"
      fix: "Update to show coming soon messages"
```

### Task List

```
UPDATE index.html footer structure:
  - FIND: 
    ```html
    <div class="footer-column">
        <h5>Product</h5>
        <ul class="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#api">API</a></li>
        </ul>
    </div>
    
    <div class="footer-column">
        <h5>Company</h5>
        <ul class="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
    
    <div class="footer-column">
        <h5>Resources</h5>
        <ul class="footer-links">
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#tutorials">Tutorials</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#support">Support</a></li>
        </ul>
    </div>
    ```
  - REPLACE:
    ```html
    <div class="footer-column">
        <h5>Quick Links</h5>
        <ul class="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#compare">Compare</a></li>
            <li><a href="#get-started">Join Waitlist</a></li>
        </ul>
    </div>
    
    <div class="footer-column">
        <h5>Coming Soon</h5>
        <ul class="footer-links">
            <li><a href="#" class="coming-soon-link" data-feature="Pricing">Pricing</a></li>
            <li><a href="#" class="coming-soon-link" data-feature="API Documentation">API</a></li>
            <li><a href="#" class="coming-soon-link" data-feature="Blog">Blog</a></li>
            <li><a href="#" class="coming-soon-link" data-feature="Community">Community</a></li>
        </ul>
    </div>
    ```
  - VALIDATE: grep -n "coming-soon-link" index.html

UPDATE index.html social media links:
  - FIND: 
    ```html
    <a href="#" class="social-link" aria-label="Twitter">
    ```
  - REPLACE:
    ```html
    <a href="#" class="social-link coming-soon-link" data-feature="Twitter" aria-label="Twitter">
    ```
  - VALIDATE: grep -n 'social-link coming-soon-link' index.html

UPDATE index.html social media links:
  - FIND: 
    ```html
    <a href="#" class="social-link" aria-label="LinkedIn">
    ```
  - REPLACE:
    ```html
    <a href="#" class="social-link coming-soon-link" data-feature="LinkedIn" aria-label="LinkedIn">
    ```
  - VALIDATE: grep -n 'social-link coming-soon-link' index.html

UPDATE index.html social media links:
  - FIND: 
    ```html
    <a href="#" class="social-link" aria-label="GitHub">
    ```
  - REPLACE:
    ```html
    <a href="#" class="social-link coming-soon-link" data-feature="GitHub" aria-label="GitHub">
    ```
  - VALIDATE: grep -n 'social-link coming-soon-link' index.html

ADD coming soon modal to index.html:
  - FIND: </footer>
  - ADD_BEFORE:
    ```html
    <!-- Coming Soon Modal -->
    <div id="coming-soon-modal" class="modal" style="display: none;">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-header">
                <div class="modal-icon">🚀</div>
                <h3 class="modal-title">Coming Soon!</h3>
            </div>
            <div class="modal-body">
                <p class="modal-message">
                    <span id="feature-name">This feature</span> will be available when Promptly3D launches in 2026.
                </p>
                <p class="modal-subtitle">
                    Join our waitlist to be the first to know when we're ready!
                </p>
                <a href="#hero-form" class="btn btn-gradient modal-cta">
                    Join Waitlist
                    <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    ```
  - VALIDATE: grep -n "coming-soon-modal" index.html

CREATE style.css additions for modal:
  - ADD to end of file:
    ```css
    /* Coming Soon Modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal.show {
        opacity: 1;
        visibility: visible;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
    }

    .modal-content {
        position: relative;
        background: var(--bg-primary);
        border-radius: 20px;
        padding: 40px;
        margin: 20px;
        max-width: 500px;
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }

    .modal.show .modal-content {
        transform: translateY(0);
    }

    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        color: var(--text-secondary);
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .modal-close:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }

    .modal-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .modal-icon {
        font-size: 48px;
        margin-bottom: 20px;
    }

    .modal-title {
        font-size: 28px;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .modal-body {
        text-align: center;
    }

    .modal-message {
        font-size: 18px;
        color: var(--text-primary);
        margin-bottom: 16px;
        line-height: 1.6;
    }

    .modal-subtitle {
        font-size: 16px;
        color: var(--text-secondary);
        margin-bottom: 30px;
        line-height: 1.5;
    }

    .modal-cta {
        margin: 0 auto;
        min-width: 200px;
    }

    /* Coming Soon Link Styles */
    .coming-soon-link {
        position: relative;
        cursor: pointer;
    }

    .coming-soon-link::after {
        content: "🚀";
        font-size: 12px;
        margin-left: 6px;
        opacity: 0.7;
    }

    .coming-soon-link:hover::after {
        opacity: 1;
    }

    /* Responsive Modal */
    @media (max-width: 768px) {
        .modal-content {
            padding: 30px 20px;
            margin: 10px;
        }

        .modal-title {
            font-size: 24px;
        }

        .modal-message {
            font-size: 16px;
        }

        .modal-subtitle {
            font-size: 14px;
        }
    }
    ```
  - VALIDATE: grep -n "coming-soon-modal" style.css

CREATE script.js additions for modal functionality:
  - ADD to end of file:
    ```javascript
    // Coming Soon Modal Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('coming-soon-modal');
        const modalOverlay = modal?.querySelector('.modal-overlay');
        const modalClose = modal?.querySelector('.modal-close');
        const featureName = modal?.querySelector('#feature-name');
        const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
        
        function showModal(feature) {
            if (featureName) {
                featureName.textContent = feature;
            }
            if (modal) {
                modal.style.display = 'flex';
                // Trigger reflow to ensure transition works
                modal.offsetHeight;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
        
        function hideModal() {
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        }
        
        // Add click handlers to coming soon links
        comingSoonLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const feature = link.getAttribute('data-feature') || 'This feature';
                showModal(feature);
            });
        });
        
        // Close modal handlers
        modalClose?.addEventListener('click', hideModal);
        modalOverlay?.addEventListener('click', hideModal);
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('show')) {
                hideModal();
            }
        });
        
        // Handle modal CTA click
        const modalCta = modal?.querySelector('.modal-cta');
        modalCta?.addEventListener('click', () => {
            hideModal();
            // Smooth scroll to hero form
            const heroForm = document.getElementById('hero-form');
            if (heroForm) {
                heroForm.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const firstInput = heroForm.querySelector('input, select');
                    firstInput?.focus();
                }, 500);
            }
        });
    });
    ```
  - VALIDATE: grep -n "Coming Soon Modal" script.js
```

## Validation Checklist

- [ ] Footer sections reduced from 3 detailed columns to 2 simplified columns
- [ ] "Quick Links" section contains only existing functional pages
- [ ] "Coming Soon" section clearly labeled with unavailable features
- [ ] All coming soon links have rocket emoji indicators
- [ ] Social media icons show coming soon modal when clicked
- [ ] Modal displays with proper feature name and smooth animations
- [ ] Modal CTA redirects to waitlist form and focuses first input
- [ ] Modal closes on overlay click, X button, and Escape key
- [ ] Responsive design maintained on mobile devices
- [ ] No broken functionality for existing working links
- [ ] Professional appearance maintained while setting clear expectations

## Expected Result

The footer will be transformed from a complex multi-section layout to a clean, minimal design that:
- Keeps functional navigation links in a "Quick Links" section
- Groups unavailable features in a clearly marked "Coming Soon" section
- Shows an elegant modal with rocket icon when users click unavailable features
- Maintains brand presence through simplified social icons
- Provides clear path to waitlist signup for interested users
- Sets proper expectations about development timeline