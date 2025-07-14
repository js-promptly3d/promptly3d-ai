# Animation & Motion Design Rules

## Introduction
This guide provides comprehensive best practices for implementing animation and motion in modern web projects, with a focus on Three.js, GSAP, and CSS. The goal is to create delightful, performant, and accessible experiences.

## General Principles
- **Purposeful Motion:** Every animation should serve a clear purpose—guiding attention, providing feedback, or enhancing storytelling.
- **Consistency:** Use a consistent motion language (easing, duration, style) across the site.
- **Performance:** Prefer hardware-accelerated properties (transform, opacity). Avoid animating expensive properties (top, left, width, height) when possible.
- **Accessibility:** Respect user preferences for reduced motion (prefers-reduced-motion media query). Provide alternatives or disable non-essential animations for sensitive users.

## Animation Types
- **Entrance/Exit:** Animate elements in/out with fade, slide, or scale. Use staggered entrances for lists.
- **Hover/Active:** Use subtle scale, color, or shadow changes for interactive elements.
- **State Transitions:** Smoothly animate between UI states (e.g., expanding/collapsing panels).
- **3D Animations:** Use GSAP or Three.js AnimationMixer for object movement, camera transitions, and morph targets.

## Implementation Guidelines
- **GSAP:** Use timelines for complex sequences. Modularize animation logic. Use GSAP’s lagSmoothing for performance.
- **Three.js:** Use AnimationMixer for skeletal/morph animations. Use requestAnimationFrame for custom loops. Throttle updates when not visible.
- **CSS:** Use transition and keyframes for simple UI effects. Prefer CSS for hover/focus/active states.

## Choreography
- **Hierarchy:** Animate primary elements first, then secondary/supporting elements.
- **Timing:** Use natural, non-linear easings (ease-in-out, cubic-bezier). Keep durations between 150–500ms for most UI.
- **Staggering:** Use staggered delays for lists or groups to create a sense of flow.

## Testing & QA
- **Cross-Device:** Test animations on multiple devices and browsers.
- **Performance:** Profile with browser dev tools. Avoid jank or dropped frames.
- **Fallbacks:** Provide static alternatives for unsupported browsers.

## Documentation
- Document all custom animation utilities and reusable patterns.
- Maintain a library of animation recipes for common use cases.

## References
- https://www.smashingmagazine.com/2021/04/complete-guide-css-animations/
- https://greensock.com/gsap/
- https://threejs.org/docs/#manual/en/introduction/Animation-system
