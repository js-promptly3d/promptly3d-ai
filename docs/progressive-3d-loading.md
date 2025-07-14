# Progressive 3D Loading Rules

You are developing a 3D web application that needs to load complex 3D content progressively for optimal user experience. Focus on Level of Detail (LOD) and streaming strategies.

## Core Progressive Loading Principles

### Loading Strategy Hierarchy
1. **Immediate**: Essential UI and basic scene setup
2. **High Priority**: Low-resolution preview models
3. **Medium Priority**: Medium-resolution models and textures
4. **Low Priority**: High-resolution models and advanced materials
5. **Background**: Prefetch upcoming content

### Performance Targets
- First meaningful paint: < 1 second
- Interactive state: < 2 seconds
- Full quality: < 5 seconds
- Smooth transitions between quality levels

## Level of Detail (LOD) Implementation

### LOD Generation Strategy
- Generate 3-4 LOD levels for complex models
- Use geometric decimation algorithms
- Maintain visual silhouette at distance
- Optimize UV mapping for each LOD level

```javascript
// LOD Manager
class LODManager {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.lodObjects = new Map();
    this.updateInterval = 16; // ~60fps
  }

  addLODObject(object, lodLevels) {
    this.lodObjects.set(object, {
      levels: lodLevels,
      currentLevel: 0,
      lastDistance: 0
    });
  }

  update() {
    this.lodObjects.forEach((lodData, object) => {
      const distance = this.camera.position.distanceTo(object.position);
      const newLevel = this.calculateLODLevel(distance, lodData.levels);
      
      if (newLevel !== lodData.currentLevel) {
        this.switchLOD(object, lodData, newLevel);
      }
    });
  }

  calculateLODLevel(distance, levels) {
    for (let i = 0; i < levels.length; i++) {
      if (distance <= levels[i].distance) {
        return i;
      }
    }
    return levels.length - 1;
  }

  switchLOD(object, lodData, newLevel) {
    const currentMesh = object.children[lodData.currentLevel];
    const newMesh = object.children[newLevel];
    
    if (currentMesh) currentMesh.visible = false;
    if (newMesh) newMesh.visible = true;
    
    lodData.currentLevel = newLevel;
  }
}
```

### Dynamic LOD Switching
- Base LOD on camera distance
- Consider view frustum and occlusion
- Account for object importance/size
- Implement smooth transitions

```javascript
// Smooth LOD transitions
class SmoothLODTransition {
  constructor(duration = 300) {
    this.duration = duration;
    this.transitions = new Map();
  }

  transitionLOD(object, fromLevel, toLevel) {
    const fromMesh = object.children[fromLevel];
    const toMesh = object.children[toLevel];
    
    if (!fromMesh || !toMesh) return;
    
    // Cross-fade between LOD levels
    this.crossFade(fromMesh, toMesh, this.duration);
  }

  crossFade(fromMesh, toMesh, duration) {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      fromMesh.material.opacity = 1 - progress;
      toMesh.material.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        fromMesh.visible = false;
        toMesh.visible = true;
        fromMesh.material.opacity = 1;
        toMesh.material.opacity = 1;
      }
    };
    
    toMesh.visible = true;
    requestAnimationFrame(animate);
  }
}
```

## Asset Streaming Strategies

### Texture Streaming
- Load low-resolution textures first
- Stream high-resolution textures on demand
- Use texture atlases for efficiency
- Implement texture caching

```javascript
// Texture streaming manager
class TextureStreamer {
  constructor() {
    this.textureCache = new Map();
    this.loadingQueue = [];
    this.maxConcurrentLoads = 4;
    this.currentLoads = 0;
  }

  async loadTexture(url, priority = 'normal') {
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url);
    }

    return new Promise((resolve, reject) => {
      this.loadingQueue.push({
        url,
        priority,
        resolve,
        reject
      });

      this.processQueue();
    });
  }

  async processQueue() {
    if (this.currentLoads >= this.maxConcurrentLoads || this.loadingQueue.length === 0) {
      return;
    }

    // Sort by priority
    this.loadingQueue.sort((a, b) => {
      const priorities = { high: 3, normal: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

    const item = this.loadingQueue.shift();
    this.currentLoads++;

    try {
      const texture = await this.loadTextureFromURL(item.url);
      this.textureCache.set(item.url, texture);
      item.resolve(texture);
    } catch (error) {
      item.reject(error);
    } finally {
      this.currentLoads--;
      this.processQueue();
    }
  }

  async loadTextureFromURL(url) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(url, resolve, undefined, reject);
    });
  }
}
```

