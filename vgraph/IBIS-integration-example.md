# IBIS Notation Page Integration Example

This file shows how to add the VGraph interactive editor to your IBIS notation page.

## For Your IBIS Page

File: `/Users/kkn/private/swift/VithancoWebsite/Content/Notations/IBIS/index.md`

Add this section to your existing IBIS page:

```markdown
## Try IBIS Yourself

Create and visualize your own IBIS diagram right here in your browser:

<iframe src="/vgraph/vgraph-widget.html"
        width="100%"
        height="650"
        style="border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;"
        title="VGraph Interactive IBIS Editor"></iframe>

> **Tip:** Use Ctrl+Enter (or Cmd+Enter on Mac) to quickly render your graph.
```

## Alternative: Inline Editor (More Control)

If you want more control or customization, you can embed the editor directly:

```markdown
## Interactive IBIS Example

<div id="ibis-editor-container">
  <style>
    #ibis-editor-container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      margin: 20px 0;
    }
    #ibis-input {
      width: 100%;
      min-height: 200px;
      padding: 15px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      border: none;
      border-bottom: 1px solid #e0e0e0;
      resize: vertical;
    }
    #ibis-controls {
      padding: 10px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
    }
    #ibis-render-btn {
      padding: 8px 16px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    #ibis-render-btn:hover {
      background: #5568d3;
    }
    #ibis-output {
      padding: 20px;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }
    #ibis-output svg {
      max-width: 100%;
      height: auto;
    }
  </style>

  <textarea id="ibis-input" placeholder="Enter your IBIS VGL here...">vgraph myIBIS: IBIS "My IBIS Analysis" {
    node q1: Question "What architecture should we choose?";
    node a1: Answer "Microservices";
    node a2: Answer "Monolithic";
    node pro1: Pro "Better scalability";
    node pro2: Pro "Easier to maintain initially";
    node con1: Con "More complex operations";
    node con2: Con "Harder to scale";

    edge q1 -> a1;
    edge q1 -> a2;
    edge a1 -> pro1;
    edge a1 -> con1;
    edge a2 -> pro2;
    edge a2 -> con2;
}</textarea>

  <div id="ibis-controls">
    <button id="ibis-render-btn">Render IBIS Diagram</button>
    <span id="ibis-status" style="margin-left: 15px; font-size: 14px; color: #6c757d;"></span>
  </div>

  <div id="ibis-output">
    <span style="color: #6c757d;">Click "Render IBIS Diagram" to visualize</span>
  </div>
</div>

<script type="module">
  // ADJUST THIS PATH based on where you host the VGraph library
  import VGraphLib from '/vgraph/v1.0.0/vgraph-v1.0.0.js';

  let vgraph = null;

  async function initIBISEditor() {
    const statusEl = document.getElementById('ibis-status');
    const renderBtn = document.getElementById('ibis-render-btn');

    try {
      statusEl.textContent = 'Loading...';
      vgraph = new VGraphLib();

      // ADJUST THIS PATH based on where you host the WASM package
      await vgraph.init({ wasmPath: '/vgraph/Package' });

      statusEl.textContent = 'Ready';
      renderBtn.disabled = false;
    } catch (error) {
      console.error('Failed to initialize VGraph:', error);
      statusEl.textContent = 'Error loading VGraph';
      statusEl.style.color = '#dc3545';
    }
  }

  async function renderIBIS() {
    if (!vgraph) return;

    const input = document.getElementById('ibis-input').value;
    const output = document.getElementById('ibis-output');
    const status = document.getElementById('ibis-status');

    try {
      status.textContent = 'Rendering...';
      const svg = vgraph.render(input);
      output.innerHTML = svg;
      status.textContent = 'Rendered successfully';
      status.style.color = '#28a745';
    } catch (error) {
      console.error('Render error:', error);
      status.textContent = `Error: ${error.message}`;
      status.style.color = '#dc3545';
      output.innerHTML = `<span style="color: #dc3545;">Failed to render: ${error.message}</span>`;
    }
  }

  document.getElementById('ibis-render-btn').addEventListener('click', renderIBIS);
  document.getElementById('ibis-render-btn').disabled = true;

  initIBISEditor();
</script>

Try modifying the example above to create your own IBIS diagram!
```

