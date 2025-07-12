# Promptly3D Development Partnership

We're building production-quality web applications together. This configuration optimizes Claude Code for modern web development with Vercel deployment.

## Critical Workflow

1. **Research → Plan → Implement**
   - "NEVER JUMP STRAIGHT TO CODING!"
   - Always follow: Research existing code → Plan changes → Implement carefully

2. **Use Multiple Agents for Complex Tasks**

   - Leverage subagents for parallel work
   - Spawn agents to explore different aspects simultaneously
   - Use agents for search-heavy tasks (finding files, researching patterns)

## Web Development Rules

### Forbidden Practices

- No inline styles (use CSS classes)
- No `!important` in CSS unless absolutely necessary
- No jQuery or outdated libraries
- No hardcoded URLs or paths
- No console.log in production code
- No TODO comments in final code

### Required Standards

- Delete old code when replacing functionality
- Use semantic HTML5 elements
- Follow mobile-first responsive design
- Use CSS custom properties (variables)
- Write accessible markup (ARIA labels, semantic structure)
- Validate forms both client and server-side
- Use meaningful CSS class names (BEM methodology preferred)

## HTML Standards

```html
<!-- Good: Semantic, accessible -->
<button class="btn btn--primary" aria-label="Submit contact form">
  <span>Submit</span>
</button>

<!-- Bad: Non-semantic, inaccessible -->
<div onclick="submit()" style="color: blue;">Submit</div>
```

## CSS Standards

```css
/* Good: Custom properties, mobile-first */
:root {
  --primary-color: #8B5CF6;
  --spacing-unit: 1rem;
}

.btn {
  padding: var(--spacing-unit);
  background: var(--primary-color);
}

@media (min-width: 768px) {
  .btn { padding: calc(var(--spacing-unit) * 1.5); }
}

/* Bad: Hardcoded values, desktop-first */
.btn {
  padding: 24px;
  background: #8B5CF6;
}
```

## JavaScript Standards

```javascript
// Good: Modern ES6+, async/await
document.addEventListener('DOMContentLoaded', async function() {
  const data = await fetchData();
  updateUI(data);
});

// Bad: Old patterns, callbacks
$(document).ready(function() {
  $.get('/api/data', function(data) {
    // callback hell
  });
});
```

## Implementation Checklist

Code is complete when:

- ✅ All HTML validates (semantic structure)
- ✅ CSS follows mobile-first approach
- ✅ JavaScript works without errors
- ✅ Responsive on all screen sizes (320px+)
- ✅ Accessible (WCAG AA compliance)
- ✅ Forms work and validate properly
- ✅ Interactive elements provide feedback
- ✅ Old/unused code is deleted
- ✅ Vercel deployment succeeds

## Vercel Deployment Workflow

### Pre-Deployment Checks

1. Validate HTML/CSS/JS syntax
2. Test responsive behavior
3. Check form submissions
4. Verify all assets load correctly
5. Test interactive features

### Deployment Process

```bash
# Always commit with descriptive messages
git add .
git commit -m "feat: add interactive process flow with responsive design"

# Deploy to Vercel
vercel --prod

# Verify deployment
curl -I https://your-site.vercel.app
```

## Problem-Solving Approach

When stuck:

- **Stop** - Don't rush to code
- **Research** - Check existing patterns in codebase
- **Delegate** - Use agents for complex searches
- **Simplify** - Break down into smaller tasks
- **Test** - Verify each change works
- **Ask** - Request clarification if requirements unclear

## Performance & Accessibility

### Performance

- Optimize images (use WebP when possible)
- Minimize CSS/JS bundles
- Use CDNs for external resources
- Implement lazy loading for non-critical content
- Measure Core Web Vitals

### Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain color contrast ratios (4.5:1 minimum)
- Add ARIA labels where needed
- Test with screen readers

## Responsive Design Standards

### Breakpoints

```css
/* Mobile first approach */
.component { /* Mobile styles */ }

@media (min-width: 480px) { /* Small tablets */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
```

### Testing Requirements

- Test on actual devices when possible
- Use browser dev tools for responsive testing
- Verify touch targets are 44px minimum
- Ensure text remains readable at all sizes

## Form Handling Standards

### Client-Side Validation

```javascript
// Good: Progressive enhancement
const form = document.querySelector('#contact-form');
form.addEventListener('submit', function(e) {
  if (!validateForm(this)) {
    e.preventDefault();
    showErrors();
  }
});
```

### Required Form Features

- Real-time validation feedback
- Clear error messages
- Loading states during submission
- Success confirmation
- Accessible error announcements

## Communication Protocol

- **Progress Updates**: Provide clear status on multi-step tasks
- **Proactive Suggestions**: Recommend improvements for code quality
- **Documentation**: Update this file when new patterns emerge
- **Clarity**: Prioritize readable, maintainable code over clever solutions

## Project-Specific Guidelines

### Promptly3D Branding

- Use established color palette (purple/pink gradients)
- Maintain consistent spacing and typography
- Follow existing component patterns
- Preserve interactive animations and transitions

### Interactive Elements

- Ensure smooth animations (0.3s transitions standard)
- Provide hover and focus states
- Maintain accessibility during interactions
- Test expand/collapse functionality thoroughly

### Content Management

- Keep descriptions concise and scannable
- Use consistent voice and tone
- Maintain technical accuracy
- Update meta descriptions and titles appropriately

---

*Last updated: When major patterns or requirements change*