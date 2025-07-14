
# Animation Principles

This document establishes the principles for animation design on the Promptly3D website. The goal is to create a polished, professional, and engaging user experience through meaningful and performant animations.

## 1. Purposeful Animation

- **Principle:** Animation should always have a purpose. It should guide the user, provide feedback, or enhance the narrative. Avoid animation for animation's sake.
- **Guideline:** Use animation to draw attention to important elements, like a call-to-action button.
- **Guideline:** Use animation to show state changes, such as when a form is successfully submitted.

## 2. Timing and Easing

- **Principle:** The timing and easing of an animation are critical to how it feels. Natural, physics-based motion is preferred.
- **Guideline:** Use ease-out for elements that are entering the screen, and ease-in for elements that are leaving.
- **Guideline:** Use ease-in-out for animations that move from one point to another on the screen.
- **Rule:** Use the GSAP library for all complex animations to ensure consistency and performance.

## 3. Performance

- **Principle:** Animations must be performant and not cause jank or lag.
- **Rule:** Prioritize animating CSS `transform` and `opacity` properties.
- **Guideline:** Be mindful of the number and complexity of animations running simultaneously, especially on scroll.

## 4. Consistency

- **Principle:** Animations should be consistent throughout the site.
- **Guideline:** Use similar animation styles for similar elements.
- **Guideline:** Establish a set of standard animation durations (e.g., 0.2s for fast, 0.5s for medium, 1s for slow) and use them consistently.