## Deployment Steps

### 1. Build the WASM Package

In your VGraph project:

```bash
cd /Users/kkn/private/swift/VGraph
./build.sh --release
```

This creates optimized WASM files in `website/Package/`

### 2. Copy Files to Your Vithanco Website

```bash
# From VGraph directory
VGRAPH_DIR="/Users/kkn/private/swift/VGraph"
WEBSITE_DIR="/Users/kkn/private/swift/VithancoWebsite"

# Create directories
mkdir -p "$WEBSITE_DIR/Resources/vgraph/v1.0.0"
mkdir -p "$WEBSITE_DIR/Resources/vgraph/Package"

# Copy library files
cp "$VGRAPH_DIR/website/dist/vgraph-v1.0.0.js" "$WEBSITE_DIR/Resources/vgraph/v1.0.0/"
cp "$VGRAPH_DIR/website/dist/vgraph-v1.0.0.d.ts" "$WEBSITE_DIR/Resources/vgraph/v1.0.0/"
cp "$VGRAPH_DIR/website/dist/vgraph-widget.html" "$WEBSITE_DIR/Resources/vgraph/"

# Copy WASM package
cp -r "$VGRAPH_DIR/website/Package/"* "$WEBSITE_DIR/Resources/vgraph/Package/"
```

### 3. Update IBIS Page

Edit: `/Users/kkn/private/swift/VithancoWebsite/Content/Notations/IBIS/index.md`

Add the interactive widget section (see examples above) at the end of the file, before "Further Information"

### 4. Rebuild Your Publish Website

```bash
cd /Users/kkn/private/swift/VithancoWebsite
swift run
```

### 5. Test Locally

Open your browser to `http://localhost:8000/notations/IBIS/` (or your local dev server URL)

### 6. Deploy

Upload the entire `Resources/vgraph/` directory along with your generated website.

## Path Configuration

When embedding, make sure the paths match your deployment:

| File Type | Local Dev Path | Production Path |
|-----------|---------------|-----------------|
| Library JS | `/vgraph/v1.0.0/vgraph-v1.0.0.js` | Same (from Resources) |
| WASM Package | `/vgraph/Package/` | Same (from Resources) |
| Widget HTML | `/vgraph/vgraph-widget.html` | Same (from Resources) |

## Customization Ideas

### Pre-fill with Notation-Specific Examples

For each notation page, pre-fill the editor with relevant examples:

**IBIS Page:**
```javascript
const defaultIBIS = `vgraph ibis: IBIS "Decision Analysis" {
    node q1: Question "Your question here?";
    node a1: Answer "First option";
    node a2: Answer "Second option";
    // ... IBIS-specific structure
}`;
```

**BBS Page:**
```javascript
const defaultBBS = `vgraph bbs: BBS "Benefits Breakdown" {
    node obj1: InvestmentObjective "Your objective";
    node ben1: Benefit "Benefit 1";
    // ... BBS-specific structure
}`;
```

### Add Export Buttons

Add buttons to download the rendered SVG or export to DOT:

```javascript
function downloadSVG() {
  const svg = document.getElementById('ibis-output').innerHTML;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ibis-diagram.svg';
  a.click();
}
```

### Notation Validation

Add specific validation for each notation type:

```javascript
async function renderWithValidation(notationType) {
  const vgl = input.value;

  // Check if VGL matches expected notation
  if (!vgl.includes(`: ${notationType} `)) {
    alert(`This page is for ${notationType} notation. Your VGL appears to be a different type.`);
    return;
  }

  // Proceed with rendering
  const svg = vgraph.render(vgl);
  // ...
}
```

## Testing Checklist

- [ ] Widget loads without errors
- [ ] Example VGL renders correctly
- [ ] User can edit and re-render
- [ ] Error messages display properly
- [ ] Mobile responsive (test on phone)
- [ ] Works in Safari, Chrome, Firefox
- [ ] WASM files load (check Network tab)
- [ ] No console errors

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify file paths are correct
3. Ensure WASM files are served correctly
4. Check that Resources folder is copied during build

For VGraph-specific issues, see the main README.md in the dist/ folder.
