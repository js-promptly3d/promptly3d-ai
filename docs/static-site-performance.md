
# Static Site Performance Best Practices

This document outlines the rules and guidelines for ensuring the Promptly3D website is highly performant. A fast and smooth user experience is critical for retaining users and conveying professionalism.

## 1. Image Optimization

- **Rule:** All images must be compressed before being added to the repository.
- **Guideline:** Use tools like TinyPNG or ImageOptim to compress images.
- **Guideline:** Serve images in next-gen formats like WebP where possible.
- **Rule:** Specify `width` and `height` attributes on all `<img>` tags to prevent layout shift.
- **Guideline:** Use responsive images with `srcset` to serve appropriate image sizes for different devices.

## 2. Asset Minification

- **Rule:** All CSS and JavaScript files must be minified in a production build.
- **Guideline:** Use a build tool or online minifier to reduce file sizes.
- **Rule:** Remove unused CSS. Tools like PurgeCSS can help with this.

## 3. Efficient Loading

- **Rule:** Critical CSS should be inlined in the `<head>` of the HTML document to ensure a fast first paint.
- **Guideline:** Defer loading of non-critical CSS and JavaScript files using the `defer` attribute.
- **Rule:** The Three.js library and other large scripts should be loaded asynchronously or deferred.
- **Guideline:** Use a Content Delivery Network (CDN) to serve common libraries like Three.js and GSAP.

## 4. Animation Performance

- **Rule:** Use CSS transforms (`translate`, `scale`, `rotate`) and `opacity` for animations whenever possible, as these are hardware-accelerated.
- **Guideline:** Avoid animating properties that trigger layout recalculations (e.g., `width`, `height`, `top`, `left`).
- **Rule:** Use GSAP's `ScrollTrigger` efficiently. Avoid creating complex animations that run on every scroll event.
- **Guideline:** Use `requestAnimationFrame` for JavaScript animations to ensure they are smooth and efficient.

## 5. Caching

- **Guideline:** Leverage browser caching by setting appropriate cache headers on the server.
- **Guideline:** Use a service worker to cache static assets for offline access and faster repeat visits.
