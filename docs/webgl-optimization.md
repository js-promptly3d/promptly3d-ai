# WebGL Optimization Rules

You are developing a high-performance 3D web application using Three.js. Optimize for 60 FPS on desktop and 30 FPS on mobile.

## Core WebGL Performance Principles

### Context Management
- Always check for WebGL context loss and implement recovery
- Use WebGL2 with graceful fallback to WebGL1
- Avoid creating multiple WebGL contexts
- Implement proper cleanup of WebGL resources

```javascript
// Context loss handling
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  // Pause rendering
});

canvas.addEventListener('webglcontextrestored', () => {
  // Reinitialize resources
});
```

### GPU Memory Management
- Dispose of geometries, materials, and textures properly
- Use `renderer.info.memory` to monitor GPU memory usage
- Implement object pooling for frequently created/destroyed objects
- Limit total geometry vertices to mobile GPU constraints

```javascript
// Proper disposal
geometry.dispose();
material.dispose();
texture.dispose();
```

### Rendering Optimization
- Minimize draw calls through geometry merging
- Use instanced rendering for repeated objects
- Implement frustum culling for off-screen objects
- Use LOD (Level of Detail) for complex models

```javascript
// Instanced rendering
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(instancedMesh);
```

## Mobile WebGL Considerations

### GPU Limitations
- Max texture size: 2048x2048 on many mobile devices
- Limited vertex shader uniforms (128-256)
- Reduced fragment shader precision
- Power management affects performance

### Performance Targets
- Target 30 FPS on mobile devices
- Keep vertex count under 100k for mobile scenes
- Use compressed textures (ETC1/ETC2, ASTC)
- Implement adaptive quality settings

```javascript
// Adaptive quality based on device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);
```

## Shader Optimization

### Vertex Shader Best Practices
- Minimize vertex shader complexity
- Use fewer uniforms and varyings
- Prefer matrix operations over individual calculations
- Use built-in attributes when possible

### Fragment Shader Best Practices
- Minimize texture lookups
- Use lower precision (mediump) when possible
- Avoid branching in fragment shaders
- Use texture atlases to reduce texture switches

```glsl
// Efficient fragment shader
precision mediump float;
uniform sampler2D diffuseMap;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(diffuseMap, vUv);
  gl_FragColor = texColor;
}
```

## Performance Monitoring

### FPS Monitoring
- Use `requestAnimationFrame` timing for FPS calculation
- Monitor frame time spikes
- Implement performance warnings for low FPS

```javascript
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

function animate() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  
  if (deltaTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastTime = currentTime;
  }
  
  frameCount++;
  requestAnimationFrame(animate);
}
```

### Memory Monitoring
- Track GPU memory usage
- Monitor texture memory consumption
- Implement memory leak detection

```javascript
// Memory monitoring
function logMemoryUsage() {
  const info = renderer.info;
  console.log('Geometries:', info.memory.geometries);
  console.log('Textures:', info.memory.textures);
  console.log('Draw calls:', info.render.calls);
}
```

## Optimization Strategies

### Geometry Optimization
- Use indexed geometries
- Merge static geometries
- Implement geometry instancing
- Use simplified collision meshes

### Material Optimization
- Share materials between objects
- Use material variants sparingly
- Implement material streaming for large scenes
- Use flat shading when appropriate

### Texture Optimization
- Use power-of-2 texture sizes
- Implement texture compression
- Use texture atlases
- Implement texture streaming

## Development Guidelines

### Always Do
- Profile before optimizing
- Test on actual mobile devices
- Implement progressive enhancement
- Use WebGL extensions when available

### Never Do
- Create textures in the render loop
- Modify uniform values unnecessarily
- Use synchronous operations
- Ignore mobile limitations

### Performance Budgets
- Desktop: 60 FPS, 100MB GPU memory
- Mobile: 30 FPS, 50MB GPU memory
- Tablet: 45 FPS, 75MB GPU memory

## Error Handling

### WebGL Errors
- Check for WebGL support before initialization
- Handle shader compilation errors gracefully
- Implement texture loading error recovery
- Provide meaningful error messages

```javascript
// WebGL support detection
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!context;
  } catch (e) {
    return false;
  }
}
```

Remember: Performance optimization is an iterative process. Always measure before and after changes.