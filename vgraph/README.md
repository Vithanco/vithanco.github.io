# VGraph JavaScript Library

**Version:** 1.0.0

A JavaScript library for rendering and converting Vithanco Graph Language (VGL) diagrams in the browser using WebAssembly.

## Features

- 🚀 Fast WASM-based rendering
- 📊 Convert VGL to DOT format
- 🎨 Styled SVG output with Graphviz
- 📦 Zero runtime dependencies (CDN-based)
- 🔧 TypeScript type definitions included
- 📱 Responsive embeddable widget

## Quick Start

### Option 1: Use the Pre-built Widget (Easiest)

Embed the widget in your HTML or Markdown:

```html
<!-- Basic usage (default demo) -->
<iframe src="/vgraph/vgraph-widget.html" width="100%" height="750"></iframe>

<!-- With custom VGL via URL parameter -->
<iframe src="/vgraph/vgraph-widget.html?vgl=ENCODED_VGL" width="100%" height="750"></iframe>
```

For custom VGL content, see **WIDGET_INTEGRATION.md** for URL encoding examples and postMessage API usage.

### Option 2: Use the Library Directly

```html
<script type="module">
  import VGraphLib from 'https://yoursite.com/vgraph/v1.0.0/vgraph-v1.0.0.js';

  // Initialize
  const vgraph = new VGraphLib();
  await vgraph.init({
    wasmPath: 'https://yoursite.com/vgraph/Package'
  });

  // Render VGL to SVG
  const vglText = `vgraph demo: IBIS "My Graph" {
    node q1: Question "What should we do?";
    node a1: Answer "Option A";
    edge q1 -> a1;
  }`;

  const svg = vgraph.render(vglText);
  document.getElementById('output').innerHTML = svg;
</script>
```

## Integration with Publish-based Websites

### Setup

1. **Copy the distribution files to your Publish website:**

   ```bash
   # In your Publish website repository
   mkdir -p Resources/vgraph/v1.0.0
   mkdir -p Resources/vgraph/Package

   # Copy files from VGraph/website/dist/
   cp vgraph-v1.0.0.js Resources/vgraph/v1.0.0/
   cp vgraph-v1.0.0.d.ts Resources/vgraph/v1.0.0/
   cp vgraph-widget.html Resources/vgraph/

   # Copy WASM package from VGraph/website/Package/
   cp -r Package/* Resources/vgraph/Package/
   ```

2. **Update your Publish configuration** to copy these resources:

   In your `main.swift` or publish configuration:

   ```swift
   try VithancoWebsite().publish(
       using: [
           // ... other publishing steps
           .copyResources()
       ]
   )
   ```

### Method 1: Embed Widget in Markdown (Recommended)

In your notation page (e.g., `/Users/kkn/private/swift/VithancoWebsite/Content/Notations/IBIS/index.md`):

```markdown
## Try IBIS Yourself

Create your own IBIS diagram below:

<iframe src="/vgraph/vgraph-widget.html"
        width="100%"
        height="650"
        style="border: 1px solid #e0e0e0; border-radius: 8px;"
        title="VGraph Interactive Editor"></iframe>
```

### Method 2: Custom Integration

Create a custom HTML snippet in your Publish theme:

```swift
// In your Publish theme
extension Node where Context == HTML.BodyContext {
    static func vgraphWidget(
        initialVGL: String = "",
        notation: String = "IBIS"
    ) -> Node {
        .raw("""
        <div id="vgraph-container"></div>
        <script type="module">
          import VGraphLib from '/vgraph/v1.0.0/vgraph-v1.0.0.js';

          const vgraph = new VGraphLib();
          await vgraph.init({ wasmPath: '/vgraph/Package' });

          // Your custom widget code here
        </script>
        """)
    }
}
```

Then use it in your page:

```swift
.vgraphWidget(
    initialVGL: """
    vgraph example: IBIS "Example" {
        node q1: Question "What to do?";
    }
    """,
    notation: "IBIS"
)
```

### Method 3: Inline in Markdown with Script

Add this to your IBIS notation page:

```html
<div id="ibis-demo"></div>

<script type="module">
  import VGraphLib from '/vgraph/v1.0.0/vgraph-v1.0.0.js';

  async function renderExample() {
    const vgraph = new VGraphLib();
    await vgraph.init({ wasmPath: '/vgraph/Package' });

    const exampleVGL = `vgraph ibisExample: IBIS "IBIS Example" {
      node q1: Question "How can we improve customer satisfaction?";
      node a1: Answer "Implement live chat support";
      node a2: Answer "Create detailed FAQ section";
      node pro1: Pro "Immediate response to customers";
      node con1: Con "Requires 24/7 staffing";

      edge q1 -> a1;
      edge q1 -> a2;
      edge a1 -> pro1;
      edge a1 -> con1;
    }`;

    const svg = vgraph.render(exampleVGL);
    document.getElementById('ibis-demo').innerHTML = svg;
  }

  renderExample();
</script>
```

## API Reference

### VGraphLib Class

#### `new VGraphLib()`

Create a new VGraph library instance.

```javascript
const vgraph = new VGraphLib();
```

#### `async init(options): Promise<VGraphLib>`

Initialize the library. Must be called before using any other methods.

**Parameters:**
- `options.wasmPath` (string, optional): Path to WASM package directory. Default: `'./Package'`
- `options.loadGraphviz` (boolean, optional): Whether to load Graphviz. Default: `true`

