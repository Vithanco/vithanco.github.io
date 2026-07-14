// NOTICE: This is auto-generated code by BridgeJS from JavaScriptKit,
// DO NOT EDIT.
//
// To update this file, just rebuild your project or run
// `swift package bridge-js`.

export type Exports = {
    /**
     * Mount the ElementaryUI-based interactive editor into the DOM element with
     * the given id. Builds a textarea + Render button + status line (managed by
     * ElementaryUI) plus a live SVG preview, and renders the default VGL.
     */
    mountEditor(elementId: string): void;
    /**
     * Push VGL text into a mounted editor (initial/updated content). Updates the
     * editor state and re-renders the preview.
     */
    editorRenderNow(): void;
    setEditorVGL(text: string): void;
    /**
     * Convert Vithanco graph notation to DOT format
     * @param graph Graph in Vithanco notation
     * @returns DOT format string, or error message prefixed with "Error:"
     */
    convertToDot(graph: string): string;
    /**
     * Produce the DOT for the host to lay out with Graphviz (decoupled path).
     * The host computes layout JSON from this DOT at JS top level and passes
     * it back to `renderGraphWithLayout` — keeping Graphviz off the nested
     * SwiftWasm→JS call path that corrupts the Emscripten module.
     * @param graph Graph in Vithanco notation
     * @returns DOT string, or error message prefixed with "Error:"
     */
    dotForLayout(graph: string): string;
    /**
     * Render a graph to SVG. Graphviz layout runs in-process inside this wasm
     * module (swiftGraphviz) — no host-computed layout JSON needed.
     * @param graph Graph in Vithanco notation
     * @returns SVG string, or error SVG with message
     */
    renderGraph(graph: string): string;
    /**
     * Dark-mode variant of `renderGraph` (§11 of the Diagram Style Guide).
     * @param graph Graph in Vithanco notation
     * @returns SVG string with dark palette, or error SVG with message
     */
    renderGraphDark(graph: string): string;
    /**
     * Get debug information about a graph
     * @param graph Graph in Vithanco notation
     * @returns Debug description with graph statistics
     */
    debugGraph(graph: string): string;
    /**
     * Lay out a graph (in-process Graphviz) and return position information as
     * text — node positions and edge paths.
     * @param graph Graph in Vithanco notation
     * @returns Layout results with node positions and edge paths
     */
    layoutGraph(graph: string): string;
    /**
     * Export graph to VGL (Vithanco Graph Language) format
     * @param graph Graph in Vithanco notation
     * @returns VGL format string
     */
    exportToVGL(graph: string): string;
}
export type Imports = {
}
export function createInstantiator(options: {
    imports: Imports;
}, swift: any): Promise<{
    addImports: (importObject: WebAssembly.Imports) => void;
    setInstance: (instance: WebAssembly.Instance) => void;
    createExports: (instance: WebAssembly.Instance) => Exports;
}>;