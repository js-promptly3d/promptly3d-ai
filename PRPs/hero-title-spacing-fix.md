# PRP: Hero Title Spacing Fix - Prevent Cutoff by Top Banners

## Overview
Fix the "Multi-Agent AI CAD Architecture" hero title spacing to prevent cutoff by the fixed header and pre-launch banner. The title needs proper clearance to be fully visible below the top navigation elements.

## Current Issue Analysis

### Current CSS Structure
```css
/* Desktop */
.hero-section {
    padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 80px);
    /* 64px + 34px + 80px = 178px total top padding */
}

.hero-title {
    margin-top: 20px;  /* Additional spacing above title */
}

/* Mobile (768px) */
.hero-section {
    padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 40px);
    /* 60px + 34px + 40px = 134px total top padding */
}

.hero-title {
    margin-top: 10px;
}

/* Small Mobile (480px) */
.hero-section {
    padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 15px);
    /* 60px + 34px + 15px = 109px total top padding */
}

.hero-title {
    margin-top: 5px;
}
```

### Problem
The title may be getting cut off or appearing too close to the banner, especially on smaller screens where minimal spacing is used.

## Solution Tasks

### Task 1: Increase Desktop Hero Section Base Spacing
- **File**: `/Users/jackspencer/Documents/GitHub/promptly3d.ai/style.css`
- **Action**: Modify `.hero-section` padding-top calculation
- **Change**: Increase base spacing from `80px` to `120px` for better clearance
- **Target Line**: ~325

```css
/* Before */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 80px);

/* After */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 120px);
```

### Task 2: Reduce Hero Title Top Margin on Desktop
- **File**: `/Users/jackspencer/Documents/GitHub/promptly3d.ai/style.css`
- **Action**: Adjust `.hero-title` margin-top to balance increased section padding
- **Change**: Reduce margin-top from `20px` to `10px`
- **Target Line**: ~350

```css
/* Before */
margin-top: 20px;

/* After */
margin-top: 10px;
```

### Task 3: Increase Mobile Hero Section Base Spacing
- **File**: `/Users/jackspencer/Documents/GitHub/promptly3d.ai/style.css`
- **Action**: Modify mobile `.hero-section` padding-top calculation
- **Change**: Increase base spacing from `40px` to `60px` for tablet/mobile
- **Target Line**: ~1222

```css
/* Before */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 40px);

/* After */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 60px);
```

### Task 4: Increase Small Mobile Hero Section Base Spacing
- **File**: `/Users/jackspencer/Documents/GitHub/promptly3d.ai/style.css`
- **Action**: Modify small mobile `.hero-section` padding-top calculation
- **Change**: Increase base spacing from `15px` to `30px` for better mobile clearance
- **Target Line**: ~1307

```css
/* Before */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 15px);

/* After */
padding-top: calc(var(--header-height) + var(--pre-launch-banner-height) + 30px);
```

### Task 5: Maintain Mobile Hero Title Margins
- **File**: `/Users/jackspencer/Documents/GitHub/promptly3d.ai/style.css`
- **Action**: Verify mobile hero title margins remain appropriate
- **Current**: Mobile (10px) and Small Mobile (5px) margins are acceptable
- **No change needed** - these values provide good balance with increased section padding

## Expected Results

### Desktop Spacing
- **Before**: 178px total clearance (64+34+80) + 20px title margin = 198px
- **After**: 218px total clearance (64+34+120) + 10px title margin = 228px
- **Net Change**: +30px more clearance above title

### Mobile Spacing (768px)
- **Before**: 134px total clearance (60+34+40) + 10px title margin = 144px
- **After**: 154px total clearance (60+34+60) + 10px title margin = 164px
- **Net Change**: +20px more clearance above title

### Small Mobile Spacing (480px)
- **Before**: 109px total clearance (60+34+15) + 5px title margin = 114px
- **After**: 139px total clearance (60+34+30) + 5px title margin = 144px
- **Net Change**: +30px more clearance above title

## Quality Assurance

### Visual Hierarchy Preservation
- Hero title remains prominent with gradient styling
- Section visual balance maintained with adjusted padding distribution
- Coming soon badge and subtitle positioning unaffected

### Responsive Design Integrity
- All breakpoints updated proportionally
- Mobile-first approach maintained
- Touch targets and readability preserved

### Performance Impact
- Zero performance impact - CSS-only changes
- No layout shift issues
- Existing animations and transitions unaffected

## Testing Requirements

### Cross-Device Testing
1. **Desktop (1200px+)**: Verify title has adequate clearance from banner
2. **Tablet (768px-1024px)**: Check title positioning and readability
3. **Mobile (480px-768px)**: Ensure proper spacing without cramping
4. **Small Mobile (<480px)**: Validate minimal viable clearance

### Browser Compatibility
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Mobile
- Verify calc() function support (universal)

### Visual Verification Points
- [ ] Title not cut off by header/banner overlay
- [ ] Proper visual separation between banner and hero content
- [ ] Maintained section proportions and visual balance
- [ ] 3D viewer container positioning unaffected
- [ ] Form wrapper positioning preserved

## CSS Variables Reference
```css
:root {
    --header-height: 64px;          /* Desktop header */
    --pre-launch-banner-height: 34px;  /* Fixed banner height */
}

@media (max-width: 768px) {
    :root {
        --header-height: 60px;      /* Mobile header */
    }
}
```

## Implementation Priority
**High Priority** - Visual accessibility issue affecting primary hero content visibility.

## Estimated Implementation Time
- **Development**: 15 minutes
- **Testing**: 30 minutes  
- **Total**: 45 minutes

## Success Metrics
- Hero title fully visible with comfortable margin below fixed elements
- No content overlap across all viewport sizes
- Maintained visual hierarchy and design aesthetics
- Improved user experience for first-time visitors