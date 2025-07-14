# Design System Reference

A comprehensive guide to your project's design system, including color palette, typography, spacing, and component usage. Use this as a single source of truth for consistent, professional UI design.

---

## Color Palette
| Name      | Hex      | Usage                |
|-----------|----------|----------------------|
| Primary   | #1A2238  | Main brand color     |
| Accent    | #9DAAF2  | Highlights, buttons  |
| Background| #F4F4F4  | Page background      |
| Success   | #21E6C1  | Success messages     |
| Error     | #FF6A6A  | Error messages       |

---

## Typography
- **Font Family:** 'Inter', 'Helvetica Neue', Arial, sans-serif
- **Headings:** Bold, clear, use for section titles
- **Body:** Regular, 16px base size
- **Line Height:** 1.5 for readability
- **Letter Spacing:** 0.01em for headings

---

## Spacing
- **Base Unit:** 8px
- **Small Gap:** 4px
- **Medium Gap:** 16px
- **Large Gap:** 32px
- **Section Padding:** 64px top/bottom

---

## Component Usage
- **Buttons:** Use primary color for main actions, accent for secondary. Rounded corners, 16px padding.
- **Cards:** White background, subtle shadow, 16px padding, 8px border radius.
- **Modals:** Centered, with overlay, responsive width.
- **Forms:** Use clear labels, 8px vertical spacing between fields, error states in red.
- **Navigation:** Sticky top bar, primary color background, white text.

---

## Example CSS Variables
```css
:root {
  --color-primary: #1A2238;
  --color-accent: #9DAAF2;
  --color-background: #F4F4F4;
  --color-success: #21E6C1;
  --color-error: #FF6A6A;
  --font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --base-spacing: 8px;
}
```

---

## References
- [Refactoring UI](https://refactoringui.com/)
- [Accessible Color Palettes](https://www.smashingmagazine.com/2019/03/accessibility-color-palettes/)
- [CSS Tricks: Design Systems](https://css-tricks.com/design-systems-intro/)
