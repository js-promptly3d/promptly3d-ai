# Modern Web Development Patterns & Interactive Features

## Overview
This guide covers modern web development patterns with emphasis on interactive features, responsive design, and performance optimization. Includes advanced CSS animations, JavaScript ES6+ patterns, and best practices for creating engaging user experiences.

## HTML5 Semantic Structure & Best Practices

### Modern HTML5 Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="description" content="Comprehensive page description for SEO">
  <meta name="keywords" content="relevant, keywords, for, seo">
  <meta name="author" content="Your Name">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/">
  <meta property="og:title" content="Your Page Title">
  <meta property="og:description" content="Your page description">
  <meta property="og:image" content="https://yoursite.com/image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yoursite.com/">
  <meta property="twitter:title" content="Your Page Title">
  <meta property="twitter:description" content="Your page description">
  <meta property="twitter:image" content="https://yoursite.com/image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Critical CSS inline -->
  <style>
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  </style>
  
  <!-- Non-critical CSS -->
  <link rel="stylesheet" href="/css/styles.css">
  
  <title>Your Page Title | Your Site Name</title>
</head>
<body>
  <header role="banner">
    <nav aria-label="Main navigation" class="main-nav">
      <div class="nav-container">
        <a href="/" class="logo" aria-label="Home">
          <img src="/logo.svg" alt="Your Site Logo" width="120" height="40">
        </a>
        
        <button class="menu-toggle" aria-expanded="false" aria-label="Toggle menu">
          <span class="hamburger"></span>
        </button>
        
        <ul class="nav-menu" role="menubar">
          <li role="none"><a href="#home" role="menuitem">Home</a></li>
          <li role="none"><a href="#about" role="menuitem">About</a></li>
          <li role="none"><a href="#services" role="menuitem">Services</a></li>
          <li role="none"><a href="#contact" role="menuitem">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>
  
  <main role="main">
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero-content">
        <h1 id="hero-heading">Welcome to Our Site</h1>
        <p class="hero-subtitle">Creating amazing digital experiences</p>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-primary glow-button">Get Started</a>
          <a href="#about" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
    
    <section class="features" aria-labelledby="features-heading">
      <div class="container">
        <h2 id="features-heading">Our Features</h2>
        <div class="features-grid">
          <article class="feature-card interactive-card">
            <h3>Feature One</h3>
            <p>Description of feature one.</p>
          </article>
          <article class="feature-card interactive-card">
            <h3>Feature Two</h3>
            <p>Description of feature two.</p>
          </article>
          <article class="feature-card interactive-card">
            <h3>Feature Three</h3>
            <p>Description of feature three.</p>
          </article>
        </div>
      </div>
    </section>
  </main>
  
  <footer role="contentinfo">
    <div class="footer-content">
      <p>&copy; 2024 Your Site. All rights reserved.</p>
      <div class="social-links">
        <a href="#" aria-label="Facebook">Facebook</a>
        <a href="#" aria-label="Twitter">Twitter</a>
        <a href="#" aria-label="LinkedIn">LinkedIn</a>
      </div>
    </div>
  </footer>
  
  <!-- JavaScript -->
  <script src="/js/main.js" defer></script>
</body>
</html>
```

## Advanced CSS Interactive Patterns

### CSS Custom Properties & Variables
```css
:root {
  /* Color System */
  --primary-color: #667eea;
  --primary-dark: #5a6fd8;
  --primary-light: #8b9df0;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  /* Grayscale */
  --white: #ffffff;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --black: #000000;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  /* Spacing */
  --spacing-px: 1px;
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #8b9df0;
    --text-color: var(--gray-100);
    --bg-color: var(--gray-900);
    --card-bg: var(--gray-800);
  }
}
```

### Glowing Buttons with Advanced Hover Effects
```css
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  user-select: none;
  transform: translateZ(0);
  will-change: transform;
}

/* Primary button with glow effect */
.btn-primary {
  color: var(--white);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    var(--shadow-2xl),
    0 0 30px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: var(--shadow-md);
}

/* Glow button with pulsing effect */
.glow-button {
  position: relative;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-full);
  color: var(--white);
  font-weight: 700;
  font-size: var(--text-lg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--transition-base);
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(102, 126, 234, 0.4),
    0 0 20px rgba(102, 126, 234, 0.3);
}

.glow-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: rotate 2s linear infinite;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.glow-button:hover::before {
  opacity: 1;
}

