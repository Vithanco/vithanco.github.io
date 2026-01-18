# VGraph Widget Integration Guide

The VGraph widget can be embedded in any website to display interactive IBIS graphs. This guide shows how to customize the VGL content when integrating the widget.

## Integration Methods

### 1. Basic Integration (Default Demo)

Use this for a simple interactive editor with the default demo graph:

```html
<iframe
  src="/vgraph/vgraph-widget.html"
  width="100%"
  height="750"
  style="border: 1px solid #e0e0e0; border-radius: 8px;"
  title="VGraph Interactive Editor">
</iframe>
```

### 2. Custom VGL via URL Parameter

Pass your custom VGL content via the `vgl` URL parameter. The VGL must be URL-encoded.

**JavaScript Example:**
```javascript
// Your custom VGL content
const myVGL = `vgraph demo: IBIS "My Custom Graph" {
    node q1: Question "Should we use VGraph?";
    node a1: Answer "Yes, it's great!";
    node pro1: Pro "Easy to integrate";

    edge q1 -> a1;
    edge a1 -> pro1;
}`;

// URL-encode the VGL
const encodedVGL = encodeURIComponent(myVGL);

// Create iframe with custom VGL
const iframe = document.createElement('iframe');
iframe.src = `/vgraph/vgraph-widget.html?vgl=${encodedVGL}`;
iframe.width = '100%';
iframe.height = '750';
document.body.appendChild(iframe);
```

**Direct HTML Example:**
```html
<iframe
  src="/vgraph/vgraph-widget.html?vgl=vgraph%20demo%3A%20IBIS%20%22Simple%22%20%7B%0A%20%20node%20q1%3A%20Question%20%22What%3F%22%3B%0A%7D"
  width="100%"
  height="750">
</iframe>
```

### 3. Dynamic VGL via postMessage API

For dynamic updates or interactive control, use the postMessage API:

**HTML:**
```html
<iframe
  id="vgraph-widget"
  src="/vgraph/vgraph-widget.html"
  width="100%"
  height="750">
</iframe>

<button onclick="loadCustomGraph()">Load Custom Graph</button>
```

**JavaScript:**
```javascript
function loadCustomGraph() {
  const iframe = document.getElementById('vgraph-widget');

  const customVGL = `vgraph demo: IBIS "Dynamic Graph" {
    node q1: Question "Is this dynamic?";
    node a1: Answer "Yes!";
    edge q1 -> a1;
  }`;

  // Send VGL to widget
  iframe.contentWindow.postMessage({
    type: 'setVGL',
    vgl: customVGL,
    autoRender: true  // Auto-render when loaded (default: true)
  }, '*');
}
```

## Usage in Vithanco Website

For the Vithanco website using Publish, you can integrate custom graphs on any page:

### Example 1: Blog Post with Custom Graph

```html
<iframe
  src="/vgraph/vgraph-widget.html?vgl=vgraph%20ibis%3A%20IBIS%20%22Blog%20Example%22%20%7B%0A%20%20node%20q1%3A%20Question%20%22Why%20use%20IBIS%3F%22%3B%0A%20%20node%20a1%3A%20Answer%20%22Better%20decisions%22%3B%0A%20%20edge%20q1%20-%3E%20a1%3B%0A%7D"
  width="100%"
  height="600"
  style="border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
</iframe>
```

### Example 2: Interactive Demo Page

Create a page with a custom graph selector:

```html
<div id="graph-selector">
  <button onclick="loadGraph('example1')">Example 1</button>
  <button onclick="loadGraph('example2')">Example 2</button>
</div>

<iframe
  id="demo-widget"
  src="/vgraph/vgraph-widget.html"
  width="100%"
  height="750">
</iframe>

<script>
const graphs = {
  example1: `vgraph demo: IBIS "Example 1" {
    node q1: Question "First example?";
    node a1: Answer "Yes";
    edge q1 -> a1;
  }`,

  example2: `vgraph demo: IBIS "Example 2" {
    node q1: Question "Second example?";
    node a1: Answer "Different approach";
    edge q1 -> a1;
  }`
};

function loadGraph(graphId) {
  const iframe = document.getElementById('demo-widget');
  iframe.contentWindow.postMessage({
    type: 'setVGL',
    vgl: graphs[graphId],
    autoRender: true
  }, '*');
}
</script>
```

## VGL Syntax Reference

For complete VGL language documentation including grammar, concepts, and examples, see **VGL_GUIDE.md**.

Quick VGL syntax reminder:
```vgl
vgraph <id>: <NOTATION> "<label>" {
    node <id>: <NodeType> "<label>" [<attributes>];
    edge <from> -> <to>: <EdgeType> "<label>" [<attributes>];
    group <id> "<label>" {
        // nested content
    };
}
```

## Tips

1. **Always URL-encode VGL** when using URL parameters
2. **Wait for iframe to load** before sending postMessage
3. **Use autoRender: false** if you want manual control over rendering
4. **Test with simple graphs first** to verify integration
5. **Handle iframe security** with appropriate CSP headers in production
6. **See VGL_GUIDE.md** for complete language reference and examples

## Troubleshooting

### VGL not loading
- Check that VGL is properly URL-encoded
- Verify the widget path is correct
- Check browser console for errors

### postMessage not working
- Ensure iframe is fully loaded before sending messages
- Check origin restrictions if using specific domains
- Verify message structure matches the expected format

### Rendering issues
- Ensure VGL syntax is valid
- Check that WASM modules are loading correctly
- Verify network access to CDN resources
