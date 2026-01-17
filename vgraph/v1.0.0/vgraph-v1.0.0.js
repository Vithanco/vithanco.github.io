/**
 * VGraph JavaScript Library
 * Version: 1.0.0
 *
 * A JavaScript wrapper for VGraph WASM module that provides graph rendering
 * and conversion capabilities for Vithanco Graph Language (VGL).
 *
 * @license MIT
 * @author Vithanco
 */

class VGraphLib {
  constructor() {
    this.initialized = false;
    this.wasmExports = null;
    this.memory = null;
    this.graphvizInstance = null;
  }

  /**
   * Initialize the VGraph library
   * @param {Object} options - Initialization options
   * @param {string} options.wasmPath - Path to the WASM package directory (default: './Package')
   * @param {boolean} options.loadGraphviz - Whether to load Graphviz (default: true)
   * @returns {Promise<VGraphLib>} Initialized library instance
   */
  async init(options = {}) {
    if (this.initialized) {
      return this;
    }

    const { wasmPath = './Package', loadGraphviz = true } = options;

    try {
      // Load Graphviz if needed
      if (loadGraphviz) {
        await this._loadGraphviz();
      }

      // Load WASM module
      await this._loadWasm(wasmPath);

      this.initialized = true;
      return this;
    } catch (error) {
      throw new Error(`Failed to initialize VGraph: ${error.message}`);
    }
  }

  /**
   * Load Graphviz WASM module
   * @private
   */
  async _loadGraphviz() {
    try {
      const { Graphviz } = await import('https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphviz.js');
      this.graphvizInstance = await Graphviz.load();

      // Expose graphviz functions globally for WASM to use
      window.graphvizLayout = (dotSource, engine = 'dot', format = 'svg') => {
        if (!this.graphvizInstance) {
          throw new Error('Graphviz not initialized');
        }
        return this.graphvizInstance.layout(dotSource, format, engine);
      };

      window.graphvizLayoutJSON = (dotSource, engine = 'dot') => {
        if (!this.graphvizInstance) {
          throw new Error('Graphviz not initialized');
        }
        const jsonStr = this.graphvizInstance.layout(dotSource, 'json', engine);
        return JSON.parse(jsonStr);
      };
    } catch (error) {
      throw new Error(`Failed to load Graphviz: ${error.message}`);
    }
  }

  /**
   * Load WASM module
   * @private
   */
  async _loadWasm(wasmPath) {
    try {
      const { init } = await import(`${wasmPath}/index.js`);
      const initResult = await init({});

      this.wasmExports = initResult.instance.exports;
      this.memory = this.wasmExports.memory;
    } catch (error) {
      throw new Error(`Failed to load WASM module: ${error.message}`);
    }
  }

  /**
   * Call a WASM function with string input and output
   * @private
   */
  _callWasmStringFunction(funcName, inputString) {
    if (!this.initialized) {
      throw new Error('VGraph library not initialized. Call init() first.');
    }

    // Encode string to UTF-8
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(inputString);

    // Allocate memory in WASM
    const ptr = this.wasmExports.wasm_malloc(utf8Bytes.length);
    let wasmMemory = new Uint8Array(this.memory.buffer);
    wasmMemory.set(utf8Bytes, ptr);

    // Call the function
    const resultPtr = this.wasmExports[funcName](ptr, utf8Bytes.length);

    // Free input memory
    this.wasmExports.wasm_free(ptr);

    // Get fresh view of memory (may have grown during call)
    wasmMemory = new Uint8Array(this.memory.buffer);

    // Read result string
    let resultLength = 0;
    const maxLength = 10 * 1024 * 1024; // 10MB max
    while (resultLength < maxLength && wasmMemory[resultPtr + resultLength] !== 0) {
      resultLength++;
    }

    const resultBytes = wasmMemory.subarray(resultPtr, resultPtr + resultLength);
    const decoder = new TextDecoder();
    return decoder.decode(resultBytes);
  }

  /**
   * Render VGL to SVG with styles
   * @param {string} vglText - Vithanco Graph Language text
   * @returns {string} SVG string
   * @throws {Error} If rendering fails
   */
  render(vglText) {
    const result = this._callWasmStringFunction('renderGraphWithStyles', vglText);

    // Check for error in result
    if (result.includes('Error:') && result.includes('<text')) {
      const match = result.match(/Error:([^<]+)/);
      throw new Error(match ? match[1].trim() : 'Rendering failed');
    }

    return result;
  }

  /**
   * Convert VGL to DOT format
   * @param {string} vglText - Vithanco Graph Language text
   * @returns {string} DOT format string
   * @throws {Error} If conversion fails
   */
  toDot(vglText) {
    const result = this._callWasmStringFunction('convertToDot', vglText);

    if (result.startsWith('Error:')) {
      throw new Error(result.substring(7));
    }

    return result;
  }

  /**
   * Export VGL (normalize/roundtrip)
   * @param {string} vglText - Vithanco Graph Language text
   * @returns {string} Normalized VGL string
   * @throws {Error} If export fails
   */
  exportVGL(vglText) {
    const result = this._callWasmStringFunction('exportToVGL', vglText);

    if (result.startsWith('Error:')) {
      throw new Error(result.substring(7));
    }

    return result;
  }

  /**
   * Get debug information about a graph
   * @param {string} vglText - Vithanco Graph Language text
   * @returns {string} Debug information
   */
  debug(vglText) {
    return this._callWasmStringFunction('debugGraph', vglText);
  }

  /**
   * Test layout functionality
   * @param {string} vglText - Vithanco Graph Language text
   * @returns {string} Layout test results
   */
  testLayout(vglText) {
    return this._callWasmStringFunction('testLayout', vglText);
  }

  /**
   * Get version information
   * @returns {Object} Version info
   */
  static getVersion() {
    return {
      version: '1.0.0',
      wasm: true,
      features: ['render', 'toDot', 'exportVGL', 'debug', 'testLayout']
    };
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VGraphLib;
}

if (typeof window !== 'undefined') {
  window.VGraphLib = VGraphLib;
}

export default VGraphLib;
