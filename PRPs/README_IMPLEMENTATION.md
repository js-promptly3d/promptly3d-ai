# PRPs Implementation Guide for Promptly3D

## Quick Start

### 1. Creating a New PRP
```bash
# Copy template
cp PRPs/templates/3d-feature-template.md PRPs/my-new-feature.md

# Edit the PRP with your requirements
# Then execute it
python3 PRPs/scripts/prp_runner.py --prp my-new-feature --interactive
```

### 2. Using Claude Commands
The following commands are now available in your project:

#### General Commands
- `/prime-core` - Add project context to Claude
- `/create-base-prp` - Generate comprehensive PRPs
- `/execute-base-prp` - Execute PRPs against codebase
- `/review-general` - Perform code reviews

#### 3D-Specific Commands
- `/create-3d-feature` - Generate PRP for 3D features
- `/optimize-webgl` - Analyze WebGL performance
- `/analyze-3d-performance` - Comprehensive 3D performance analysis

### 3. Example Workflow

#### Adding a New 3D Feature
1. Use Claude command: `/create-3d-feature`
2. Provide feature requirements
3. Save generated PRP to `PRPs/feature-name.md`
4. Execute: `python3 PRPs/scripts/prp_runner.py --prp feature-name --interactive`

#### Optimizing Performance
1. Use Claude command: `/optimize-webgl`
2. Specify the file or component to analyze
3. Implement suggested optimizations
4. Validate with `/analyze-3d-performance`

### 4. Directory Structure
```
promptly3d.ai/
├── .claude/
│   └── commands/        # Claude Code commands
├── PRPs/
│   ├── templates/       # PRP templates
│   ├── scripts/         # Runner scripts
│   ├── ai_docs/         # AI documentation
│   ├── completed/       # Completed PRPs (archive)
│   └── *.md            # Active PRPs
└── CLAUDE.md           # Project guidelines
```

### 5. Best Practices

#### PRP Creation
- Be specific about requirements
- Include performance targets
- Define clear validation criteria
- Reference existing code patterns

#### Execution
- Review generated code before committing
- Test on multiple devices
- Validate performance metrics
- Document any deviations from PRP

#### Maintenance
- Archive completed PRPs to `completed/`
- Update templates based on learnings
- Keep CLAUDE.md current with project changes

### 6. Common Use Cases

#### Feature Development
```bash
# Create PRP for new feature
cp PRPs/templates/3d-feature-template.md PRPs/particle-system.md
# Edit with requirements
# Execute
python3 PRPs/scripts/prp_runner.py --prp particle-system --interactive
```

#### Bug Fixes
```bash
# Use direct Claude command
/review-general script.js
# Or create a task PRP
cp PRPs/templates/prp_task.md PRPs/fix-mobile-rendering.md
```

#### Performance Optimization
```bash
# Analyze current performance
/analyze-3d-performance
# Create optimization PRP
/create-base-prp "Optimize Three.js rendering pipeline"
```

### 7. Troubleshooting

#### PRP Runner Issues
- Ensure Python 3 is installed
- Check file paths are correct
- Verify Claude CLI is available

#### Command Not Found
- Restart Claude Code session
- Check `.claude/commands/` directory
- Verify command file exists

### 8. Next Steps
1. Try the example PRP: `PRPs/example-3d-model-viewer.md`
2. Create your first custom PRP
3. Explore the AI documentation in `PRPs/ai_docs/`
4. Customize templates for your workflow