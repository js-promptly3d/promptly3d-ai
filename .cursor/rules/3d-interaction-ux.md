# 3D Interaction & UX Rules

## Introduction
This document outlines best practices for designing and implementing interactive 3D experiences on the web. It is tailored for projects using Three.js or similar libraries, with a focus on usability, accessibility, and performance.

## User Interaction Principles
- **Intuitive Controls:** Use familiar interaction paradigms (e.g., click-and-drag to rotate, scroll to zoom, right-click or two-finger drag to pan).
- **Visual Feedback:** Provide immediate visual feedback for user actions (e.g., highlight objects on hover, animate selection).
- **Touch & Mobile Support:** Ensure all interactions work seamlessly on touch devices (pinch to zoom, swipe to rotate/pan).
- **Accessibility:** Provide keyboard navigation for all 3D controls. Use ARIA roles and labels for 3D canvas and controls. Offer alternative text or descriptions for 3D content.
- **Reset & Undo:** Always provide a way to reset the view or undo actions.

## Camera & Navigation
- **Default View:** Start with a clear, informative default camera angle.
- **Orbit Controls:** Use orbit controls for general 3D navigation, but restrict or guide movement to prevent disorientation.
- **Zoom Limits:** Set sensible min/max zoom levels to prevent clipping or losing the model.
- **Focus on Selection:** Smoothly animate the camera to focus on selected objects.

## Object Manipulation
- **Handles & Gizmos:** Use visible, intuitive handles for translation, rotation, and scaling.
- **Snapping:** Offer grid or angle snapping for precise manipulation.
- **Constraints:** Prevent illegal or nonsensical transformations (e.g., negative scale, moving objects out of bounds).
- **Undo/Redo:** Support undo/redo for all manipulations.

## Performance
- **Efficient Picking:** Use raycasting for object selection; optimize for large scenes.
- **Level of Detail (LOD):** Implement LOD for complex models to maintain smooth interaction.
- **Debounce Expensive Operations:** Throttle or debounce updates during drag/resize.

## Visual Design
- **Consistent Lighting:** Use lighting that enhances depth and clarity without overwhelming the scene.
- **Highlighting:** Use color, outline, or glow effects to indicate hover/selection.
- **Responsive Layout:** Ensure the 3D canvas resizes gracefully across devices and orientations.

## Error Handling
- **Graceful Fallbacks:** If WebGL is unavailable, show a helpful message or fallback content.
- **User Guidance:** Provide tooltips, onboarding, or help overlays for complex tools.

## References
- https://threejs.org/docs/
- https://uxdesign.cc/ux-for-3d-web-experiences-7c2b8b6b8b6e
- https://a11yproject.com/
