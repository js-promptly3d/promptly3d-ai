# Refocus Content Toward Manufacturing Audience

> Task to update messaging and examples to target manufacturing professionals over hobbyists

## Goal
Shift website content to appeal primarily to manufacturing professionals, engineers, and industrial designers while maintaining accessibility for makers as a secondary audience.

## Why
- Manufacturing professionals have higher budgets and more frequent needs
- Establishing credibility with manufacturers will attract makers naturally
- B2B manufacturing focus aligns with sustainable business model
- Professional use cases demonstrate platform capabilities better

## Implementation Tasks

```yaml
context:
  patterns:
    - file: index.html
      copy: Current messaging and examples
    - file: style.css
      copy: Visual styling for professional appearance

  gotchas:
    - issue: "Don't alienate makers completely"
      fix: "Keep language accessible while using professional examples"
```

### Task List

```
UPDATE index.html meta description:
  - FIND: <meta name="description" content="Transform your ideas into manufacturable 3D designs using natural language. No CAD skills required.">
  - REPLACE: <meta name="description" content="AI-powered CAD platform for manufacturing professionals. Generate production-ready parts from specifications in minutes.">
  - VALIDATE: grep -n "meta name=\"description\"" index.html

UPDATE index.html hero section:
  - FIND: <h1 class="hero-title">Transform Ideas Into Reality</h1>
  - REPLACE: <h1 class="hero-title">Manufacturing-Ready CAD in Minutes</h1>
  - VALIDATE: grep -n "hero-title" index.html

UPDATE index.html hero subtitle:
  - FIND: <p class="hero-subtitle">From concept to creation in minutes. Describe your vision in plain language, and watch as AI transforms it into precision-engineered 3D models ready for manufacturing.</p>
  - REPLACE: <p class="hero-subtitle">Generate production-ready parts from engineering specifications. Our AI understands tolerances, materials, and manufacturing constraints to deliver DFM-optimized designs instantly.</p>
  - VALIDATE: grep -n "hero-subtitle" index.html

UPDATE index.html feature examples:
  - FIND: "Create a phone stand that holds at 45 degrees with a slot for charging cable"
  - REPLACE: "Design a bracket with M8 mounting holes, 5mm wall thickness, supporting 50kg load"
  - VALIDATE: grep -n "Design a bracket" index.html

UPDATE index.html user type options:
  - FIND: <option value="user">I'm a User</option>
  - REPLACE: <option value="engineer">I'm an Engineer</option>
  - FIND: <option value="vendor">I'm a Vendor</option>
  - REPLACE: <option value="manufacturer">I'm a Manufacturer</option>
  - VALIDATE: grep -n "option value=" index.html

UPDATE index.html feature list items:
  - FIND: <li>Voice and text input support</li>
  - REPLACE: <li>Import engineering drawings and specifications</li>
  - FIND: <li>Multi-language support</li>
  - REPLACE: <li>Industry-standard file formats (STEP, IGES, STL)</li>
  - VALIDATE: grep -n "Import engineering" index.html

UPDATE index.html AI features:
  - FIND: <li>Automatic tolerances and clearances</li>
  - REPLACE: <li>GD&T compliance and tolerance stack-up analysis</li>
  - FIND: <li>Material-specific optimization</li>
  - REPLACE: <li>Design for Manufacturing (DFM) validation</li>
  - FIND: <li>Structural analysis integration</li>
  - REPLACE: <li>FEA-ready mesh generation with load cases</li>
  - VALIDATE: grep -n "GD&T compliance" index.html

UPDATE index.html refinement examples:
  - FIND: <div class="chat-message user">Make the walls 20% thicker</div>
  - REPLACE: <div class="chat-message user">Increase wall thickness to meet injection molding requirements</div>
  - FIND: <div class="chat-message user">Add mounting holes on the back</div>
  - REPLACE: <div class="chat-message user">Add ISO 4762 M5x20 counterbore pattern</div>
  - VALIDATE: grep -n "injection molding" index.html

UPDATE index.html step descriptions:
  - FIND: <p class="step-description">Use natural language to describe what you want. Upload sketches or reference images for additional context.</p>
  - REPLACE: <p class="step-description">Input specifications, load requirements, and constraints. Import technical drawings or existing CAD files for reference.</p>
  - VALIDATE: grep -n "Input specifications" index.html

UPDATE index.html manufacture step:
  - FIND: <p class="step-description">Download files for any manufacturing method or connect with our verified partners for instant quotes.</p>
  - REPLACE: <p class="step-description">Export production-ready files with full documentation. Generate QC reports, assembly instructions, and procurement specs.</p>
  - VALIDATE: grep -n "production-ready files" index.html

UPDATE index.html CTA messaging:
  - FIND: <p class="cta-subtitle">Join thousands of innovators bringing their ideas to life with Promptly3D</p>
  - REPLACE: <p class="cta-subtitle">Join leading manufacturers streamlining their design-to-production workflow</p>
  - VALIDATE: grep -n "leading manufacturers" index.html

UPDATE index.html form placeholder:
  - FIND: <textarea name="message" rows="3" placeholder="What's your next great idea?"
  - REPLACE: <textarea name="message" rows="3" placeholder="What manufacturing challenges are you solving?"
  - VALIDATE: grep -n "manufacturing challenges" index.html
```

## Validation Checklist

- [ ] All messaging targets manufacturing professionals
- [ ] Technical language used appropriately (not overwhelming)
- [ ] Examples reflect real manufacturing use cases
- [ ] Benefits focus on production efficiency and quality
- [ ] Form fields align with B2B data collection
- [ ] Visual design maintains professional appearance
- [ ] Makers can still understand value proposition