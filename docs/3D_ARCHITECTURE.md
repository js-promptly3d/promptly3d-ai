# 3D Architecture Guide

## Scene Management

### Single Three.js Scene Instance
The application uses a single Three.js scene as the primary container for all 3D objects. This approach provides:
- Consistent lighting and environmental settings
- Efficient memory management
- Simplified object relationships
- Unified coordinate system

```javascript
// Core scene setup
class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.clock = new THREE.Clock();
    
    this.setupRenderer();
    this.setupLighting();
    this.setupCamera();
  }

  setupRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }

  setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    
    // Fill light for softer shadows
    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }

  setupCamera() {
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
    
    // Setup orbit controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 50;
    this.controls.minDistance = 1;
  }
}
```

### Modular Component Loading
Components are loaded dynamically based on user needs and application state:

```javascript
// Component loader system
class ComponentLoader {
  constructor(scene) {
    this.scene = scene;
    this.loadedComponents = new Map();
    this.componentRegistry = new Map();
    
    this.registerComponents();
  }

  registerComponents() {
    this.componentRegistry.set('model-viewer', () => import('./components/ModelViewer.js'));
    this.componentRegistry.set('text-to-3d', () => import('./components/TextTo3D.js'));
    this.componentRegistry.set('manipulation-tools', () => import('./components/ManipulationTools.js'));
    this.componentRegistry.set('measurement-tools', () => import('./components/MeasurementTools.js'));
  }

  async loadComponent(name, config = {}) {
    if (this.loadedComponents.has(name)) {
      return this.loadedComponents.get(name);
    }

    const componentImport = this.componentRegistry.get(name);
    if (!componentImport) {
      throw new Error(`Component ${name} not found`);
    }

    const module = await componentImport();
    const component = new module.default(this.scene, config);
    
    this.loadedComponents.set(name, component);
    return component;
  }

  unloadComponent(name) {
    const component = this.loadedComponents.get(name);
    if (component && component.dispose) {
      component.dispose();
    }
    this.loadedComponents.delete(name);
  }
}
```

### Efficient Geometry Pooling
Object pooling prevents memory allocation overhead for frequently created/destroyed objects:

```javascript
// Geometry pool manager
class GeometryPool {
  constructor() {
    this.pools = new Map();
    this.maxPoolSize = 100;
  }

  getGeometry(type, params) {
    const key = this.generateKey(type, params);
    
    if (!this.pools.has(key)) {
      this.pools.set(key, []);
    }

    const pool = this.pools.get(key);
    
    if (pool.length > 0) {
      return pool.pop();
    }

    return this.createGeometry(type, params);
  }

  returnGeometry(type, params, geometry) {
    const key = this.generateKey(type, params);
    const pool = this.pools.get(key);
    
    if (pool && pool.length < this.maxPoolSize) {
      // Reset geometry to default state
      geometry.attributes.position.needsUpdate = true;
      pool.push(geometry);
    } else {
      geometry.dispose();
    }
  }

  createGeometry(type, params) {
    switch (type) {
      case 'box':
        return new THREE.BoxGeometry(params.width, params.height, params.depth);
      case 'sphere':
        return new THREE.SphereGeometry(params.radius, params.widthSegments, params.heightSegments);
      case 'cylinder':
        return new THREE.CylinderGeometry(params.radiusTop, params.radiusBottom, params.height);
      default:
        throw new Error(`Unknown geometry type: ${type}`);
    }
  }

  generateKey(type, params) {
    return `${type}_${JSON.stringify(params)}`;
  }
}
```

## Rendering Pipeline

### WebGL2 Context with Fallback
The application prioritizes WebGL2 for better performance while maintaining WebGL1 compatibility:

```javascript
// WebGL context manager
class WebGLManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = null;
    this.version = null;
    
    this.initializeContext();
  }

  initializeContext() {
    // Try WebGL2 first
    this.context = this.canvas.getContext('webgl2', {
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });

    if (this.context) {
      this.version = 2;
      console.log('WebGL2 context initialized');
      return;
    }

    // Fallback to WebGL1
    this.context = this.canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });

    if (this.context) {
      this.version = 1;
      console.log('WebGL1 context initialized');
      return;
    }

    throw new Error('WebGL not supported');
  }

  getExtension(name) {
    return this.context.getExtension(name);
  }

  getParameter(param) {
    return this.context.getParameter(param);
  }

  getMaxTextureSize() {
    return this.context.getParameter(this.context.MAX_TEXTURE_SIZE);
  }

  getMaxVertexUniforms() {
    return this.context.getParameter(this.context.MAX_VERTEX_UNIFORM_VECTORS);
  }
}
```

### Post-processing Effects
A flexible post-processing pipeline for visual enhancements:

