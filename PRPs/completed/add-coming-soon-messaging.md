# Add Coming Soon Messaging

> Task to add clear messaging that Promptly3D is not yet launched

## Goal
Add prominent "Coming Soon" or "Arriving 2026" messaging throughout the website to clearly communicate that the platform is not yet available for use.

## Why
- Set proper expectations for visitors that the product is in development
- Build anticipation while being transparent about timeline
- Prevent user frustration from trying to use features that don't exist yet

## Implementation Tasks

```yaml
context:
  patterns:
    - file: index.html
      copy: Current hero section and form structure
    - file: style.css
      copy: Existing badge and notification styles

  gotchas:
    - issue: "Form submissions currently active"
      fix: "Keep form functional for lead capture"
```

### Task List

```
UPDATE index.html:
  - FIND: <h1 class="hero-title">Transform Ideas Into Reality</h1>
  - ADD_AFTER:
    ```html
    <div class="coming-soon-badge">
      <span class="badge-icon">🚀</span>
      <span class="badge-text">Launching 2026</span>
    </div>
    ```
  - VALIDATE: grep -n "coming-soon-badge" index.html

UPDATE index.html:
  - FIND: <h3 class="form-title">Start Creating Today</h3>
  - REPLACE: <h3 class="form-title">Join the Waitlist</h3>
  - VALIDATE: grep -n "Join the Waitlist" index.html

UPDATE index.html:
  - FIND: <span class="btn-text">Get Started Free</span>
  - REPLACE: <span class="btn-text">Join Early Access</span>
  - VALIDATE: grep -n "Join Early Access" index.html

UPDATE index.html:
  - FIND: <p class="form-subtitle">Join thousands transforming ideas into reality</p>
  - REPLACE: <p class="form-subtitle">Be first to know when we launch</p>
  - VALIDATE: grep -n "Be first to know" index.html

UPDATE index.html:
  - FIND: <a href="#get-started" class="btn btn-primary">Get Started</a>
  - REPLACE: <a href="#get-started" class="btn btn-primary">Join Waitlist</a>
  - VALIDATE: grep -n "Join Waitlist" index.html

CREATE style.css additions:
  - ADD to end of file:
    ```css
    /* Coming Soon Badge */
    .coming-soon-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(138, 43, 226, 0.1);
      border: 2px solid #8a2be2;
      border-radius: 50px;
      padding: 12px 24px;
      margin: 20px 0;
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    .badge-icon {
      font-size: 20px;
    }
    
    .badge-text {
      font-size: 16px;
      font-weight: 600;
      color: #8a2be2;
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.4);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(138, 43, 226, 0);
      }
    }
    ```
  - VALIDATE: grep -n "coming-soon-badge" style.css

UPDATE index.html footer section:
  - FIND: <p>&copy; 2025 Promptly3D. All rights reserved.</p>
  - REPLACE: <p>&copy; 2025 Promptly3D. All rights reserved. • Coming Soon 2026</p>
  - VALIDATE: grep -n "Coming Soon 2026" index.html
```

## Validation Checklist

- [ ] Coming soon badge visible in hero section
- [ ] All CTAs updated to reflect pre-launch status
- [ ] Form still functional for lead capture
- [ ] Visual hierarchy maintains focus on value proposition
- [ ] Mobile responsive design maintained
- [ ] No broken links or functionality