### Geometry Streaming
- Load simplified geometry first
- Stream detailed geometry progressively
- Use compression for network efficiency
- Implement background preloading

```javascript
// Progressive geometry loader
class ProgressiveGeometryLoader {
  constructor() {
    this.geometryCache = new Map();
    this.loadingPromises = new Map();
  }

  async loadGeometry(baseUrl, lodLevel = 0) {
    const url = `${baseUrl}_lod${lodLevel}.json`;
    
    if (this.geometryCache.has(url)) {
      return this.geometryCache.get(url);
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }

    const promise = this.loadGeometryFromURL(url);
    this.loadingPromises.set(url, promise);

    try {
      const geometry = await promise;
      this.geometryCache.set(url, geometry);
      return geometry;
    } finally {
      this.loadingPromises.delete(url);
    }
  }

  async loadGeometryFromURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2));
    
    if (data.indices) {
      geometry.setIndex(data.indices);
    }

    return geometry;
  }
}
```

## Progressive Material Loading

### Material Quality Levels
- Basic: Diffuse color only
- Standard: Diffuse + normal maps
- Advanced: Full PBR with all maps
- Premium: High-resolution + additional effects

```javascript
// Progressive material system
class ProgressiveMaterial {
  constructor(baseColor = 0x808080) {
    this.baseColor = baseColor;
    this.materials = new Map();
    this.currentQuality = 'basic';
  }

  async loadQuality(quality) {
    if (this.materials.has(quality)) {
      return this.materials.get(quality);
    }

    let material;
    switch (quality) {
      case 'basic':
        material = new THREE.MeshBasicMaterial({ color: this.baseColor });
        break;
      case 'standard':
        material = await this.loadStandardMaterial();
        break;
      case 'advanced':
        material = await this.loadAdvancedMaterial();
        break;
      case 'premium':
        material = await this.loadPremiumMaterial();
        break;
    }

    this.materials.set(quality, material);
    return material;
  }

  async loadStandardMaterial() {
    const material = new THREE.MeshStandardMaterial({ color: this.baseColor });
    
    // Load textures progressively
    try {
      const diffuseTexture = await this.loadTexture('diffuse.jpg');
      material.map = diffuseTexture;
      
      const normalTexture = await this.loadTexture('normal.jpg');
      material.normalMap = normalTexture;
    } catch (error) {
      console.warn('Failed to load standard material textures:', error);
    }

    return material;
  }

  async upgradeToQuality(mesh, quality) {
    const newMaterial = await this.loadQuality(quality);
    
    // Smooth transition between materials
    this.transitionMaterial(mesh, mesh.material, newMaterial);
    this.currentQuality = quality;
  }

  transitionMaterial(mesh, oldMaterial, newMaterial) {
    // Implement smooth material transition
    // This could involve opacity fading or other effects
    mesh.material = newMaterial;
  }
}
```

## Loading Progress and User Feedback

### Progress Tracking
- Track loading progress for each asset type
- Provide meaningful progress updates
- Show estimated time remaining
- Handle loading errors gracefully

```javascript
// Loading progress manager
class LoadingProgressManager {
  constructor() {
    this.totalItems = 0;
    this.loadedItems = 0;
    this.loadingStages = new Map();
    this.callbacks = [];
  }

  addStage(name, itemCount) {
    this.loadingStages.set(name, {
      total: itemCount,
      loaded: 0,
      startTime: Date.now()
    });
    this.totalItems += itemCount;
  }

  updateProgress(stageName, increment = 1) {
    const stage = this.loadingStages.get(stageName);
    if (stage) {
      stage.loaded += increment;
      this.loadedItems += increment;
      
      this.notifyProgress();
    }
  }

  notifyProgress() {
    const progress = this.loadedItems / this.totalItems;
    const remainingTime = this.estimateRemainingTime();
    
    this.callbacks.forEach(callback => {
      callback({
        progress,
        remainingTime,
        stage: this.getCurrentStage()
      });
    });
  }

  estimateRemainingTime() {
    const elapsed = Date.now() - this.startTime;
    const rate = this.loadedItems / elapsed;
    const remaining = this.totalItems - this.loadedItems;
    
    return remaining / rate;
  }

  onProgress(callback) {
    this.callbacks.push(callback);
  }
}
```

