# Promptly3D - AI-Powered 3D Design Platform

![Promptly3D Logo](promptly3d-logo.png)

Promptly3D is a forward-thinking web platform designed to revolutionize 3D modeling. It allows users to transform their ideas into manufacturable 3D designs using natural language, removing the need for specialized CAD skills. This repository contains the source code for the project's landing page and user interaction interface.

**Live Demo:** [**promptly3d.ai**](https://promptly3d.ai/)

---

## Project Vision & Inspiration
Promptly3D is inspired by the next generation of creative tools, such as [zoo.dev/text-to-cad](https://zoo.dev/text-to-cad), and aims to make 3D design accessible, interactive, and fun for everyone. Our philosophy is rooted in "vibe coding": rapid prototyping, creative exploration, and pushing the boundaries of what’s possible with web-based 3D and animation.

---

## Key Features
- **Natural Language to 3D Model:** Users can describe their desired object using plain English (text, voice, or even sketches). The AI interprets these descriptions to generate precise 3D geometry.
- **Conversational Refinement:** The design can be iteratively improved through a natural conversation with the AI. Make adjustments like "add a 5mm fillet to all edges" or "make it 20% stronger."
- **Manufacturing-Ready Exports:** Instantly generate files ready for production, including STEP for machining, optimized STL for 3D printing, and professional technical drawings.
- **Manufacturer Marketplace:** Connect directly with a network of verified manufacturers to get quotes and order parts without leaving the platform.
- **Dynamic & Interactive UI:** The website is built with a modern, responsive interface featuring smooth animations (powered by GSAP) and interactive elements to guide the user.
- **Advanced Form Handling:** A single, intelligent contact form dynamically adjusts fields and submission endpoints for different user types (Users, Vendors, Developers, Investors).
- **Interactive 3D Preview (Planned):** While [Three.js](https://threejs.org/) is included in the project, the interactive 3D model viewer is a planned feature that is not yet implemented in `script.js`.

## Current Implementation Status

### ✅ **Phase 1 Complete: Professional Marketing Site**
- **Hero Section:** Dynamic contact form with user type selection (Users, Vendors, Developers, Investors)
- **Process Flow:** Interactive hover states with click-to-pin descriptions
- **Animations:** Smooth GSAP-powered scroll triggers and micro-interactions
- **Responsive Design:** Mobile-first approach with touch-friendly interactions
- **Form Integration:** Formspree endpoints for different user types with validation
- **Performance:** 60fps animations and optimized asset loading

### 📋 **Phase 2 Planned: Basic 3D Integration**
- **3D Scene Setup:** Initialize Three.js scene in hero section
- **Basic Model Viewer:** Add rotating 3D product preview
- **Orbit Controls:** Enable user interaction with 3D models
- **Progressive Enhancement:** Maintain existing functionality while adding 3D features

### 🚀 **Phase 3 Future: Interactive 3D Platform**
- **Text-to-3D Interface:** Natural language to 3D model generation
- **Manipulation Tools:** 3D gizmos, selection, and transformation systems
- **Export Capabilities:** STL, OBJ, GLTF file generation
- **AI Integration:** Advanced natural language processing for design

### 🔬 **Phase 4 Advanced: Manufacturing Platform**
- **Cost Estimation:** Real-time pricing for manufacturing
- **Material Analysis:** Strength, weight, and feasibility calculations
- **Manufacturer Network:** Direct integration with production partners
- **Quality Assurance:** Automated design validation and optimization

---

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **3D & Animations:**
  - [Three.js](https://threejs.org/): For rendering 3D models in the browser.
  - [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/): For high-performance UI and scroll-based animations.
- **Form Handling:**
  - [Formspree](https://formspree.io/): For serverless form submissions.

---

## Documentation & Resources
- [Feature Documentation](docs/feature-documentation.md): In-depth guides for each major feature.
- [Design System Reference](docs/design-system-reference.md): Color palette, typography, spacing, and component usage.
- [Prompt Library](docs/prompt-library.md): Effective AI prompts and results for creative coding.
- [Animation Cookbook](docs/animation-cookbook.md): Recipes and patterns for UI and 3D animation.
- [Onboarding & Rules](.cursorrules): Project-wide standards and best practices.
- [Modular Rules](.cursor/rules/): Topic-specific rules for coding, design, 3D, and more.

---

## Getting Started
This is a static website with no complex build process. To run it locally, follow these steps:

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/promptly3d.ai.git
cd promptly3d.ai
```

**2. Open in your browser:**
You can simply open the `index.html` file directly in your web browser.
```
open index.html
```
For the best development experience, including hot-reloading, we recommend using a live server. If you are using Visual Studio Code, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

---

## Configuration
### Formspree Integration
The contact form relies on **Formspree** to handle submissions. You will need to create your own Formspree forms and update the endpoints in `script.js`.

The project is configured to use different endpoints for each user type selected in the form's dropdown menu.

**File to edit:** `script.js`

Update the `formEndpoints` object with your own Formspree URLs:
```javascript
// script.js
class Promptly3DApp {
    constructor() {
        this.formEndpoints = {
            users: 'https://formspree.io/f/{your_users_form_id}',
            vendors: 'https://formspree.io/f/{your_vendors_form_id}',
            developers: 'https://formspree.io/f/{your_developers_form_id}',
            investors: 'https://formspree.io/f/{your_investors_form_id}'
        };
        // ...
    }
    // ...
}
```

---

## Project Structure
The codebase is organized into three main files:
- `index.html`: Contains the main HTML structure and all page content.
- `style.css`: Provides the styling, branding, layout, and responsive design for the entire site.
- `script.js`: Handles all interactivity, including animations, form validation, and dynamic content.

---

## How to Use the Rules System
- **.cursorrules:** The master rules file for project-wide standards, philosophy, and workflow. Start here for high-level guidance.
- **.cursor/rules/:** Modular, topic-specific rules (e.g., 3D UX, animation, security, design system, prompt engineering). Reference these for detailed best practices.
- **docs/:** Human-readable documentation, feature guides, onboarding, and creative resources.
- **Prompt Library:** Use and contribute to the prompt library for AI-powered coding, creative inspiration, and “vibe coding” sessions.

---

## Deployment
This is a static website and can be deployed to any static hosting provider.

Based on our current plan, the website will be hosted using **Cloudflare Pages**, which provides excellent performance, security, and continuous deployment features.

---

## Development Roadmap

### Immediate Next Steps (Phase 2)
- [ ] **Initialize Three.js Scene:** Add basic 3D scene setup in hero section
- [ ] **Simple 3D Model:** Display rotating geometric shape or product preview
- [ ] **Orbit Controls:** Enable mouse/touch interaction with 3D objects
- [ ] **Performance Optimization:** Ensure 3D features don't impact form functionality

### Short-term Goals (3-6 months)
- [ ] **Text-to-3D Interface:** Replace or enhance textarea with 3D generation input
- [ ] **Model Manipulation:** Add basic transformation tools (move, rotate, scale)
- [ ] **Export System:** Implement STL/OBJ file generation
- [ ] **Mobile 3D Optimization:** Ensure smooth performance on mobile devices

### Medium-term Vision (6-12 months)
- [ ] **AI Integration:** Connect with text-to-3D generation APIs
- [ ] **Advanced 3D Tools:** Selection systems, measurement tools, boolean operations
- [ ] **Manufacturing Analysis:** Automated feasibility and cost estimation
- [ ] **User Accounts:** Save designs, history, and preferences

### Long-term Platform (12+ months)
- [ ] **Real-time Collaboration:** Multiple users working on same design
- [ ] **Manufacturer Network:** Direct integration with production partners
- [ ] **Advanced AI:** Conversational design refinement and suggestions
- [ ] **Open Source:** Release with MIT License for community contributions

### Technical Priorities
- [ ] **Performance Monitoring:** Add FPS and memory usage tracking
- [ ] **Progressive Enhancement:** Ensure all features work without WebGL
- [ ] **Accessibility:** Keyboard navigation for 3D interactions
- [ ] **Testing:** Automated visual regression tests for 3D rendering

---

## Contributing

### For Current Phase (Marketing Site)
- **UI/UX Improvements:** Enhance animations, micro-interactions, and responsive design
- **Form Enhancements:** Add better validation, error handling, and user feedback
- **Performance Optimizations:** Improve loading times and animation smoothness
- **Accessibility:** Add keyboard navigation and screen reader support

### For Future Phases (3D Platform)
- **3D Scene Setup:** Help initialize Three.js and create basic 3D previews
- **Interactive Tools:** Develop 3D manipulation and measurement systems
- **AI Integration:** Connect with text-to-3D generation APIs
- **Manufacturing Features:** Build export and analysis capabilities

### Contribution Process
1. **Fork the repository** and create a feature branch
2. **Review `.cursorrules`** for project standards and guidelines
3. **Check `.cursor/rules/`** for specific topic guidelines (3D, animation, etc.)
4. **Test thoroughly** on multiple devices and browsers
5. **Follow existing code patterns** and maintain consistency
6. **Submit a pull request** with clear description and testing notes

### Development Guidelines
- **Performance First:** Maintain 60fps animations and smooth interactions
- **Progressive Enhancement:** Ensure features work without advanced browser capabilities
- **Mobile Optimization:** Test on actual mobile devices, not just browser dev tools
- **Documentation:** Update relevant documentation and prompt libraries

## Important Notes

### Current Reality vs. Documentation
This project has extensive documentation for advanced 3D features in `.cursor/rules/` and `docs/`, but the **current implementation is a static website**. The documentation serves as:
- **Future Vision:** Roadmap for where the project is heading
- **Standards:** Code quality and architecture principles
- **Preparation:** Guidelines for when 3D features are implemented

### Three.js Integration Status
- ✅ **Three.js is loaded** in `index.html` (r128 from CDN)
- ❌ **No 3D scene exists** in `script.js`
- ❌ **No WebGL initialization** or 3D rendering
- 🎯 **Ready for integration** when Phase 2 begins

### Getting Started as a Contributor
1. **Understand the current state:** Professional static website with forms and animations
2. **Review existing code:** See `script.js` for current JavaScript patterns
3. **Check the roadmap:** Know what features are planned vs. implemented
4. **Start small:** Improve existing features before adding new ones

---

## License
This project is currently unlicensed. We plan to add an open-source license, such as the **MIT License**, in the future.
