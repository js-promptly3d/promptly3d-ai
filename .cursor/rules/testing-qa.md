# Testing & QA Rules

## Introduction
This document outlines best practices for manual and automated testing of interactive, animated, and 3D web applications. The goal is to ensure reliability, accessibility, and a high-quality user experience across devices and browsers.

## Manual Testing
- Test all interactive features (3D tools, animations, forms) on major browsers and devices.
- Verify keyboard navigation and screen reader compatibility.
- Check for visual regressions after UI changes.
- Test performance on low-end devices and slow networks.

## Automated Testing
- Use Playwright or Cypress for end-to-end tests of user flows.
- Use @axe-core/playwright for automated accessibility checks.
- Write unit tests for utility functions and reusable components.
- Use visual regression testing tools (Percy, Chromatic) for critical UI.

## Accessibility
- Test with screen readers (NVDA, VoiceOver) and keyboard only.
- Ensure all ARIA attributes and roles are correct.
- Validate color contrast and focus management.

## Performance
- Profile with browser dev tools and Lighthouse.
- Monitor for dropped frames or animation jank.
- Test lazy loading and code splitting effectiveness.

## Reporting & Documentation
- Document all bugs and issues with clear reproduction steps.
- Maintain a changelog of fixes and improvements.
- Share test plans and results with the team.

## References
- https://playwright.dev/
- https://www.cypress.io/
- https://www.deque.com/axe/
- https://web.dev/accessibility/
