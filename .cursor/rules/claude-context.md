# Promptly3D Project Context

## Project Overview
Promptly3D is an interactive 3D design platform similar to zoo.dev/text-to-cad that allows users to transform ideas into manufacturable 3D designs using natural language. The platform removes the need for specialized CAD skills by providing an intuitive AI-powered interface.

## Current Status
- **Phase**: Landing page with basic form functionality
- **Next Phase**: Integration of 3D model viewer and text-to-3D generation
- **Target**: Full-featured 3D design platform with manufacturing integration

## Tech Stack

### Core Technologies
- **3D Rendering**: Three.js (WebGL-based 3D library)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Frontend**: Vanilla JavaScript (ES6+)
- **Forms**: Formspree for serverless form handling
- **Hosting**: Cloudflare Pages
- **Styling**: Custom CSS with modern techniques

### Planned Integrations
- **AI/ML**: Text-to-3D model generation API
- **CAD Processing**: GLTF/GLB model optimization
- **Manufacturing**: STL/OBJ export capabilities
- **Real-time Collaboration**: WebRTC for shared sessions

## Key Features to Implement

### Phase 1: 3D Viewer Foundation
- [ ] Three.js scene setup with orbit controls
- [ ] GLTF/GLB model loading and display
- [ ] Basic lighting and material system
- [ ] Progressive loading for large models
- [ ] Mobile-responsive 3D interactions

### Phase 2: Text-to-3D Generation
- [ ] Natural language input processing
- [ ] AI model integration for 3D generation
- [ ] Real-time preview and refinement
- [ ] Model parameter adjustment interface
- [ ] Generation history and favorites

### Phase 3: CAD-like Tools
- [ ] 3D object manipulation tools (move, rotate, scale)
- [ ] Measurement tools (distance, angle, area)
- [ ] Basic geometric primitive creation
- [ ] Model combining and boolean operations
- [ ] Undo/redo system

### Phase 4: Manufacturing Integration
- [ ] STL/OBJ export functionality
- [ ] Manufacturing viability analysis
- [ ] Material property specification
- [ ] Cost estimation integration
- [ ] Direct manufacturer quote requests

## Performance Targets

### Loading Performance
- **First Contentful Paint**: < 1.5 seconds
- **3D Scene Ready**: < 3 seconds
- **Model Loading**: < 5 seconds for typical models
- **Interactive Response**: < 16ms (60 FPS)

### Device Support
- **Desktop**: 60 FPS with high-quality rendering
- **Mobile (High-end)**: 30 FPS with medium quality
- **Mobile (Low-end)**: 24 FPS with adaptive quality
- **WebGL Fallback**: 2D preview mode

### Memory Budgets
- **Desktop**: 100MB GPU memory, 50MB RAM
- **Mobile**: 50MB GPU memory, 25MB RAM
- **Model Complexity**: 50k vertices max for mobile, 200k for desktop

## Architecture Patterns

### 3D Scene Management
- Single Three.js scene with modular components
- Object pooling for frequently created geometries
- Level-of-detail (LOD) system for performance
- Efficient asset loading and caching

### State Management
- Vanilla JavaScript with custom event system
- Centralized application state
- Immutable state updates
- Performance-optimized re-rendering

### UI Architecture
- Floating panels for 3D tools
- Context-sensitive menus
- Responsive design for all screen sizes
- Accessibility-first approach

## Development Patterns

### Code Organization
```
src/
├── core/           # Core 3D engine components
├── ui/             # UI components and interactions
├── tools/          # 3D manipulation tools
├── ai/             # AI integration modules
├── export/         # Model export functionality
├── utils/          # Utility functions
└── assets/         # 3D models, textures, etc.
```

### Naming Conventions
- **Classes**: PascalCase (e.g., `ModelViewer`, `TextToModel`)
- **Functions**: camelCase (e.g., `loadModel`, `generateMesh`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_VERTICES`, `DEFAULT_QUALITY`)
- **Files**: kebab-case (e.g., `model-viewer.js`, `text-to-3d.js`)

### Error Handling
- Graceful WebGL context loss recovery
- Progressive fallbacks for unsupported features
- User-friendly error messages
- Automatic error reporting and analytics

## User Experience Principles

### Ease of Use
- Natural language input should be primary interface
- Complex 3D operations simplified into intuitive actions
- Progressive disclosure of advanced features
- Contextual help and tutorials

### Visual Design
- Modern, clean interface inspired by professional CAD tools
- Consistent color scheme and typography
- Smooth animations and transitions
- Dark mode support for extended use

### Accessibility
- Keyboard navigation for all 3D interactions
- Screen reader support for model descriptions
- High contrast mode for visual accessibility
- Voice commands for hands-free operation

## Business Context

### Target Users
- **Primary**: Engineers and designers without CAD expertise
- **Secondary**: Students and educators in STEM fields
- **Tertiary**: Hobbyists and makers

### Value Proposition
- Democratizes 3D design through natural language
- Reduces time from concept to prototype
- Eliminates need for expensive CAD software training
- Direct manufacturing integration

### Revenue Model
- Freemium with usage-based pricing
- Manufacturer network commission
- Enterprise licenses for teams
- API access for developers

## Integration Points

### Current Integrations
- **Formspree**: Contact form handling
- **Cloudflare**: Hosting and CDN
- **Google Fonts**: Typography
- **GSAP**: Animation library

### Planned Integrations
- **OpenAI/Custom ML**: Text-to-3D generation
- **Manufacturing APIs**: Quote requests and ordering
- **Payment Processing**: Stripe for transactions
- **Analytics**: User behavior and performance monitoring

## Quality Assurance

### Testing Strategy
- Visual regression testing for 3D rendering
- Performance testing on various devices
- Accessibility testing with screen readers
- Cross-browser compatibility validation

### Deployment Pipeline
- Automated testing on pull requests
- Staging environment for pre-production testing
- Gradual rollout for major features
- Performance monitoring and alerting

## Security Considerations

### Data Protection
- No sensitive data stored client-side
- Secure transmission of 3D models
- Privacy-compliant analytics
- GDPR and CCPA compliance

### Content Security
- CSP headers for XSS prevention
- Secure model upload validation
- Rate limiting for API endpoints
- Input sanitization for text processing

## Future Roadmap

### Short-term (3-6 months)
- Complete 3D viewer implementation
- Basic text-to-3D generation
- Mobile optimization
- User testing and feedback integration

### Medium-term (6-12 months)
- Advanced 3D manipulation tools
- Manufacturing integration
- Collaboration features
- API for third-party developers

### Long-term (12+ months)
- VR/AR support
- Advanced AI features
- Enterprise solutions
- Global manufacturing network

## Development Guidelines

### Code Quality
- ESLint and Prettier for code formatting
- Comprehensive JSDoc documentation
- Unit tests for critical functions
- Performance profiling for 3D operations

### Git Workflow
- Feature branches for all new work
- Descriptive commit messages
- Regular code reviews
- Automated testing before merge

### Performance Monitoring
- Real-time performance metrics
- User experience analytics
- Error tracking and alerting
- Regular performance audits

Remember: This is a cutting-edge 3D web application. Always prioritize performance, user experience, and accessibility in every decision.