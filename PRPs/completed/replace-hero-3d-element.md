# Replace Hero 3D Element with Manufacturing-Focused Part

> Task to replace the current gear 3D model with a more manufacturing-relevant part from the shared drive

## Goal
Replace the current purple gear in the hero section with a more representative manufacturing part that better demonstrates the platform's capabilities for production-ready designs.

## Why
- Current gear is generic and doesn't showcase advanced manufacturing features
- Need to demonstrate complex geometries, tolerances, and DFM considerations
- Should reflect real-world manufacturing use cases
- Visual should align with new manufacturing-focused messaging

## Implementation Tasks

```yaml
context:
  patterns:
    - file: script.js
      copy: Current 3D implementation using Three.js
    - file: style.css
      copy: 3D viewer styling

  gotchas:
    - issue: "Model needs to work as fallback when GLTF fails"
      fix: "Keep procedural generation option for robustness"
    - issue: "Shared drive models need to be accessible"
      fix: "Will need user to provide specific model file"
```

### Task List

```
PREPARATION - User Action Required:
  - USER_PROVIDES: Path to chosen 3D model from shared drive
  - ACCEPTABLE_FORMATS: .glb, .gltf, .obj (with .mtl), or specifications for procedural generation
  - SUGGESTED_PARTS: 
    - Precision machined bracket with tolerances
    - Injection molded housing with draft angles
    - Sheet metal assembly with bends
    - Complex aerospace component

UPDATE script.js model loading:
  - FIND: loader.load('models/example.glb',
  - REPLACE: loader.load('models/manufacturing-bracket.glb',
  - NOTE: Update path based on user-provided model
  - VALIDATE: File exists at specified path

UPDATE script.js fallback model:
  - FIND: createShowpieceRealisticGear() {
  - REPLACE_ENTIRE_FUNCTION with manufacturing part:
    ```javascript
    createManufacturingShowpiece() {
        this.model = new THREE.Group();
        
        // Material for manufacturing part - professional metallic finish
        const partMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B8C8D, // Industrial gray/silver
            metalness: 0.9,
            roughness: 0.1,
            envMapIntensity: 0.8
        });
        
        // Create complex bracket with mounting features
        this.createBracketBody(partMaterial);
        this.createMountingBosses(partMaterial);
        this.createRibbingStructure(partMaterial);
        this.createThreadedInserts(partMaterial);
        this.addTechnicalAnnotations();
        
        // Position and scale
        this.model.scale.set(0.8, 0.8, 0.8);
        this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
    }
    ```
  - VALIDATE: grep -n "createManufacturingShowpiece" script.js

ADD new bracket creation functions:
  - LOCATION: After createManufacturingShowpiece function
  - ADD:
    ```javascript
    createBracketBody(material) {
        // Main L-shaped bracket body
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(2, 0);
        shape.lineTo(2, 0.3);
        shape.lineTo(0.3, 0.3);
        shape.lineTo(0.3, 2);
        shape.lineTo(0, 2);
        shape.closePath();
        
        const extrudeSettings = {
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 3
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const bracket = new THREE.Mesh(geometry, material);
        bracket.rotation.y = Math.PI / 4;
        bracket.position.set(-1, -0.5, 0);
        bracket.castShadow = true;
        bracket.receiveShadow = true;
        this.model.add(bracket);
    }
    
    createMountingBosses(material) {
        const bossGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 16);
        const positions = [
            { x: 0.5, y: -0.3, z: 0.5 },
            { x: -0.5, y: -0.3, z: 0.5 },
            { x: 0.5, y: -0.3, z: -0.5 },
            { x: -0.5, y: -0.3, z: -0.5 }
        ];
        
        positions.forEach(pos => {
            const boss = new THREE.Mesh(bossGeometry, material);
            boss.position.set(pos.x, pos.y, pos.z);
            boss.castShadow = true;
            this.model.add(boss);
        });
    }
    ```
  - VALIDATE: grep -n "createBracketBody" script.js

UPDATE script.js function calls:
  - FIND: this.createShowpieceRealisticGear();
  - REPLACE: this.createManufacturingShowpiece();
  - VALIDATE: grep -n "createManufacturingShowpiece();" script.js

UPDATE viewer info text:
  - FIND: <span class="info-badge">Live 3D Preview</span>
  - REPLACE: <span class="info-badge">Production-Ready Part</span>
  - VALIDATE: grep -n "Production-Ready Part" index.html

ADD technical overlays (optional):
  - CREATE: CSS for dimension lines and callouts
  - ADD to style.css:
    ```css
    .technical-annotation {
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-family: 'Courier New', monospace;
      pointer-events: none;
    }
    
    .dimension-line {
      position: absolute;
      border-top: 1px solid #8a2be2;
      height: 1px;
    }
    ```
  - VALIDATE: grep -n "technical-annotation" style.css

ALTERNATIVE - Use Provided Model:
  - COPY: User's provided model to /models/manufacturing-hero.glb
  - UPDATE: Model path in script.js
  - TEST: Model loads correctly in browser
  - ADJUST: Scale and position as needed
```

## User Action Required

Before implementing this PRP, the user needs to:
1. Select a manufacturing part from their shared drive
2. Provide either:
   - The 3D model file (.glb preferred)
   - Specifications for procedural generation
   - Reference images for recreation

## Validation Checklist

- [ ] New model loads successfully
- [ ] Fallback procedural model works if loading fails
- [ ] Model represents manufacturing complexity
- [ ] Performance remains smooth (60 FPS)
- [ ] Mobile rendering still functional
- [ ] Model aligns with manufacturing messaging
- [ ] Professional appearance maintained