.glow-button:hover {
  transform: scale(1.05) translateY(-3px);
  box-shadow: 
    0 8px 30px rgba(102, 126, 234, 0.6),
    0 0 40px rgba(102, 126, 234, 0.4),
    0 0 60px rgba(102, 126, 234, 0.2);
}

.glow-button:active {
  transform: scale(0.95) translateY(-1px);
}

/* Ripple effect */
.glow-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.glow-button:active::after {
  width: 300px;
  height: 300px;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Pulse animation */
.glow-button.pulse {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 
      0 4px 15px rgba(102, 126, 234, 0.4),
      0 0 20px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 
      0 8px 25px rgba(102, 126, 234, 0.6),
      0 0 40px rgba(102, 126, 234, 0.5);
  }
}

/* Liquid morphing button */
.liquid-button {
  position: relative;
  padding: var(--spacing-4) var(--spacing-8);
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: var(--radius-2xl);
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
}

.liquid-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: conic-gradient(
    from 0deg,
    #667eea,
    #764ba2,
    #f093fb,
    #f5576c,
    #667eea
  );
  border-radius: var(--radius-2xl);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: -1;
}

.liquid-button:hover {
  transform: rotate(5deg) scale(1.05);
  border-radius: var(--radius-lg);
}

.liquid-button:hover::before {
  opacity: 1;
  transform: rotate(-5deg);
}
```

### Interactive Card Components
```css
/* Base card styles */
.card {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-base);
  position: relative;
}

.interactive-card {
  cursor: pointer;
  position: relative;
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.interactive-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, 
    var(--primary-color), 
    var(--secondary-color), 
    var(--accent-color)
  );
  border-radius: var(--radius-xl);
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: -1;
}

.interactive-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    var(--shadow-2xl),
    0 0 30px rgba(102, 126, 234, 0.15);
}

.interactive-card:hover::before {
  opacity: 1;
}

/* 3D flip card */
.flip-card {
  perspective: 1000px;
  width: 100%;
  height: 300px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--spacing-6);
}

.flip-card-front {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white);
}

.flip-card-back {
  background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
  color: var(--white);
  transform: rotateY(180deg);
}

/* Glassmorphism card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-base);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15);
}
```

### Mobile-First Responsive Design
```css
/* Mobile-first base styles */
.container {
  width: 100%;
  max-width: 100%;
  padding: 0 var(--spacing-4);
  margin: 0 auto;
}

/* Grid system */
.grid {
  display: grid;
  gap: var(--spacing-6);
  grid-template-columns: 1fr;
}

/* Typography responsive scaling */
.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-4);
}