**Returns:** Initialized VGraphLib instance

**Example:**
```javascript
await vgraph.init({
  wasmPath: '/vgraph/Package',
  loadGraphviz: true
});
```

#### `render(vglText): string`

Render VGL to styled SVG.

**Parameters:**
- `vglText` (string): Vithanco Graph Language text

**Returns:** SVG string

**Throws:** Error if rendering fails or library not initialized

**Example:**
```javascript
const svg = vgraph.render('vgraph g: IBIS "Test" { node q1: Question "Q?"; }');
```

#### `toDot(vglText): string`

Convert VGL to DOT format.

**Parameters:**
- `vglText` (string): Vithanco Graph Language text

**Returns:** DOT format string

**Throws:** Error if conversion fails or library not initialized

**Example:**
```javascript
const dot = vgraph.toDot('vgraph g: IBIS "Test" { node q1: Question "Q?"; }');
console.log(dot); // digraph { ... }
```

#### `exportVGL(vglText): string`

Normalize/roundtrip VGL (parse and re-export).

**Parameters:**
- `vglText` (string): Vithanco Graph Language text

**Returns:** Normalized VGL string

**Throws:** Error if export fails or library not initialized

**Example:**
```javascript
const normalized = vgraph.exportVGL(originalVGL);
```

#### `debug(vglText): string`

Get debug information about a graph.

**Parameters:**
- `vglText` (string): Vithanco Graph Language text

**Returns:** Debug information string

**Example:**
```javascript
const debugInfo = vgraph.debug(vglText);
console.log(debugInfo);
```

#### `static getVersion(): Object`

Get version information.

**Returns:** Object with `version`, `wasm`, and `features` properties

**Example:**
```javascript
const info = VGraphLib.getVersion();
console.log(info.version); // "1.0.0"
```

## File Structure

```
website/dist/
├── vgraph-v1.0.0.js              # Main library (ES module)
├── vgraph-v1.0.0.d.ts            # TypeScript type definitions
├── vgraph-widget.html            # Embeddable widget (supports URL params & postMessage)
├── vgraph-widget-helper.js       # Helper library for easier integration
├── widget-examples.html          # Live examples of all integration methods
├── README.md                     # This file
└── WIDGET_INTEGRATION.md         # Widget customization guide

website/Package/                  # WASM binaries (built by build.sh)
├── index.js
├── VGraphWasm.wasm
└── platforms/
    └── browser.js
```

## Browser Compatibility

- Modern browsers with ES6 module support
- WebAssembly support required
- Tested on:
  - Chrome/Edge 90+
  - Firefox 89+
  - Safari 15+

## Versioning and Stability

This library follows semantic versioning:

- **Major version** (1.x.x): Breaking API changes
- **Minor version** (x.1.x): New features, backwards compatible
- **Patch version** (x.x.1): Bug fixes, backwards compatible

### Stable API Guarantees

The following are guaranteed to remain stable within major versions:

1. **WASM Exports**: Function signatures won't change
2. **JavaScript API**: `init()`, `render()`, `toDot()`, `exportVGL()` methods
3. **VGL Syntax**: Existing VGL syntax remains supported

## Deployment Checklist

When deploying to your website:

- [ ] Copy all files to your web server
- [ ] Update paths in `vgraph-widget.html` (CONFIG section)
- [ ] Test widget in iframe
- [ ] Verify CORS settings if hosting on different domain
- [ ] Check browser console for any errors
- [ ] Test with your notation examples

## Troubleshooting

### Widget doesn't load

1. Check browser console for errors
2. Verify paths in CONFIG section of widget
3. Ensure WASM files are served with correct MIME type:
   - `.wasm` → `application/wasm`
   - `.js` → `application/javascript`

### CORS errors

If hosting VGraph on a different domain than your website, ensure CORS headers are set:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

### Import errors

Make sure your server serves `.js` files with `type="module"` or correct MIME type.

## Examples

See the `website/index.html` file for a full working example with:
- Multiple rendering modes
- VGL import/export
- Round-trip testing
- Error handling

## License

MIT License - See LICENSE file for details

## Widget Customization

The widget now supports custom VGL content via:

1. **URL parameters** - Pass `?vgl=ENCODED_VGL`
2. **postMessage API** - Dynamic updates from parent page
3. **Helper library** - `vgraph-widget-helper.js` for easier integration

See **WIDGET_INTEGRATION.md** for detailed examples and usage patterns.

## VGL Language Reference

For complete VGL syntax, grammar, and examples, see **VGL_GUIDE.md** which includes:
- VGL concepts (nodes, edges, groups, attributes)
- Complete grammar specification
- Node types and edge types for IBIS and BBS notations
- Comprehensive examples from simple to complex
- Best practices and error handling

## Support

For issues and questions:
- GitHub Issues: https://github.com/Vithanco/VGraph/issues
- Documentation: https://vithanco.com
- VGL Language Guide: See VGL_GUIDE.md

## Changelog

### v1.0.1 (2026-01-18)
- Added URL parameter support for custom VGL content
- Added postMessage API for dynamic widget updates
- Added helper library (vgraph-widget-helper.js)
- Added comprehensive integration examples

### v1.0.0 (2026-01-17)
- Initial stable release
- Core API: `render()`, `toDot()`, `exportVGL()`
- Embeddable widget
- TypeScript definitions