```javascript
// Post-processing manager
class PostProcessingManager {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = null;
    this.passes = new Map();
    
    this.setupComposer();
  }

  setupComposer() {
    this.composer = new THREE.EffectComposer(this.renderer);
    
    // Render pass (base scene)
    const renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    // FXAA anti-aliasing
    const fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
    fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
    this.composer.addPass(fxaaPass);
    
    this.passes.set('fxaa', fxaaPass);
  }

  addPass(name, pass) {
    this.composer.addPass(pass);
    this.passes.set(name, pass);
  }

  removePass(name) {
    const pass = this.passes.get(name);
    if (pass) {
      this.composer.removePass(pass);
      this.passes.delete(name);
    }
  }

  togglePass(name, enabled) {
    const pass = this.passes.get(name);
    if (pass) {
      pass.enabled = enabled;
    }
  }

  render(deltaTime) {
    this.composer.render(deltaTime);
  }

  resize(width, height) {
    this.composer.setSize(width, height);
    
    // Update FXAA resolution
    const fxaaPass = this.passes.get('fxaa');
    if (fxaaPass) {
      fxaaPass.material.uniforms['resolution'].value.x = 1 / width;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / height;
    }
  }
}
```

### Adaptive Quality Settings
Dynamic quality adjustment based on device performance:

```javascript
// Quality manager
class QualityManager {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.currentQuality = 'high';
    this.qualitySettings = {
      low: {
        pixelRatio: 1,
        shadowMapSize: 512,
        antialias: false,
        maxLights: 2
      },
      medium: {
        pixelRatio: 1.5,
        shadowMapSize: 1024,
        antialias: true,
        maxLights: 4
      },
      high: {
        pixelRatio: 2,
        shadowMapSize: 2048,
        antialias: true,
        maxLights: 8
      }
    };
    
    this.performanceMonitor = new PerformanceMonitor();
    this.applyQuality(this.currentQuality);
  }

  applyQuality(quality) {
    const settings = this.qualitySettings[quality];
    
    // Adjust renderer settings
    this.renderer.setPixelRatio(Math.min(settings.pixelRatio, window.devicePixelRatio));
    this.renderer.shadowMap.mapSize.width = settings.shadowMapSize;
    this.renderer.shadowMap.mapSize.height = settings.shadowMapSize;
    
    // Adjust lighting
    this.adjustLighting(settings.maxLights);
    
    this.currentQuality = quality;
  }

  adjustLighting(maxLights) {
    const lights = this.scene.children.filter(child => child.isLight);
    
    lights.forEach((light, index) => {
      light.visible = index < maxLights;
    });
  }

  autoAdjustQuality() {
    const avgFPS = this.performanceMonitor.getAverageFPS();
    
    if (avgFPS < 30 && this.currentQuality !== 'low') {
      this.applyQuality('low');
    } else if (avgFPS < 50 && this.currentQuality === 'high') {
      this.applyQuality('medium');
    } else if (avgFPS > 55 && this.currentQuality !== 'high') {
      this.applyQuality('high');
    }
  }
}
```

## User Interaction

### Orbit Controls for Navigation
Enhanced orbit controls with smooth animations and constraints:

```javascript
// Enhanced orbit controls
class EnhancedOrbitControls extends THREE.OrbitControls {
  constructor(camera, domElement) {
    super(camera, domElement);
    
    this.enableDamping = true;
    this.dampingFactor = 0.05;
    this.screenSpacePanning = false;
    this.minDistance = 1;
    this.maxDistance = 100;
    this.maxPolarAngle = Math.PI;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.addEventListener('start', () => {
      document.body.style.cursor = 'grabbing';
    });

    this.addEventListener('end', () => {
      document.body.style.cursor = 'grab';
    });

    this.addEventListener('change', () => {
      // Trigger render on camera change
      this.dispatchEvent({ type: 'camera-change' });
    });
  }

  focusOnObject(object, distance = 10) {
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.object.fov * (Math.PI / 180);
    const cameraDistance = Math.abs(maxDim / Math.sin(fov / 2)) * distance;
    
    this.target.copy(center);
    this.object.position.copy(center).add(new THREE.Vector3(0, 0, cameraDistance));
    this.update();
  }

  animateToPosition(targetPosition, targetLookAt, duration = 1000) {
    const startPosition = this.object.position.clone();
    const startLookAt = this.target.clone();
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.object.position.lerpVectors(startPosition, targetPosition, eased);
      this.target.lerpVectors(startLookAt, targetLookAt, eased);
      this.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
}
```

### Raycasting for Object Selection
Efficient raycasting system for 3D object interaction:

