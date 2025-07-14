# Interactive 3D UI Rules

You are developing interactive 3D UI components for a CAD-like web application. Focus on intuitive manipulation tools, gizmos, and selection patterns similar to zoo.dev/text-to-cad.

## Core Interaction Principles

### 3D Manipulation Fundamentals
- Direct manipulation should feel natural and responsive
- Provide immediate visual feedback for all interactions
- Use consistent interaction patterns across all tools
- Implement undo/redo for all operations

### Universal Interaction Patterns
- **Hover**: Highlight objects and show interaction hints
- **Click**: Select objects and activate tools
- **Drag**: Move, rotate, or scale objects
- **Double-click**: Enter edit mode or focus view
- **Right-click**: Context menus with relevant actions

## Selection System

### Object Selection
- Single selection: Click on object
- Multi-selection: Ctrl+click or selection box
- Hierarchical selection: Support parent/child relationships
- Smart selection: Prioritize face > edge > vertex

```javascript
// Selection manager
class SelectionManager {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = new THREE.Raycaster();
    this.selectedObjects = new Set();
    this.hoveredObject = null;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.renderer.domElement.addEventListener('click', (event) => {
      this.handleClick(event);
    });
    
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });
  }

  handleClick(event) {
    const mouse = this.getMousePosition(event);
    this.raycaster.setFromCamera(mouse, this.camera);
    
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
    if (intersects.length > 0) {
      const object = intersects[0].object;
      
      if (event.ctrlKey || event.metaKey) {
        this.toggleSelection(object);
      } else {
        this.selectObject(object);
      }
    } else {
      this.clearSelection();
    }
  }

  selectObject(object) {
    this.clearSelection();
    this.selectedObjects.add(object);
    this.highlightObject(object, 'selected');
    this.dispatchSelectionEvent();
  }

  toggleSelection(object) {
    if (this.selectedObjects.has(object)) {
      this.selectedObjects.delete(object);
      this.removeHighlight(object);
    } else {
      this.selectedObjects.add(object);
      this.highlightObject(object, 'selected');
    }
    this.dispatchSelectionEvent();
  }

  highlightObject(object, type) {
    const originalMaterial = object.material;
    const highlightMaterial = this.getHighlightMaterial(type);
    
    object.userData.originalMaterial = originalMaterial;
    object.material = highlightMaterial;
  }

  getHighlightMaterial(type) {
    const materials = {
      selected: new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }),
      hover: new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.3 })
    };
    
    return materials[type] || materials.selected;
  }
}
```

### Visual Selection Feedback
- Outline shader for selected objects
- Different colors for hover vs selected states
- Bounding box visualization
- Selection count indicator

```javascript
// Selection outline shader
const outlineVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const outlineFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 outlineColor;
  uniform float outlineWidth;
  
  void main() {
    float edge = dot(vNormal, normalize(-vPosition));
    if (edge < outlineWidth) {
      gl_FragColor = vec4(outlineColor, 1.0);
    } else {
      discard;
    }
  }
`;
```

## Transformation Gizmos

### Translation Gizmo
- 3D arrows for X, Y, Z axes
- Plane handles for XY, XZ, YZ movement
- Screen-space movement option
- Constrained movement with snap-to-grid

```javascript
// Translation gizmo implementation
class TranslationGizmo {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.gizmoGroup = new THREE.Group();
    this.activeAxis = null;
    this.isDragging = false;
    
