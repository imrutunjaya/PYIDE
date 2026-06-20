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

    // Inject our custom input handler and custom stdout into Python
    const patchCode = `
import builtins
import sys
import js

class CustomStdout:
    def write(self, s):
        js.pyide_print(str(s))
    def flush(self):
        pass

# Route ALL stdout and stderr through our JS callback accurately
sys.stdout = CustomStdout()
sys.stderr = CustomStdout()

def custom_input(prompt=""):
    # Print the prompt precisely as provided
    js.pyide_print(str(prompt))
    res = js.pyide_prompt(str(prompt))
    if res is None:
        raise EOFError()
    # Print the user's input followed by a newline (like a real terminal)
    js.pyide_print(res + "\\n")
    return res

builtins.input = custom_input
`;
    await pyodideInstance.runPythonAsync(patchCode);

    // Run the user's code
    await pyodideInstance.runPythonAsync(code);
    return { success: true };
  } catch (error) {
    const errorString = error.toString();
    outputCallback(`\\n${errorString}\\n`);
    return { success: false, error: errorString };
  } finally {
    // Clean up globals
    delete window.pyide_print;
    delete window.pyide_prompt;
  }
}
