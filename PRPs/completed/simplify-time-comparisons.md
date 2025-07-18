# Simplify Time Comparisons

> Task to remove specific time comparisons and use generic "Hours" vs "Minutes" messaging

## Goal
Replace specific time ranges (40-60 hours, 20-30 hours, etc.) with simpler "Hours" for competitors and "Minutes" for Promptly3D to avoid overpromising and maintain credibility.

## Why
- Specific time claims can be challenged and vary by project complexity
- Simpler messaging is more memorable and impactful
- Focuses on the order-of-magnitude difference rather than exact numbers
- Reduces potential legal/marketing risks from specific claims

## Implementation Tasks

```yaml
context:
  patterns:
    - file: index.html
      copy: Current comparison section structure
    - file: style.css
      copy: time-badge styling

  gotchas:
    - issue: "Time badges are styled elements"
      fix: "Maintain visual design while updating text"
```

### Task List

```
UPDATE index.html comparison section:
  - FIND: <span class="time-badge">40-60 hours</span>
  - REPLACE: <span class="time-badge">Hours</span>
  - VALIDATE: grep -n "Traditional CAD" -A 2 index.html | grep "Hours"

UPDATE index.html comparison section:
  - FIND: <span class="time-badge">20-30 hours</span>
  - REPLACE: <span class="time-badge">Hours</span>
  - VALIDATE: grep -n "AI Copilots" -A 2 index.html | grep "Hours"

UPDATE index.html comparison section:
  - FIND: <span class="time-badge">10-15 hours</span>
  - REPLACE: <span class="time-badge">Hours</span>
  - VALIDATE: grep -n "Sketch-to-3D" -A 2 index.html | grep "Hours"

UPDATE index.html comparison section:
  - FIND: <span class="time-badge">5 minutes</span>
  - REPLACE: <span class="time-badge">Minutes</span>
  - VALIDATE: grep -n "Promptly3D" -A 2 index.html | grep "Minutes"

UPDATE style.css time-badge styling:
  - FIND: .time-badge
  - ADD_AFTER current rules:
    ```css
    /* Enhanced styling for simplified time badges */
    .compare-column:not(.featured) .time-badge {
      background: rgba(255, 59, 48, 0.1);
      color: #ff3b30;
    }
    
    .compare-column.featured .time-badge {
      background: rgba(52, 199, 89, 0.1);
      color: #34c759;
      font-weight: 700;
    }
    ```
  - VALIDATE: grep -n "Enhanced styling for simplified time badges" style.css

OPTIONAL - Add visual indicator:
  - FIND in index.html: <p class="section-subtitle">See how we stack up against traditional methods</p>
  - REPLACE: <p class="section-subtitle">See how we stack up against traditional methods — from hours to minutes</p>
  - VALIDATE: grep -n "from hours to minutes" index.html
```

## Alternative Approach (Remove Time Comparisons Entirely)

If preferred, here are tasks to remove time comparisons completely:

```
UPDATE index.html:
  - FIND_AND_REMOVE: All <span class="time-badge">...</span> elements
  - UPDATE: .compare-header structure to remove time badge container
  - VALIDATE: grep -c "time-badge" index.html should return 0

UPDATE style.css:
  - REMOVE: .time-badge styling rules
  - VALIDATE: grep -c "time-badge" style.css should return 0
```

## Validation Checklist

- [ ] All time comparisons updated to "Hours" or "Minutes"
- [ ] Visual hierarchy maintained in comparison table
- [ ] Promptly3D column still stands out as the best choice
- [ ] No specific time claims that could be disputed
- [ ] Mobile responsive design maintained
- [ ] Color coding helps differentiate time scales