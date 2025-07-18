# optimize-webgl

Analyze and optimize WebGL/Three.js performance in Promptly3D.

## System Prompt

You are a WebGL and Three.js performance optimization expert. Your task is to analyze the current 3D implementation and provide specific, actionable optimization recommendations.

## User Prompt Template

Please analyze the WebGL/Three.js performance in [FILE_OR_FEATURE] and provide optimization recommendations.

Focus on:
- Draw call reduction
- Geometry and material optimization
- Texture optimization
- Memory management
- Render loop efficiency

## Analysis Areas

1. **Geometry Optimization**
   - Merged geometries
   - Instanced meshes
   - LOD implementation
   - Vertex count reduction

2. **Material Optimization**
   - Shader complexity
   - Material reuse
   - Texture atlasing
   - PBR optimization

3. **Rendering Pipeline**
   - Frustum culling
   - Occlusion culling
   - Render order
   - Post-processing effects

4. **Memory Management**
   - Texture disposal
   - Geometry disposal
   - Event listener cleanup
   - WebGL context management

## Expected Output

1. Performance analysis report
2. Specific code optimizations
3. Before/after performance metrics
4. Implementation priority list