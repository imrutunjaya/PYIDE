let pyodideInstance = null;

export async function initPyodide(outputCallback) {
  if (pyodideInstance) return pyodideInstance;

  outputCallback("Initializing Python environment... This may take a moment.\n");
  
  try {
    if (!window.loadPyodide) {
      throw new Error("Pyodide script not loaded in index.html");
    }
    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });
    outputCallback("Python environment initialized successfully!\\n");
    return pyodideInstance;
  } catch (error) {
    outputCallback(`\\nFailed to initialize Python environment: ${error.message}\\n`);
    throw error;
  }
}

export async function runPythonCode(code, outputCallback) {
  if (!pyodideInstance) {
    outputCallback("Error: Python environment is not initialized yet.\\n");
    return;
  }

  // We want to capture stdout and stderr
  // Pyodide's runPythonAsync takes an options object where we can redirect stdout/stderr
  
  try {
    // Pyodide allows setting sys.stdout and sys.stderr handlers directly
    pyodideInstance.setStdout({ batched: (msg) => outputCallback(msg + "\\n") });
    pyodideInstance.setStderr({ batched: (msg) => outputCallback("ERROR: " + msg + "\\n") });

    await pyodideInstance.runPythonAsync(code);
  } catch (error) {
    outputCallback(`\n${error.toString()}\n`);
  }
}
