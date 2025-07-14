# JavaScript Best Practices

## Code Quality
- Use ES6+ features (let/const, arrow functions, destructuring, etc.).
- Prefer const for variables that do not change.
- Use strict mode (`'use strict';`).
- Modularize code using ES modules or IIFEs.
- Avoid polluting the global namespace.

## Performance
- Minimize DOM access and reflows.
- Debounce or throttle expensive event handlers.
- Use requestAnimationFrame for animations.
- Lazy load scripts when possible.

## Security
- Never use eval or Function constructor with untrusted input.
- Sanitize any data inserted into the DOM.
- Avoid exposing sensitive data in client-side code.

## Testing
- Write unit tests for utility functions.
- Use browser dev tools for debugging and profiling.

## References
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://javascript.info/
