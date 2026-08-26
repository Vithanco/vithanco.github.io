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
    editorRenderNow(): void;
    editorLongPressFired(): void;
    setEditorVGL(text: string): void;
    convertToDot(graph: string): string;
    /**
     * Produce the DOT for the host to lay out with Graphviz (decoupled path).
     * The host computes layout JSON from this DOT at JS top level and passes
     * it back to `renderGraphWithLayout` — keeping Graphviz off the nested
     * SwiftWasm→JS call path that corrupts the Emscripten module.
     */
    dotForLayout(graph: string): string;
    /**
     * Render a graph to SVG. Graphviz layout runs in-process inside this wasm
     * module (swiftGraphviz) — no host-computed layout JSON needed.
     */
    renderGraph(graph: string): string;
    /**
     * Dark-mode variant of `renderGraph` (§11 of the Diagram Style Guide).
     */
    renderGraphDark(graph: string): string;
    debugGraph(graph: string): string;
    /**
     * Lay out a graph (in-process Graphviz) and return position information as
     * text — node positions and edge paths.
     */
    layoutGraph(graph: string): string;
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