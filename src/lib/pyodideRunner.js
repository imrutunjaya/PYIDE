let pyodideInstance = null;

export async function initPyodide(outputCallback) {
  if (pyodideInstance) return pyodideInstance;

  outputCallback("Initializing Python environment... This may take a moment.\n");
  
  try {
    if (!window.loadPyodide) {
      throw new Error("Pyodide script not loaded in index.html");
    }
    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      stdin: () => window.prompt("Python Input:")
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

  try {
    // Register temporary globals for input handling
    window.pyide_print = (msg) => outputCallback(msg);
    window.pyide_prompt = (msg) => window.prompt(msg || "Python Input:");

    // Inject our custom input handler into Python builtins
    const patchCode = `
import builtins
import js

def custom_input(prompt=""):
    js.pyide_print(str(prompt))
    res = js.pyide_prompt(str(prompt))
    if res is None:
        raise EOFError()
    js.pyide_print(res + "\\n")
    return res

builtins.input = custom_input
`;
    await pyodideInstance.runPythonAsync(patchCode);

    // Pyodide allows setting sys.stdout and sys.stderr handlers directly
    pyodideInstance.setStdout({ batched: (msg) => outputCallback(msg + "\\n") });
    pyodideInstance.setStderr({ batched: (msg) => outputCallback("ERROR: " + msg + "\\n") });

    await pyodideInstance.runPythonAsync(code);
  } catch (error) {
    outputCallback(`\\n${error.toString()}\\n`);
  } finally {
    // Clean up globals
    delete window.pyide_print;
    delete window.pyide_prompt;
  }
}