### User Interface Elements
- Loading bars with stage information
- Preview thumbnails during loading
- Error recovery options
- Quality level indicators

```javascript
// Loading UI controller
class LoadingUI {
  constructor() {
    this.progressBar = document.getElementById('loading-progress');
    this.stageText = document.getElementById('loading-stage');
    this.previewContainer = document.getElementById('preview-container');
  }

  updateProgress(data) {
    this.progressBar.style.width = `${data.progress * 100}%`;
    this.stageText.textContent = `Loading ${data.stage}...`;
    
    if (data.remainingTime) {
      this.stageText.textContent += ` (${Math.round(data.remainingTime/1000)}s remaining)`;
    }
  }

  showPreview(previewData) {
    const img = document.createElement('img');
    img.src = previewData.thumbnail;
    img.alt = previewData.name;
    this.previewContainer.appendChild(img);
  }

  hideLoading() {
    this.progressBar.parentElement.style.display = 'none';
  }
}
```

## Performance Optimization

### Memory Management
- Unload unused LOD levels
- Implement texture garbage collection
- Monitor memory usage continuously
- Use object pooling for frequent operations

### Network Optimization
- Implement asset bundling strategies
- Use HTTP/2 server push for critical assets
- Implement intelligent prefetching
- Use service workers for caching

### Quality Adaptation
- Monitor frame rate and adjust quality
- Implement thermal throttling detection
- Use performance observers
- Provide manual quality controls

```javascript
// Adaptive quality system
class AdaptiveQuality {
  constructor() {
    this.targetFPS = 60;
    this.currentFPS = 60;
    this.qualityLevel = 'high';
    this.frameHistory = [];
  }

  updateFPS(deltaTime) {
    this.currentFPS = 1000 / deltaTime;
    this.frameHistory.push(this.currentFPS);
    
    if (this.frameHistory.length > 60) {
      this.frameHistory.shift();
    }

    this.checkQualityAdjustment();
  }

  checkQualityAdjustment() {
    const avgFPS = this.frameHistory.reduce((a, b) => a + b, 0) / this.frameHistory.length;
    
    if (avgFPS < this.targetFPS * 0.8 && this.qualityLevel !== 'low') {
      this.reduceQuality();
    } else if (avgFPS > this.targetFPS * 0.95 && this.qualityLevel !== 'high') {
      this.increaseQuality();
    }
  }

  reduceQuality() {
    const levels = ['high', 'medium', 'low'];
    const currentIndex = levels.indexOf(this.qualityLevel);
    if (currentIndex < levels.length - 1) {
      this.qualityLevel = levels[currentIndex + 1];
      this.applyQualitySettings();
    }
  }

  increaseQuality() {
    const levels = ['high', 'medium', 'low'];
    const currentIndex = levels.indexOf(this.qualityLevel);
    if (currentIndex > 0) {
      this.qualityLevel = levels[currentIndex - 1];
      this.applyQualitySettings();
    }
  }

  applyQualitySettings() {
    // Apply quality settings to renderer, materials, etc.
    console.log(`Quality adjusted to: ${this.qualityLevel}`);
  }
}
```

## Development Guidelines

### Best Practices
- Always provide fallback options
- Test on various network conditions
- Implement error recovery mechanisms
- Use progressive enhancement principles

### Performance Budgets
- Initial load: 500KB max
- LOD transition: 16ms max
- Texture streaming: 100ms max
- Full quality load: 5s max

### Quality Levels
- Low: 10k vertices, 512px textures
- Medium: 25k vertices, 1024px textures
- High: 50k vertices, 2048px textures
- Ultra: 100k vertices, 4096px textures

Remember: Progressive loading is about perceived performance, not just actual performance. Users should always feel like something is happening.