/* Breakpoint mixins using container queries */
@container (min-width: 640px) {
  .container {
    padding: 0 var(--spacing-6);
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 var(--spacing-8);
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-8);
  }
  
  .hero-title {
    font-size: clamp(3rem, 6vw, 5rem);
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .hero-title {
    font-size: clamp(4rem, 7vw, 6rem);
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
  
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .interactive-card:hover {
    transform: none;
    box-shadow: var(--shadow-lg);
  }
  
  .interactive-card:active {
    transform: scale(0.98);
  }
  
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Modern JavaScript ES6+ Patterns

### Module System & Imports
```javascript
// utils/helpers.js
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const throttle = (func, delay) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  };
};

// Class-based component
export class InteractiveComponent {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...this.defaultOptions, ...options };
    this.init();
  }
  
  get defaultOptions() {
    return {
      animationDuration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }
  
  init() {
    this.bindEvents();
    this.setupAnimation();
  }
  
  bindEvents() {
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }
  
  async handleClick(event) {
    event.preventDefault();
    await this.animate();
    this.emit('click', { element: this.element });
  }
  
  animate() {
    return new Promise(resolve => {
      this.element.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        this.element.style.transform = 'scale(1)';
        resolve();
      }, this.options.animationDuration);
    });
  }
  
  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.element.dispatchEvent(event);
  }
  
  destroy() {
    // Cleanup event listeners
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}
```

### Async/Await Patterns & Error Handling
```javascript
// api/client.js
class ApiClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.options = {
      timeout: 10000,
      retries: 3,
      ...options
    };
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...this.options,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.options.headers,
        ...options.headers
      }
    };
    
    let lastError;
    
    for (let attempt = 0; attempt < this.options.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);
        
        const response = await fetch(url, {
          ...config,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        
      } catch (error) {
        lastError = error;
        
        if (attempt < this.options.retries - 1) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }
  
  async get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url);
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
const api = new ApiClient('https://api.example.com');

// Async function with proper error handling
async function fetchUserData(userId) {
  try {
    const user = await api.get(`/users/${userId}`);
    const posts = await api.get(`/users/${userId}/posts`);
    
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new Error('Unable to load user information');
  }
}

// Concurrent requests
async function fetchAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      api.get('/users'),
      api.get('/posts'),
      api.get('/comments')
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}

// Sequential processing with error handling
async function processDataSequentially(items) {
  const results = [];
  const errors = [];
  
  for (const item of items) {
    try {
      const result = await processItem(item);
      results.push(result);
    } catch (error) {
      errors.push({ item, error: error.message });
    }
  }
  
  return { results, errors };
}
```

### DOM Manipulation & Event Handling
```javascript
// dom/manipulator.js
class DOMHelper {
  // Modern element selection
  static select(selector, context = document) {
    return context.querySelector(selector);
  }
  
  static selectAll(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  }
  
  // Element creation with attributes
  static create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      element.textContent = content;
    }
    
    return element;
  }
  
  // Batch DOM operations
  static batch(operations) {
    const fragment = document.createDocumentFragment();
    
    operations.forEach(op => {
      if (op.type === 'append') {
        fragment.appendChild(op.element);
      }
    });
    
    return fragment;
  }
  
  // Intersection Observer wrapper
  static observe(elements, callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(callback, { ...defaultOptions, ...options });
    
    elements.forEach(element => observer.observe(element));
    
    return observer;
  }
  
  // Resize Observer wrapper
  static observeResize(elements, callback) {
    const observer = new ResizeObserver(callback);
    elements.forEach(element => observer.observe(element));
    return observer;
  }
}

// Event delegation helper
class EventManager {
  constructor() {
    this.listeners = new Map();
  }
  
  delegate(container, selector, event, handler) {
    const wrappedHandler = (e) => {
      const target = e.target.closest(selector);
      if (target && container.contains(target)) {
        handler.call(target, e);
      }
    };
    
    container.addEventListener(event, wrappedHandler);
    
    const key = `${selector}-${event}`;
    this.listeners.set(key, { container, event, handler: wrappedHandler });
    
    return () => this.remove(key);
  }
  
  remove(key) {
    const listener = this.listeners.get(key);
    if (listener) {
      listener.container.removeEventListener(listener.event, listener.handler);
      this.listeners.delete(key);
    }
  }
  
  removeAll() {
    this.listeners.forEach((listener, key) => {
      this.remove(key);
    });
  }
}

// Usage examples
const eventManager = new EventManager();

// Delegate click events for all buttons
eventManager.delegate(document, '.btn', 'click', function(e) {
  console.log('Button clicked:', this);
});

// Animate elements on scroll
const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
};

DOMHelper.observe(
  DOMHelper.selectAll('.animate-on-scroll'),
  animateOnScroll,
  { threshold: 0.2 }
);
```

### State Management & Reactive Patterns
```javascript
// state/store.js
class StateStore {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = [];
    this.history = [{ ...initialState }];
    this.currentIndex = 0;
  }
  
  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  
  // Update state
  setState(updater) {
    const newState = typeof updater === 'function' 
      ? updater(this.state)
      : { ...this.state, ...updater };
    
    if (this.isStateChanged(newState)) {
      this.state = newState;
      this.addToHistory(newState);
      this.notifyListeners();
    }
  }
  
  // Get current state
  getState() {
    return { ...this.state };
  }
  
  // Check if state actually changed
  isStateChanged(newState) {
    return JSON.stringify(this.state) !== JSON.stringify(newState);
  }
  
  // Add to history for undo/redo
  addToHistory(state) {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push({ ...state });
    this.currentIndex = this.history.length - 1;
  }
  
  // Undo last change
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.state = { ...this.history[this.currentIndex] };
      this.notifyListeners();
    }
  }
  
  // Redo last undone change
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.state = { ...this.history[this.currentIndex] };
      this.notifyListeners();
    }
  }
  
  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Reactive component base class
class ReactiveComponent {
  constructor(store, element) {
    this.store = store;
    this.element = element;
    this.unsubscribe = null;
    this.init();
  }
  
  init() {
    this.unsubscribe = this.store.subscribe(state => {
      this.render(state);
    });
    
    this.render(this.store.getState());
  }
  
  render(state) {
    // Override in subclasses
    throw new Error('render method must be implemented');
  }
  
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// Example usage
const appStore = new StateStore({
  user: null,
  theme: 'light',
  notifications: []
});

class UserProfile extends ReactiveComponent {
  render(state) {
    const { user, theme } = state;
    
    this.element.innerHTML = `
      <div class="user-profile ${theme}">
        ${user ? `
          <img src="${user.avatar}" alt="${user.name}">
          <h2>${user.name}</h2>
          <p>${user.email}</p>
        ` : `
          <p>Please log in</p>
        `}
      </div>
    `;
  }
}

// Initialize component
const profileElement = document.getElementById('user-profile');
const userProfile = new UserProfile(appStore, profileElement);
```

### Performance Optimization Patterns
```javascript
// performance/optimizer.js
class PerformanceOptimizer {
  // Lazy loading with Intersection Observer
  static lazyLoad(selector, options = {}) {
    const defaultOptions = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          observer.unobserve(img);
        }
      });
    }, defaultOptions);
    
    document.querySelectorAll(selector).forEach(img => {
      observer.observe(img);
    });
    
    return observer;
  }
  
  // Debounced scroll handler
  static createScrollHandler(callback, delay = 100) {
    let ticking = false;
    
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const debouncedHandler = debounce(handler, delay);
    
    window.addEventListener('scroll', debouncedHandler, { passive: true });
    
    return () => window.removeEventListener('scroll', debouncedHandler);
  }
  
  // Prefetch resources
  static prefetch(urls) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
  
  // Critical resource preloading
  static preload(resources) {
    resources.forEach(({ href, as, type }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    });
  }
  
  // Bundle splitting and dynamic imports
  static async loadModule(modulePath) {
    try {
      const module = await import(modulePath);
      return module;
    } catch (error) {
      console.error(`Failed to load module: ${modulePath}`, error);
      return null;
    }
  }
  
  // Web Workers for heavy computations
  static createWorker(workerFunction) {
    const blob = new Blob([`
      self.onmessage = function(e) {
        const result = (${workerFunction.toString()})(e.data);
        self.postMessage(result);
      }
    `], { type: 'application/javascript' });
    
    const worker = new Worker(URL.createObjectURL(blob));
    
    return {
      execute: (data) => {
        return new Promise((resolve, reject) => {
          worker.onmessage = (e) => resolve(e.data);
          worker.onerror = reject;
          worker.postMessage(data);
        });
      },
      terminate: () => {
        worker.terminate();
        URL.revokeObjectURL(blob);
      }
    };
  }
}

// Usage examples
// Lazy load images
PerformanceOptimizer.lazyLoad('img[data-src]');

// Preload critical resources
PerformanceOptimizer.preload([
  { href: '/critical.css', as: 'style' },
  { href: '/hero-image.jpg', as: 'image' },
  { href: '/main.js', as: 'script' }
]);

// Create optimized scroll handler
const removeScrollHandler = PerformanceOptimizer.createScrollHandler(() => {
  // Handle scroll events
  console.log('Scroll position:', window.scrollY);
});

// Dynamic module loading
async function loadFeature() {
  const module = await PerformanceOptimizer.loadModule('./features/advanced.js');
  if (module) {
    module.initialize();
  }
}
```

## Accessibility Best Practices

### ARIA & Semantic HTML
```html
<!-- Skip navigation for screen readers -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Proper heading hierarchy -->
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Accessible forms -->
<form>
  <fieldset>
    <legend>Contact Information</legend>
    
    <label for="name">Full Name (required)</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      required 
      aria-describedby="name-error"
      aria-invalid="false"
    >
    <span id="name-error" class="error" role="alert" aria-live="polite"></span>
    
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      aria-describedby="email-help"
    >
    <span id="email-help" class="help-text">We'll never share your email</span>
  </fieldset>
  
  <button type="submit" aria-describedby="submit-status">
    Send Message
  </button>
  <span id="submit-status" aria-live="polite"></span>
</form>

<!-- Accessible navigation -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="#" role="menuitem" aria-current="page">Home</a>
    </li>
    <li role="none">
      <a href="#" role="menuitem">About</a>
    </li>
    <li role="none">
      <button role="menuitem" aria-expanded="false" aria-haspopup="true">
        Services
      </button>
      <ul role="menu" aria-hidden="true">
        <li role="none">
          <a href="#" role="menuitem">Web Design</a>
        </li>
        <li role="none">
          <a href="#" role="menuitem">Development</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>

<!-- Accessible modal -->
<div 
  id="modal" 
  class="modal" 
  role="dialog" 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-hidden="true"
>
  <div class="modal-content">
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal description</p>
    <button class="close-btn" aria-label="Close modal">&times;</button>
  </div>
</div>
```

### Keyboard Navigation
```javascript
// keyboard/navigation.js
class KeyboardNavigation {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupFocusManagement();
    this.setupKeyboardShortcuts();
    this.setupModalFocusTrap();
  }
  
  setupFocusManagement() {
    // Focus visible on keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Skip to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
        }
      }
      
      // Toggle menu
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
          menuToggle.click();
        }
      }
    });
  }
  
  setupModalFocusTrap() {
    const modals = document.querySelectorAll('[role="dialog"]');
    
    modals.forEach(modal => {
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal(modal);
        }
        
        if (e.key === 'Tab') {
          this.trapFocus(modal, e);
        }
      });
    });
  }
  
  trapFocus(modal, event) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  }
  
  closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    
    // Return focus to trigger element
    const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }
}

// Initialize keyboard navigation
new KeyboardNavigation();
```

## Progressive Enhancement & Feature Detection

### Feature Detection
```javascript
// features/detection.js
class FeatureDetector {
  static supports = {
    // CSS features
    get cssGrid() {
      return CSS.supports('display', 'grid');
    },
    
    get cssCustomProperties() {
      return CSS.supports('--custom-property', 'value');
    },
    
    get cssClamp() {
      return CSS.supports('width', 'clamp(1rem, 5vw, 3rem)');
    },
    
    // JavaScript features
    get intersectionObserver() {
      return 'IntersectionObserver' in window;
    },
    
    get webGL() {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    },
    
    get touchEvents() {
      return 'ontouchstart' in window;
    },
    
    get serviceWorker() {
      return 'serviceWorker' in navigator;
    },
    
    get webAssembly() {
      return 'WebAssembly' in window;
    },
    
    // Media features
    get webp() {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      });
    }
  };
  
  static addFeatureClasses() {
    const html = document.documentElement;
    
    // Add classes based on feature support
    html.classList.add(this.supports.cssGrid ? 'css-grid' : 'no-css-grid');
    html.classList.add(this.supports.touchEvents ? 'touch' : 'no-touch');
    html.classList.add(this.supports.intersectionObserver ? 'intersection-observer' : 'no-intersection-observer');
    
    // Detect WebP support
    this.supports.webp.then(supported => {
      html.classList.add(supported ? 'webp' : 'no-webp');
    });
  }
  
  static enhanceBasedOnSupport() {
    // Progressive enhancement for grid
    if (this.supports.cssGrid) {
      document.querySelectorAll('.grid-fallback').forEach(element => {
        element.classList.add('grid-enhanced');
      });
    }
    
    // Progressive enhancement for intersection observer
    if (this.supports.intersectionObserver) {
      import('./modules/lazy-loading.js').then(module => {
        module.init();
      });
    } else {
      // Fallback: load all images immediately
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
}

// Initialize feature detection
FeatureDetector.addFeatureClasses();
FeatureDetector.enhanceBasedOnSupport();
```

## Best Practices Summary

### Performance
1. **Lazy Loading**: Images, components, and routes
2. **Code Splitting**: Dynamic imports for better bundle size
3. **Caching**: Service workers and proper cache headers
4. **Minification**: CSS, JS, and HTML optimization
5. **Critical Path**: Inline critical CSS and defer non-critical resources

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Enhance with ARIA when needed
3. **Keyboard Navigation**: Full keyboard support
4. **Focus Management**: Proper focus indicators
5. **Screen Reader Support**: Test with assistive technologies

### User Experience
1. **Progressive Enhancement**: Start with basic functionality
2. **Responsive Design**: Mobile-first approach
3. **Loading States**: Provide feedback during operations
4. **Error Handling**: Graceful error recovery
5. **Performance Budgets**: Monitor and optimize metrics

### Code Organization
1. **Modular Architecture**: Use ES6 modules
2. **Component-Based**: Reusable, self-contained components
3. **State Management**: Centralized state handling
4. **Type Safety**: Consider TypeScript for larger projects
5. **Testing**: Unit, integration, and e2e testing

This comprehensive guide provides the foundation for building modern, interactive, and accessible web applications with optimal performance and user experience.