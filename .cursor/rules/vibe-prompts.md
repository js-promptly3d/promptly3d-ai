# Vibe Coding Prompts

Quick reference prompts for common 3D development tasks and features.

## 3D Scene Setup

### Basic Scene Initialization
```
"Create a Three.js scene with orbit controls, proper lighting, and a grid helper for reference"
```

### Advanced Scene Setup
```
"Set up a Three.js scene with WebGL2 context, post-processing effects, shadow mapping, and performance monitoring"
```

### Environment and Lighting
```
"Add realistic lighting with HDR environment map, directional shadows, and ambient occlusion"
```

## Model Loading and Management

### Basic Model Loading
```
"Load a GLTF model with progress indication and error handling"
```

### Progressive Model Loading
```
"Implement progressive model loading with LOD system that loads low-res first, then streams high-res in background"
```

### Model Optimization
```
"Optimize loaded 3D models for web performance with geometry compression, texture atlasing, and material merging"
```

## 3D User Interface

### Object Selection System
```
"Create object selection system with raycasting, hover effects, and multi-selection support"
```

### Transformation Gizmos
```
"Add 3D manipulation gizmos for translation, rotation, and scaling with axis constraints and snapping"
```

### Context Menus
```
"Implement 3D context menus that appear in world space with relevant actions for selected objects"
```

## Interactive Features

### Orbit Controls Enhancement
```
"Enhance orbit controls with smooth animations, focus-on-object functionality, and touch gesture support"
```

### Object Manipulation
```
"Add direct object manipulation with mouse/touch drag for moving, rotating, and scaling 3D objects"
```

### Measurement Tools
```
"Create measurement tools for distance, angles, and areas with real-time visual feedback"
```

## Performance Optimization

### Frame Rate Monitoring
```
"Add FPS monitoring and automatic quality adjustment based on performance"
```

### Memory Management
```
"Implement proper disposal of Three.js objects with memory leak detection and cleanup"
```

### LOD System
```
"Create Level of Detail system that automatically switches model complexity based on camera distance"
```

### Frustum Culling
```
"Implement frustum culling to hide objects outside camera view and improve performance"
```

## Text-to-3D Features

### Natural Language Processing
```
"Add natural language processing for converting text descriptions into 3D object parameters"
```

### AI Model Integration
```
"Integrate AI model for text-to-3D generation with real-time preview and parameter adjustment"
```

### Generation History
```
"Create history system for generated models with favorites, search, and regeneration options"
```

## CAD-like Tools

### Geometric Primitives
```
"Add tools for creating basic 3D primitives (box, sphere, cylinder) with parameter controls"
```

### Boolean Operations
```
"Implement boolean operations (union, intersection, subtraction) for combining 3D objects"
```

### Parametric Modeling
```
"Create parametric modeling tools where users can adjust parameters and see real-time updates"
```

## Export and Manufacturing

### Model Export
```
"Add STL/OBJ export functionality with mesh optimization and validation"
```

### Manufacturing Analysis
```
"Implement manufacturing viability analysis with wall thickness checking and support detection"
```

### Cost Estimation
```
"Create cost estimation based on material, volume, and manufacturing complexity"
```

## Mobile Optimization

### Touch Interactions
```
"Optimize 3D interactions for mobile with touch gestures, haptic feedback, and larger touch targets"
```

### Performance Scaling
```
"Implement adaptive rendering quality for mobile devices with automatic degradation"
```

### Battery Optimization
```
"Add power-efficient rendering modes and frame rate throttling for mobile devices"
```

## Accessibility Features

### Keyboard Navigation
```
"Add keyboard navigation for 3D objects with focus indicators and screen reader support"
```

### Voice Commands
```
"Implement voice commands for common 3D operations and navigation"
```

### High Contrast Mode
```
"Create high contrast mode for better visibility with adjustable color schemes"
```

## Error Handling and Recovery

### WebGL Context Loss
```
"Handle WebGL context loss with automatic recovery and resource restoration"
```

### Graceful Degradation
```
"Implement graceful degradation with 2D fallbacks when WebGL is not supported"
```

### Network Error Handling
```
"Add robust error handling for model loading failures with retry mechanisms"
```

## Animation and Transitions

### Smooth Animations
```
"Create smooth camera transitions and object animations using GSAP timeline"
```

### Loading Animations
```
"Add engaging loading animations and progress indicators for 3D content"
```

### Interaction Feedback
```
"Implement visual feedback animations for user interactions (hover, click, drag)"
```

## Advanced Features

### Collaborative Editing
```
"Add real-time collaborative editing where multiple users can work on the same 3D scene"
```

### Version Control
```
"Implement version control for 3D models with diff visualization and rollback"
```

### Physics Integration
```
"Add physics simulation for realistic object interactions and collision detection"
```

## Testing and Debugging

### Visual Testing
```
"Create visual regression tests for 3D rendering consistency across different devices"
```

### Performance Profiling
```
"Add performance profiling tools to identify bottlenecks in 3D rendering pipeline"
```

### Debug Visualizations
```
"Implement debug visualizations for wireframes, normals, and bounding boxes"
```

## Deployment and DevOps

### Build Optimization
```
"Optimize build process for 3D assets with compression, bundling, and CDN integration"
```

### Progressive Web App
```
"Convert to PWA with service worker caching for 3D assets and offline functionality"
```

### Analytics Integration
```
"Add analytics tracking for 3D feature usage and performance metrics"
```

## Quick Fixes and Utilities

### Common Issues
```
"Fix common Three.js issues: texture loading, material updates, geometry disposal"
```

### Utility Functions
```
"Create utility functions for common 3D operations: coordinate conversion, vector math, matrix operations"
```

### Code Cleanup
```
"Refactor 3D code for better performance and maintainability"
```

## Integration Patterns

### React Integration
```
"Integrate Three.js with React using useRef hooks and proper lifecycle management"
```

### State Management
```
"Connect 3D scene state with application state management (Redux, Zustand, etc.)"
```

### API Integration
```
"Integrate with external APIs for 3D content, materials, and manufacturing services"
```

## Tips for Effective Prompting

### Be Specific
- Include exact Three.js version and features needed
- Specify performance requirements (FPS, memory usage)
- Mention target devices (desktop, mobile, VR)

### Context Matters
- Reference existing codebase patterns
- Mention related features already implemented
- Include any constraints or limitations

### Error Context
- Include error messages and browser console output
- Mention what was attempted and what failed
- Provide relevant code snippets

### Performance Focus
- Always mention performance requirements
- Include target frame rates and memory budgets
- Specify mobile optimization needs

Remember: These prompts are starting points. Always provide specific context about your project, existing code, and exact requirements for the best results.