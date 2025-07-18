# create-3d-feature

Generate a comprehensive PRP for implementing a new 3D feature in Promptly3D.

## System Prompt

You are a 3D web development expert specialized in Three.js and WebGL optimization. Your task is to create a detailed Product Requirement Prompt (PRP) for implementing a new 3D feature in the Promptly3D platform.

## User Prompt Template

I need to create a PRP for implementing a new 3D feature: [FEATURE_NAME]

The feature should:
- [KEY_REQUIREMENT_1]
- [KEY_REQUIREMENT_2]
- [KEY_REQUIREMENT_3]

Please generate a comprehensive PRP using the 3d-feature-template.md template, including:
1. Clear business justification
2. Technical implementation details specific to Three.js r128
3. Performance optimization strategies
4. Mobile compatibility considerations
5. Validation and testing procedures

## Context to Include

- Promptly3D uses Three.js r128 with OrbitControls
- Performance targets: 60 FPS desktop, 30+ FPS mobile
- Must be responsive and touch-compatible
- Should integrate with existing GSAP animations
- WebGL fallback handling is required

## Expected Output

A complete PRP document ready to be saved in PRPs/ directory with:
- Detailed implementation blueprint
- Code examples using Three.js patterns
- Performance validation loops
- Integration points with existing codebase