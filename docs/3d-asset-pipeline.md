# 3D Asset Pipeline Rules

You are developing a 3D web application that needs to efficiently load, process, and display 3D assets. Focus on GLTF/GLB format and optimize for web delivery.

## Asset Format Standards

### Primary Format: GLTF/GLB
- Use GLTF 2.0 as the primary 3D format
- Prefer GLB (binary) for production (smaller file sizes)
- Use GLTF (JSON) for development (human-readable)
- Always validate GLTF files before deployment

```javascript
// GLTF Loader with error handling
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load(
  'model.glb',
  (gltf) => {
    scene.add(gltf.scene);
  },
  (progress) => {
    console.log('Loading progress:', progress);
  },
  (error) => {
    console.error('Loading error:', error);
  }
);
```

### Texture Formats
- Use WebP for textures when supported
- Fallback to PNG for transparency, JPEG for opaque
- Implement KTX2 for advanced compression
- Use power-of-2 textures for better GPU compatibility

## Model Optimization

### Geometry Optimization
- Target 10k-50k vertices for hero models
- Use decimation algorithms for LOD generation
- Merge similar materials to reduce draw calls
- Use indexed geometry for vertex reuse

```javascript
// Geometry analysis
function analyzeGeometry(geometry) {
  const vertices = geometry.attributes.position.count;
  const faces = geometry.index ? geometry.index.count / 3 : vertices / 3;
  
  console.log(`Vertices: ${vertices}, Faces: ${faces}`);
  
  if (vertices > 100000) {
    console.warn('High vertex count, consider optimization');
  }
}
```

### Material Optimization
- Use PBR materials for realistic rendering
- Combine textures into atlases when possible
- Implement material variants for different quality levels
- Use vertex colors for simple coloring

```javascript
// Material atlas creation
function createMaterialAtlas(materials) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Combine textures into atlas
  // Return new material with atlas texture
}
```

### Texture Optimization
- Maximum texture size: 2048x2048 for mobile
- Use texture compression (ETC1, ASTC, DXT)
- Implement mipmaps for distant objects
- Use normal map compression techniques

## Asset Loading Strategies

### Progressive Loading
- Load low-resolution models first
- Stream high-resolution assets on demand
- Implement background asset preloading
- Use service workers for asset caching

```javascript
// Progressive model loading
class ProgressiveLoader {
  async loadModel(url) {
    // Load low-res version first
    const lowRes = await this.loadLOD(url, 'low');
    scene.add(lowRes);
    
    // Load high-res in background
    const highRes = await this.loadLOD(url, 'high');
    scene.remove(lowRes);
    scene.add(highRes);
  }
}
```

### Compression Strategies
- Use Draco compression for geometry
- Implement texture compression pipelines
- Use mesh quantization for smaller files
- Apply lossy compression judiciously

```javascript
// Draco compression
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
gltfLoader.setDRACOLoader(dracoLoader);
```

## Asset Processing Pipeline

### Build-Time Processing
- Optimize models during build process
- Generate multiple LOD levels automatically
- Create texture atlases and compressions
- Validate asset integrity

```javascript
// Build-time optimization script
const assetProcessor = {
  processModel: async (inputPath, outputPath) => {
    // Load original model
    // Apply optimizations
    // Generate LOD levels
    // Save optimized versions
  }
};
```

### Runtime Processing
- Implement dynamic LOD switching
- Use geometry instancing for repeated objects
- Apply real-time optimization based on performance
- Implement adaptive quality settings

## Memory Management

### Asset Lifecycle
- Load assets on-demand
- Dispose of unused assets promptly
- Implement asset reference counting
- Use weak references for cached assets

```javascript
// Asset manager with lifecycle
class AssetManager {
  constructor() {
    this.assets = new Map();
    this.references = new Map();
  }
  
  async loadAsset(url) {
    if (this.assets.has(url)) {
      this.references.set(url, this.references.get(url) + 1);
      return this.assets.get(url);
    }
    
    const asset = await this.loadFromUrl(url);
    this.assets.set(url, asset);
    this.references.set(url, 1);
    return asset;
  }
  
  releaseAsset(url) {
    const refs = this.references.get(url) - 1;
    this.references.set(url, refs);
    
    if (refs === 0) {
      const asset = this.assets.get(url);
      this.disposeAsset(asset);
      this.assets.delete(url);
      this.references.delete(url);
    }
  }
}
```

### GPU Memory Optimization
- Monitor texture memory usage
- Implement texture streaming
- Use texture compression formats
- Implement garbage collection for GPU resources

## Asset Validation

### Quality Assurance
- Validate GLTF structure and extensions
- Check texture resolution and formats
- Verify material properties
- Test loading performance

```javascript
// Asset validation
function validateGLTF(gltf) {
  const issues = [];
  
  // Check for missing textures
  gltf.scene.traverse((child) => {
    if (child.material) {
      const material = child.material;
      if (material.map && !material.map.image) {
        issues.push(`Missing texture for material: ${material.name}`);
      }
    }
  });
  
  return issues;
}
```

### Performance Testing
- Measure loading times
- Profile memory usage
- Test on various devices
- Validate frame rate impact

## CDN and Delivery

### Asset Distribution
- Use CDN for asset delivery
- Implement geographic distribution
- Use appropriate cache headers
- Consider edge computing for processing

```javascript
// CDN asset loading
const CDN_BASE = 'https://cdn.promptly3d.ai/assets/';

function getAssetUrl(filename) {
  return `${CDN_BASE}${filename}`;
}
```

### Compression and Encoding
- Use Brotli compression for text-based assets
- Implement progressive JPEG for textures
- Use WebP with fallbacks
- Consider AVIF for next-gen browsers

## Development Guidelines

### Asset Creation Standards
- Model dimensions: Use meters as base unit
- Texture resolution: Power-of-2 sizes preferred
- Material naming: Use descriptive, consistent names
- UV mapping: Minimize texture stretching

### File Organization
- Separate models by complexity level
- Group related assets in folders
- Use consistent naming conventions
- Maintain asset metadata

```
assets/
├── models/
│   ├── low/
│   ├── medium/
│   └── high/
├── textures/
│   ├── diffuse/
│   ├── normal/
│   └── rough/
└── materials/
    └── pbr/
```

### Version Control
- Use Git LFS for large assets
- Implement asset versioning
- Track asset dependencies
- Maintain changelog for assets

## Performance Budgets

### File Size Limits
- Individual model: 5MB max
- Texture atlas: 2MB max
- Total scene assets: 50MB max
- Loading time: 3 seconds max

### Quality Levels
- High: Desktop, high-end mobile
- Medium: Mid-range mobile
- Low: Low-end mobile, fallback

Remember: The asset pipeline is critical for performance. Always optimize for the web, not for offline rendering.