    this.createGizmo();
    this.setupInteraction();
  }

  createGizmo() {
    const gizmoSize = 1;
    const arrowLength = gizmoSize * 0.8;
    const arrowHeadSize = gizmoSize * 0.2;
    
    // X-axis (red)
    const xArrow = this.createArrow(0xff0000, arrowLength);
    xArrow.rotateZ(-Math.PI / 2);
    xArrow.userData.axis = 'x';
    this.gizmoGroup.add(xArrow);
    
    // Y-axis (green)
    const yArrow = this.createArrow(0x00ff00, arrowLength);
    yArrow.userData.axis = 'y';
    this.gizmoGroup.add(yArrow);
    
    // Z-axis (blue)
    const zArrow = this.createArrow(0x0000ff, arrowLength);
    zArrow.rotateX(Math.PI / 2);
    zArrow.userData.axis = 'z';
    this.gizmoGroup.add(zArrow);
    
    // Plane handles
    this.createPlaneHandles();
    
    this.scene.add(this.gizmoGroup);
  }

  createArrow(color, length) {
    const group = new THREE.Group();
    
    // Arrow shaft
    const shaftGeometry = new THREE.CylinderGeometry(0.02, 0.02, length * 0.8);
    const shaftMaterial = new THREE.MeshBasicMaterial({ color });
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    shaft.position.y = length * 0.4;
    group.add(shaft);
    
    // Arrow head
    const headGeometry = new THREE.ConeGeometry(0.08, length * 0.2);
    const headMaterial = new THREE.MeshBasicMaterial({ color });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = length * 0.9;
    group.add(head);
    
    return group;
  }

  createPlaneHandles() {
    const planeSize = 0.2;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    
    // XY plane (blue)
    const xyPlane = new THREE.Mesh(planeGeometry, 
      new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.3 }));
    xyPlane.position.set(planeSize/2, planeSize/2, 0);
    xyPlane.userData.plane = 'xy';
    this.gizmoGroup.add(xyPlane);
    
    // XZ plane (green)
    const xzPlane = new THREE.Mesh(planeGeometry, 
      new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.3 }));
    xzPlane.rotateX(-Math.PI / 2);
    xzPlane.position.set(planeSize/2, 0, planeSize/2);
    xzPlane.userData.plane = 'xz';
    this.gizmoGroup.add(xzPlane);
    
    // YZ plane (red)
    const yzPlane = new THREE.Mesh(planeGeometry, 
      new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.3 }));
    yzPlane.rotateY(Math.PI / 2);
    yzPlane.position.set(0, planeSize/2, planeSize/2);
    yzPlane.userData.plane = 'yz';
    this.gizmoGroup.add(yzPlane);
  }

  setupInteraction() {
    this.renderer.domElement.addEventListener('mousedown', (event) => {
      this.handleMouseDown(event);
    });
    
    this.renderer.domElement.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });
    
    this.renderer.domElement.addEventListener('mouseup', (event) => {
      this.handleMouseUp(event);
    });
  }

  handleMouseDown(event) {
    const mouse = this.getMousePosition(event);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    
    const intersects = raycaster.intersectObjects(this.gizmoGroup.children, true);
    
    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.activeAxis = object.userData.axis || object.userData.plane;
      this.isDragging = true;
      this.dragStart = intersects[0].point;
    }
  }

  handleMouseMove(event) {
    if (!this.isDragging || !this.activeAxis) return;
    
    const mouse = this.getMousePosition(event);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    
    // Calculate movement delta based on active axis/plane
    const movement = this.calculateMovement(raycaster, this.activeAxis);
    this.applyMovement(movement);
  }

  calculateMovement(raycaster, constraint) {
    // Implementation depends on constraint type (axis or plane)
    // Return movement vector
  }

  applyMovement(movement) {
    // Apply movement to selected objects
    // Update gizmo position
  }
}
```

### Rotation Gizmo
- Circular handles for each axis
- Screen-space rotation option
- Angle snapping (15°, 30°, 45°, 90°)
- Visual angle indicator

### Scale Gizmo
- Corner handles for uniform scaling
- Axis handles for non-uniform scaling
- Proportional scaling option
- Scale value display

## Context Menus and Tool Panels

### 3D Context Menu
- Position context menu in 3D space
- Show relevant actions based on selection
- Animated appearance/disappearance
- Touch-friendly sizing

```javascript
// 3D Context Menu
class Context3DMenu {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.menuGroup = null;
    this.isVisible = false;
  }

  show(position, actions) {
    this.hide(); // Hide existing menu
    
    this.menuGroup = new THREE.Group();
    this.menuGroup.position.copy(position);
    
    // Create menu background
    const menuBg = this.createMenuBackground(actions.length);
    this.menuGroup.add(menuBg);
    
    // Create menu items
    actions.forEach((action, index) => {
      const menuItem = this.createMenuItem(action, index);
      this.menuGroup.add(menuItem);
    });
    
    // Always face camera
    this.menuGroup.lookAt(this.camera.position);
    
    this.scene.add(this.menuGroup);
    this.isVisible = true;
    
    // Animate appearance
    this.animateIn();
  }

  createMenuItem(action, index) {
    const group = new THREE.Group();
    
    // Create text sprite
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = '#ffffff';
    context.font = '24px Arial';
    context.fillText(action.label, 10, 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(2, 0.5, 1);
    sprite.position.y = -index * 0.6;
    
    sprite.userData.action = action;
    group.add(sprite);
    
    return group;
  }

  hide() {
    if (this.menuGroup) {
      this.scene.remove(this.menuGroup);
      this.menuGroup = null;
      this.isVisible = false;
    }
  }

  animateIn() {
    if (!this.menuGroup) return;
    
    this.menuGroup.scale.set(0, 0, 0);
    
    const animate = () => {
      this.menuGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      
      if (this.menuGroup.scale.x < 0.99) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
}
```

### Floating Tool Panels
- Contextual tool panels
- Draggable and resizable
- Auto-hide when not in use
- Keyboard shortcuts

```javascript
// Floating UI Panel
class FloatingPanel {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.element = null;
    this.isDragging = false;
    this.isVisible = false;
    
    this.create();
  }

  create() {
    this.element = document.createElement('div');
    this.element.className = 'floating-panel';
    this.element.style.cssText = `
      position: absolute;
      background: rgba(40, 40, 40, 0.95);
      border: 1px solid #555;
      border-radius: 8px;
      padding: 0;
      min-width: 200px;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      z-index: 1000;
      display: none;
    `;
    
    // Create header
    const header = document.createElement('div');
    header.className = 'panel-header';
    header.style.cssText = `
      background: #333;
      color: white;
      padding: 10px;
      border-radius: 8px 8px 0 0;
      cursor: move;
      user-select: none;
      font-weight: bold;
    `;
    header.textContent = this.title;
    
    // Create content area
    const contentArea = document.createElement('div');
    contentArea.className = 'panel-content';
    contentArea.style.cssText = `
      padding: 15px;
      color: white;
      max-height: 400px;
      overflow-y: auto;
    `;
    contentArea.innerHTML = this.content;
    
    this.element.appendChild(header);
    this.element.appendChild(contentArea);
    
    // Setup dragging
    this.setupDragging(header);
    
    document.body.appendChild(this.element);
  }

  setupDragging(header) {
    let offsetX, offsetY;
    
    header.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      offsetX = e.clientX - this.element.offsetLeft;
      offsetY = e.clientY - this.element.offsetTop;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    
    const onMouseMove = (e) => {
      if (!this.isDragging) return;
      
      this.element.style.left = (e.clientX - offsetX) + 'px';
      this.element.style.top = (e.clientY - offsetY) + 'px';
    };
    
    const onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }

  show(x = 100, y = 100) {
    this.element.style.display = 'block';
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    this.isVisible = true;
  }

  hide() {
    this.element.style.display = 'none';
    this.isVisible = false;
  }

  updateContent(newContent) {
    const contentArea = this.element.querySelector('.panel-content');
    contentArea.innerHTML = newContent;
  }
}
```

## Measurement Tools

### Distance Measurement
- Click two points to measure distance
- Real-time measurement preview
- Multiple measurement modes (straight, arc, surface)
- Unit conversion support

### Angle Measurement
- Three-point angle measurement
- Protractor-style visualization
- Degree and radian display
- Reference angle indicators

### Area and Volume Calculation
- Surface area calculation
- Volume calculation for closed meshes
- Cross-sectional area analysis
- Material property integration

## Touch and Mobile Support

### Touch Gestures
- Single touch: Selection and hover
- Two-finger pinch: Zoom
- Two-finger pan: Camera movement
- Three-finger rotation: Camera orbit

### Mobile UI Adaptations
- Larger touch targets
- Gesture-based shortcuts
- Simplified tool panels
- Voice commands integration

## Accessibility Features

### Keyboard Navigation
- Tab navigation through 3D objects
- Keyboard shortcuts for all tools
- Focus indicators in 3D space
- Screen reader support

### Visual Accessibility
- High contrast mode
- Colorblind-friendly palettes
- Adjustable UI scaling
- Motion reduction options

```javascript
// Accessibility helper
class AccessibilityHelper {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.focusedObject = null;
    this.keyboardMode = false;
    
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        this.navigateToNext();
      } else if (event.key === 'Enter') {
        this.activateFocusedObject();
      } else if (event.key === 'Escape') {
        this.exitKeyboardMode();
      }
    });
  }

  navigateToNext() {
    this.keyboardMode = true;
    const objects = this.getInteractiveObjects();
    
    if (objects.length === 0) return;
    
    const currentIndex = objects.indexOf(this.focusedObject);
    const nextIndex = (currentIndex + 1) % objects.length;
    
    this.focusObject(objects[nextIndex]);
  }

  focusObject(object) {
    if (this.focusedObject) {
      this.removeFocusIndicator(this.focusedObject);
    }
    
    this.focusedObject = object;
    this.addFocusIndicator(object);
    
    // Announce to screen reader
    this.announceObject(object);
  }

  addFocusIndicator(object) {
    // Add visual focus indicator
    const indicator = new THREE.BoxHelper(object, 0x00ffff);
    indicator.name = 'focus-indicator';
    this.scene.add(indicator);
  }

  announceObject(object) {
    const announcement = `Focused on ${object.userData.name || 'object'}`;
    this.speak(announcement);
  }

  speak(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }
}
```

## Performance Considerations

### UI Optimization
- Use object pooling for frequently created UI elements
- Implement UI element culling
- Use efficient event delegation
- Minimize DOM manipulation

### Rendering Optimization
- Separate UI render pass
- Use instanced rendering for repeated UI elements
- Implement UI level-of-detail
- Cache rendered UI elements

### Memory Management
- Dispose of UI resources properly
- Use weak references for event listeners
- Implement UI garbage collection
- Monitor memory usage

Remember: 3D UI should enhance the user experience, not overwhelm it. Keep interactions intuitive and provide clear visual feedback for all actions.