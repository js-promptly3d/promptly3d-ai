# Component Design System Rules

## Introduction
This document establishes standards for building a robust, reusable, and accessible component library for your web project. It covers naming, structure, documentation, and accessibility.

## Naming Conventions
- Use PascalCase for component names (e.g., `Button`, `ModelViewer`).
- Use clear, descriptive names that reflect the component’s purpose.
- Prefix experimental or internal components (e.g., `ExperimentalSlider`).

## Folder Structure
- Organize components by domain or function, not by type.
- Each component gets its own folder with index.js/ts, styles, and tests.
- Example:
  ```
  /components
    /Button
      index.tsx
      Button.module.css
      Button.test.tsx
    /ModelViewer
      index.tsx
      ModelViewer.module.css
      ModelViewer.test.tsx
  ```

## Documentation
- Every component must have a README or doc comment explaining its purpose, props, and usage.
- Include code examples and screenshots where possible.
- Document accessibility features and keyboard interactions.

## Accessibility
- All interactive components must be keyboard accessible.
- Use semantic HTML and ARIA attributes as needed.
- Test with screen readers and keyboard navigation.

## Styling
- Use CSS Modules, styled-components, or Tailwind for scoped, maintainable styles.
- Support theming and dark mode where possible.

## Testing
- Write unit tests for all components (render, props, events).
- Use visual regression testing for critical UI.

## Versioning & Deprecation
- Use semantic versioning for the component library.
- Clearly mark deprecated components and provide migration paths.

## References
- https://storybook.js.org/docs/react/writing-stories/introduction
- https://www.smashingmagazine.com/2020/01/design-systems-practical-guide/
