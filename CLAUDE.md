# Promptly3D AI Assistant Guidelines

## Project Overview
Promptly3D is an AI-powered 3D design platform that transforms natural language into manufacturable 3D designs.

## Tech Stack
- Frontend: Vanilla JavaScript, HTML5, CSS3
- 3D Graphics: Three.js (r128)
- Animations: GSAP
- Forms: Formspree
- Deployment: Vercel

## Key Components
- `index.html`: Main landing page
- `script.js`: 3D rendering and animations
- `style.css`: Responsive design system

## Development Guidelines
1. Maintain performance for 3D rendering
2. Ensure mobile responsiveness
3. Follow existing code patterns
4. Test WebGL compatibility
5. Optimize asset loading

## Common Tasks
- Adding new 3D models
- Implementing interactive features
- Optimizing WebGL performance
- Enhancing animations
- Improving accessibility

## Validation Requirements
- Test on multiple devices
- Check WebGL fallbacks
- Verify loading performance
- Ensure accessibility compliance

## Project Structure
```
promptly3d.ai/
├── .claude/           # Claude Code commands
├── PRPs/             # Product Requirement Prompts
├── docs/             # Documentation
├── backup/           # Backup files
├── index.html        # Main page
├── script.js         # 3D logic
├── style.css         # Styles
└── vercel.json       # Deployment config
```

## Three.js Implementation Notes
- Using CDN version r128 for stability
- OrbitControls for camera manipulation
- GLTFLoader for 3D model loading
- WebGLRenderer with antialias enabled
- Responsive canvas sizing on window resize

## Performance Targets
- 60 FPS on desktop devices
- 30+ FPS on mobile devices
- < 3s initial load time
- < 100ms interaction response

## Testing Commands
```bash
# Run local server
python -m http.server 8000

# Check performance
# Use Chrome DevTools Lighthouse

# Verify deployment
vercel --prod
```