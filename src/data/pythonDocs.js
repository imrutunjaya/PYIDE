export const pythonDocs = {
  // Keywords
  "def": {
    description: "The \`def\` keyword is used to define a new function. Functions are blocks of reusable code.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions"
  },
  "class": {
    description: "The \`class\` keyword is used to create a new user-defined object type (a blueprint for objects).",
    link: "https://docs.python.org/3/tutorial/classes.html"
  },
  "return": {
    description: "The \`return\` statement exits a function and optionally passes back an expression to the caller.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-return-statement"
  },
  "if": {
    description: "The \`if\` statement is used for conditional execution.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-if-statement"
  },
  "elif": {
    description: "Short for 'else if', it allows checking multiple expressions for TRUE and executing a block of code as soon as one of the conditions evaluates to TRUE.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-if-statement"
  },
  "else": {
    description: "Executes a block of code if none of the preceding \`if\` or \`elif\` conditions are true.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-if-statement"
  },
  "for": {
    description: "The \`for\` loop is used for iterating over a sequence (like a list, tuple, dictionary, set, or string).",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-for-statement"
  },
  "while": {
    description: "The \`while\` loop executes a set of statements as long as a condition is true.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-while-statement"
  },
  "import": {
    description: "The \`import\` statement is used to import modules into the current namespace.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-import-statement"
  },
  "from": {
    description: "Used with \`import\` to specify a specific part of a module to import.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-import-statement"
  },
  "try": {
    description: "The \`try\` block lets you test a block of code for errors.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-try-statement"
  },
  "except": {
    description: "The \`except\` block lets you handle the error generated in the \`try\` block.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-try-statement"
  },
  "finally": {
    description: "The \`finally\` block executes code regardless of the result of the try- and except blocks.",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-try-statement"
  },
  "with": {
    description: "The \`with\` statement simplifies exception handling by encapsulating common preparation and cleanup tasks (Context Managers).",
    link: "https://docs.python.org/3/reference/compound_stmts.html#the-with-statement"
  },
  "yield": {
    description: "The \`yield\` statement suspends a function's execution and sends a value back to the caller, but retains enough state to enable the function to resume where it left off.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-yield-statement"
  },
  "pass": {
    description: "The \`pass\` statement is a null operation; nothing happens when it executes. It's used as a placeholder.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement"
  },
  "break": {
    description: "The \`break\` statement terminates the nearest enclosing loop, skipping the optional else clause if the loop has one.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-break-statement"
  },
  "continue": {
    description: "The \`continue\` statement continues with the next iteration of the loop.",
    link: "https://docs.python.org/3/reference/simple_stmts.html#the-continue-statement"
  },

  // Built-in functions
  "print": {
    description: "Prints the given object to the standard output device or to the text stream file.",
    link: "https://docs.python.org/3/library/functions.html#print"
  },
  "len": {
    description: "Return the length (the number of items) of an object.",
    link: "https://docs.python.org/3/library/functions.html#len"
  },
  "type": {
    description: "Returns the type of the specified object.",
    link: "https://docs.python.org/3/library/functions.html#type"
  },
  "range": {
    description: "Returns an immutable sequence of numbers from start to stop by step.",
    link: "https://docs.python.org/3/library/stdtypes.html#range"
  },
  "int": {
    description: "Returns an integer object constructed from a number or string.",
    link: "https://docs.python.org/3/library/functions.html#int"
  },
  "str": {
    description: "Returns a string version of an object.",
    link: "https://docs.python.org/3/library/functions.html#func-str"
  },
  "float": {
    description: "Returns a floating point number constructed from a number or string.",
    link: "https://docs.python.org/3/library/functions.html#float"
  },
  "list": {
    description: "Creates a list object, which is a mutable sequence.",
    link: "https://docs.python.org/3/library/functions.html#func-list"
  },
  "dict": {
    description: "Creates a new dictionary. A dictionary is a collection of key-value pairs.",
    link: "https://docs.python.org/3/library/functions.html#func-dict"
  },
  "set": {
    description: "Creates a new set object. A set is an unordered collection of unique elements.",
    link: "https://docs.python.org/3/library/functions.html#func-set"
  },
  "open": {
    description: "Opens a file and returns a corresponding file object.",
    link: "https://docs.python.org/3/library/functions.html#open"
  },
  "map": {
    description: "Return an iterator that applies a function to every item of an iterable, yielding the results.",
    link: "https://docs.python.org/3/library/functions.html#map"
  },
  "filter": {
    description: "Construct an iterator from those elements of an iterable for which a function returns true.",
    link: "https://docs.python.org/3/library/functions.html#filter"
  },
  "zip": {
    description: "Iterates over several iterables in parallel, producing tuples with an item from each one.",
    link: "https://docs.python.org/3/library/functions.html#zip"
  },
  "sum": {
    description: "Sums the items of an iterable from left to right and returns the total.",
    link: "https://docs.python.org/3/library/functions.html#sum"
  },
  "max": {
    description: "Return the largest item in an iterable or the largest of two or more arguments.",
    link: "https://docs.python.org/3/library/functions.html#max"
  },
  "min": {
    description: "Return the smallest item in an iterable or the smallest of two or more arguments.",
    link: "https://docs.python.org/3/library/functions.html#min"
  }
};
