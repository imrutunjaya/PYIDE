export function translatePythonLine(line) {
  if (!line || typeof line !== 'string') return "";
  
  const trimmed = line.trim();
  if (trimmed === "") return "Empty line. The canvas is waiting for your code.";
  
  if (trimmed.startsWith("#")) {
    return "This is a comment. The computer ignores this completely. It's just a note for you!";
  }

  // 0. Catch C/Java style typed variables (Error!)
  const typeMistakeMatch = trimmed.match(/^(int|str|float|bool)\s+([a-zA-Z_]\w*)\s*=\s*(.*)$/);
  if (typeMistakeMatch) {
    const type = typeMistakeMatch[1];
    const varName = typeMistakeMatch[2];
    const value = typeMistakeMatch[3] || "...";
    let typeName = type === "int" ? "integer (whole number)" : type === "str" ? "string (text)" : type === "float" ? "float (decimal)" : "boolean (True/False)";
    return `Error! You are trying to create an ${typeName} named '${varName}' with the value ${value}. In Python, you don't need to write '${type}' before the variable! Just write: ${varName} = ${value}`;
  }

  // --- NEW SYNTAX ERROR CHECKS ---
  
  if (/^print\s+["'](.*)["']$/.test(trimmed)) {
    return "Syntax Error! In Python 3, 'print' is a function. You must use parentheses: print(...)";
  }
  if (/[a-zA-Z_]\w*\+\+/.test(trimmed)) {
    return "Syntax Error! Python doesn't have '++'. Use '+= 1' instead.";
  }
  if (/[a-zA-Z_]\w*--/.test(trimmed)) {
    return "Syntax Error! Python doesn't have '--'. Use '-= 1' instead.";
  }
  if (trimmed.includes(" && ")) {
    return "Syntax Error! In Python, use the word 'and' instead of '&&'.";
  }
  if (trimmed.includes(" || ")) {
    return "Syntax Error! In Python, use the word 'or' instead of '||'.";
  }
  if (/\btrue\b/.test(trimmed)) {
    return "Syntax Hint: In Python, 'True' must start with a capital 'T'!";
  }
  if (/\bfalse\b/.test(trimmed)) {
    return "Syntax Hint: In Python, 'False' must start with a capital 'F'!";
  }
  if (/\bnull\b/.test(trimmed)) {
    return "Syntax Hint: In Python, use 'None' instead of 'null'.";
  }
  if (/^(if|while)\s+[a-zA-Z_]\w*\s*=[^=].*:?$/.test(trimmed)) {
     return "Syntax Error! You are using '=' (assignment) inside a condition. You probably meant '==' (equality check).";
  }
  const blockStartMatch = trimmed.match(/^(if|for|while|def|class|elif|else)\b(.*)$/);
  if (blockStartMatch) {
    const keyword = blockStartMatch[1];
    const rest = blockStartMatch[2];
    if (!trimmed.endsWith(":") && rest.trim().length > 2) {
      return `Looks like you are writing a '${keyword}' block. Don't forget to put a colon ':' at the very end!`;
    }
  }

  // 0.5 standalone type typing
  if (trimmed === "int") return "You are writing 'int'. This stands for Integer (a whole number).";
  if (trimmed === "str") return "You are writing 'str'. This stands for String (text wrapped in quotes).";
  if (trimmed === "float") return "You are writing 'float'. This stands for a decimal number.";

  // 1. Variable assignment (e.g. name = "Alice", age = 20)
  // Lenient match: anything = anything
  const varMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)$/);
  if (varMatch) {
    const varName = varMatch[1];
    const value = varMatch[2];
    
    if (!value) {
      return `You are creating a storage box named '${varName}'. What value do you want to put inside it?`;
    }
    if (value.startsWith("input(")) {
      return `You are creating a storage box named '${varName}'. It will wait for the user to type something, and store their answer in it.`;
    }
    if (value.startsWith("int(")) {
      return `You are creating a storage box named '${varName}'. You are forcing its value to be an Integer (a whole number).`;
    }
    if (value.startsWith("str(")) {
      return `You are creating a storage box named '${varName}'. You are forcing its value to be a String (text).`;
    }
    if (value.startsWith("float(")) {
      return `You are creating a storage box named '${varName}'. You are forcing its value to be a Float (a decimal number).`;
    }
    return `You are creating a storage box named '${varName}' and putting the value ${value} inside it.`;
  }

  // 2. Print statements (lenient: print(something )
  const printMatch = trimmed.match(/^print\((.*)\)?$/);
  if (printMatch && trimmed.startsWith("print")) {
    let content = printMatch[1];
    if (content.endsWith(")")) content = content.slice(0, -1); // remove trailing paren if matched
    if (!content) return "You are telling the computer to print something to the screen. Type what you want to show inside the parentheses.";
    
    if (!content.startsWith('"') && !content.startsWith("'") && isNaN(content)) {
      if (/^[a-zA-Z_]\w*$/.test(content)) {
        return `You are printing '${content}'. If '${content}' is text, put quotes around it like "${content}". If it's a variable, make sure you created it!`;
      } else if (/^[a-zA-Z_]\w*(\s+[a-zA-Z_]\w*)+$/.test(content)) {
        return `Syntax Error! You are trying to print text: ${content}. You must put quotes around it like "${content}"!`;
      }
    }
    
    return `You are telling the computer to show ${content} on the screen.`;
  }

  // 3. For loops (lenient: missing colon or incomplete)
  const forMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s*(.*)$/);
  if (forMatch) {
    const iterator = forMatch[1];
    let collection = forMatch[2];
    if (collection.endsWith(":")) collection = collection.slice(0, -1);
    
    if (!collection) {
      return `You are starting a loop. For each '${iterator}' inside... (type the collection name next!)`;
    }
    if (collection.startsWith("range(")) {
      return `You are starting a loop that will repeat a specific number of times. It will use '${iterator}' to keep track of the count.`;
    }
    return `You are starting a loop. For every single item inside '${collection}', you will call it '${iterator}' and do something with it.`;
  }

  // 4. While loops
  const whileMatch = trimmed.match(/^while\s+(.*)$/);
  if (whileMatch) {
    let condition = whileMatch[1];
    if (condition.endsWith(":")) condition = condition.slice(0, -1);
    if (!condition) return "You are starting a loop that will keep repeating over and over AS LONG AS... (type a condition)";
    return `You are starting a loop that will keep repeating over and over AS LONG AS ${condition} is True.`;
  }

  // 5. If/Elif/Else statements
  const ifMatch = trimmed.match(/^if\s+(.*)$/);
  if (ifMatch) {
    let condition = ifMatch[1];
    if (condition.endsWith(":")) condition = condition.slice(0, -1);
    if (!condition) return "You are asking a Yes/No question. IF... (type your condition)";
    return `You are asking a Yes/No question: IF ${condition} is True, the computer will run the indented code below it.`;
  }
  
  const elifMatch = trimmed.match(/^elif\s+(.*)$/);
  if (elifMatch) {
    let condition = elifMatch[1];
    if (condition.endsWith(":")) condition = condition.slice(0, -1);
    if (!condition) return "If the previous question was False, you are asking a NEW question. IF... (type your condition)";
    return `If the previous question was False, you are asking a NEW question: IF ${condition} is True, run the code below.`;
  }

  if (trimmed.startsWith("else")) {
    return "This is the 'Otherwise' path. If all the previous questions were False, the computer will run the indented code below this.";
  }

  // 6. Functions
  const defMatch = trimmed.match(/^def\s+([a-zA-Z_]\w*)\(?(.*)\)?:?$/);
  if (defMatch) {
    const name = defMatch[1];
    let params = defMatch[2];
    if (params && params.endsWith("):")) params = params.slice(0, -2);
    if (params && params.endsWith(")")) params = params.slice(0, -1);
    
    if (params) {
      return `You are creating a brand new, custom command named '${name}'. It expects to receive this information when used: ${params}.`;
    }
    return `You are creating a brand new, custom command named '${name}'.`;
  }

  if (trimmed.startsWith("return")) {
    const returnVal = trimmed.replace("return", "").trim();
    if (returnVal) return `This ends your custom command and sends the value '${returnVal}' back to whoever asked for it.`;
    return `This ends your custom command.`;
  }

  // 7. Classes
  const classMatch = trimmed.match(/^class\s+([a-zA-Z_]\w*):?$/);
  if (classMatch) {
    return `You are creating a Blueprint (a Class) named '${classMatch[1]}'. This blueprint can be used to create objects.`;
  }

  if (trimmed.includes("def __init__")) {
    return `This is the setup area (constructor) for your blueprint. It runs automatically every time you create a new object.`;
  }

  // 8. Lists / Arrays operations
  if (trimmed.includes(".append(")) {
    return "You are adding a new item to the very end of your list.";
  }

  // 9. Imports
  const importMatch = trimmed.match(/^import\s+(.+)$/);
  if (importMatch) {
    return `You are bringing in external tools from the '${importMatch[1]}' library so you can use them in your program.`;
  }

  // 10. Default fallback for typing random words
  return "You are writing Python code. Keep typing to see what it does!";
}
