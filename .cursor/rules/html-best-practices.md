# HTML5 Best Practices

## Structure & Semantics
- Use semantic HTML elements (header, nav, main, section, article, aside, footer) for structure.
- Use heading tags (h1-h6) in a logical, hierarchical order.
- Use alt attributes for all images.
- Use label elements for all form controls.
- Avoid using divs and spans for layout when semantic elements are available.

## Accessibility
- Use ARIA labels and roles only when necessary (prefer native semantics).
- Ensure all interactive elements are keyboard accessible.
- Use lang attribute on the html tag.

## Performance
- Minimize DOM depth and avoid unnecessary wrappers.
- Use async/defer for script loading.
- Optimize images with srcset and sizes attributes.

## Security
- Validate and sanitize user input in forms.
- Avoid inline event handlers (onclick, onmouseover, etc.).

## References
- https://developer.mozilla.org/en-US/docs/Web/HTML
- https://web.dev/learn/html/
