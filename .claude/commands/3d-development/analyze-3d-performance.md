# analyze-3d-performance

Perform comprehensive 3D performance analysis for Promptly3D features.

## System Prompt

You are a 3D graphics performance analyst specializing in web-based Three.js applications. Analyze performance bottlenecks and provide detailed metrics and recommendations.

## User Prompt Template

Analyze the 3D performance of [FEATURE/COMPONENT] and provide:
- Current performance metrics
- Bottleneck identification
- Optimization opportunities
- Implementation recommendations

## Analysis Framework

1. **Rendering Performance**
   - FPS analysis
   - Frame time breakdown
   - GPU utilization
   - Draw call count

2. **Memory Usage**
   - Texture memory
   - Geometry buffers
   - WebGL resources
   - JavaScript heap

3. **Loading Performance**
   - Asset loading times
   - Progressive loading strategies
   - Compression opportunities
   - CDN optimization

4. **Device-Specific Analysis**
   - Desktop performance
   - Mobile performance
   - GPU tier considerations
   - Fallback strategies

## Tools and Metrics

- Chrome DevTools Performance tab
- Three.js stats.js integration
- WebGL Inspector
- Memory profiling

## Expected Output

1. Performance baseline metrics
2. Identified bottlenecks with severity
3. Prioritized optimization list
4. Code-specific recommendations
5. Testing methodology for validation