```javascript
// Raycasting manager
class RaycastManager {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersectableObjects = [];
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('mousemove', (event) => {
      this.updateMousePosition(event);
      this.checkIntersections();
    });

    window.addEventListener('click', (event) => {
      this.updateMousePosition(event);
      this.handleClick();
    });
  }

  updateMousePosition(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  checkIntersections() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.intersectableObjects, true);
    
    if (intersects.length > 0) {
      this.handleHover(intersects[0]);
    } else {
      this.handleHoverEnd();
    }
  }

  handleClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.intersectableObjects, true);
    
    if (intersects.length > 0) {
      this.handleSelection(intersects[0]);
    } else {
      this.handleDeselection();
    }
  }

  handleHover(intersection) {
    const object = intersection.object;
    if (object.userData.onHover) {
      object.userData.onHover(intersection);
    }
  }

  handleHoverEnd() {
    // Handle hover end for all objects
    this.intersectableObjects.forEach(object => {
      if (object.userData.onHoverEnd) {
        object.userData.onHoverEnd();
      }
    });
  }

  handleSelection(intersection) {
    const object = intersection.object;
    if (object.userData.onSelect) {
      object.userData.onSelect(intersection);
    }
  }

  handleDeselection() {
    // Handle deselection for all objects
    this.intersectableObjects.forEach(object => {
      if (object.userData.onDeselect) {
        object.userData.onDeselect();
      }
    });
  }

  addIntersectableObject(object) {
    this.intersectableObjects.push(object);
  }

  removeIntersectableObject(object) {
    const index = this.intersectableObjects.indexOf(object);
    if (index > -1) {
      this.intersectableObjects.splice(index, 1);
    }
  }
}
```

### Touch Gesture Support
Comprehensive touch gesture handling for mobile devices:

```javascript
// Touch gesture manager
class TouchGestureManager {
  constructor(domElement, controls) {
    this.domElement = domElement;
    this.controls = controls;
    this.touches = [];
    this.lastTouchDistance = 0;
    this.lastTouchCenter = { x: 0, y: 0 };
    
    this.setupTouchListeners();
  }

  setupTouchListeners() {
    this.domElement.addEventListener('touchstart', (event) => {
      this.handleTouchStart(event);
    });

    this.domElement.addEventListener('touchmove', (event) => {
      this.handleTouchMove(event);
    });

    this.domElement.addEventListener('touchend', (event) => {
      this.handleTouchEnd(event);
    });
  }

  handleTouchStart(event) {
    event.preventDefault();
    this.touches = Array.from(event.touches);
    
    if (this.touches.length === 2) {
      this.lastTouchDistance = this.getTouchDistance();
      this.lastTouchCenter = this.getTouchCenter();
    }
  }

  handleTouchMove(event) {
    event.preventDefault();
    this.touches = Array.from(event.touches);
    
    if (this.touches.length === 2) {
      const currentDistance = this.getTouchDistance();
      const currentCenter = this.getTouchCenter();
      
      // Handle pinch-to-zoom
      if (this.lastTouchDistance > 0) {
        const scaleFactor = currentDistance / this.lastTouchDistance;
        this.handlePinchZoom(scaleFactor);
      }
      
      // Handle pan
      const deltaX = currentCenter.x - this.lastTouchCenter.x;
      const deltaY = currentCenter.y - this.lastTouchCenter.y;
      this.handleTouchPan(deltaX, deltaY);
      
      this.lastTouchDistance = currentDistance;
      this.lastTouchCenter = currentCenter;
    }
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.touches = Array.from(event.touches);
    
    if (this.touches.length < 2) {
      this.lastTouchDistance = 0;
    }
  }

  getTouchDistance() {
    if (this.touches.length < 2) return 0;
    
    const dx = this.touches[0].clientX - this.touches[1].clientX;
    const dy = this.touches[0].clientY - this.touches[1].clientY;
    
    return Math.sqrt(dx * dx + dy * dy);
  }

  getTouchCenter() {
    if (this.touches.length < 2) return { x: 0, y: 0 };
    
    return {
      x: (this.touches[0].clientX + this.touches[1].clientX) / 2,
      y: (this.touches[0].clientY + this.touches[1].clientY) / 2
    };
  }

  handlePinchZoom(scaleFactor) {
    const distance = this.controls.getDistance();
    const newDistance = distance / scaleFactor;
    
    this.controls.dollyIn(scaleFactor);
    this.controls.update();
  }

  handleTouchPan(deltaX, deltaY) {
    const panSpeed = 0.005;
    this.controls.pan(deltaX * panSpeed, deltaY * panSpeed);
    this.controls.update();
  }
}
```

This architecture provides a solid foundation for building a high-performance 3D web application with clean separation of concerns, efficient resource management, and responsive user interactions.