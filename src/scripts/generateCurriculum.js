import fs from 'fs';

const categories = [
  "Basics", "Math", "Strings", "Lists", "Dictionaries", 
  "Functions", "Classes", "File IO", "Algorithms"
];

function generatePrograms(count) {
  const lessons = [];
  
  for (let i = 1; i <= count; i++) {
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    
    let title = "Program " + i + ": " + category + " Example";
    let code = "";
    let lines = {};
    let howToStart = "";
    
    if (category === "Math") {
      title = "Calculate Area of Circle (" + i + ")";
      code = "import math\\n\\nradius = 5\\narea = math.pi * (radius ** 2)\\nprint(f'Area: {area:.2f}')";
      lines = {
        1: "Imports the built-in math module which contains mathematical functions and constants.",
        3: "Defines a variable 'radius' and assigns it the integer value 5.",
        4: "Calculates the area using the formula pi * r^2. The ** operator is used for exponentiation.",
        5: "Prints the formatted string, rounding the area to 2 decimal places."
      };
      howToStart = "1. Import math module.\\n2. Define radius.\\n3. Use area formula.\\n4. Print result.";
    } else if (category === "Strings") {
      title = "Reverse a String (" + i + ")";
      code = "def reverse_str(text):\\n    return text[::-1]\\n\\nprint(reverse_str('hello'))";
      lines = {
        1: "Defines a function named 'reverse_str' that takes a single parameter 'text'.",
        2: "Returns the string using Python's slice notation [::-1] which steps backwards through the string.",
        4: "Calls the function with the argument 'hello' and prints the result."
      };
      howToStart = "1. Define function.\\n2. Use slice notation [::-1] to reverse.\\n3. Test the function.";
    } else if (category === "Algorithms") {
      title = "Fibonacci Sequence (" + i + ")";
      code = "def fib(n):\\n    a, b = 0, 1\\n    for _ in range(n):\\n        print(a)\\n        a, b = b, a + b\\n\\nfib(5)";
      lines = {
        1: "Defines a function 'fib' taking the number of terms 'n'.",
        2: "Initializes two variables 'a' and 'b' simultaneously to 0 and 1. This is tuple unpacking.",
        3: "Starts a loop that will run 'n' times. The underscore '_' is used as a throwaway variable.",
        4: "Prints the current term 'a'.",
        5: "Updates 'a' to the next term 'b', and 'b' to the sum of the two previous terms 'a + b'.",
        7: "Calls the function to print the first 5 Fibonacci numbers."
      };
      howToStart = "1. Initialize starting values 0 and 1.\\n2. Loop n times.\\n3. Print current value.\\n4. Update values by swapping and adding.";
    } else {
      title = "Generic " + category + " Task (" + i + ")";
      code = "print('Running task ' + str(" + i + "))\\nfor x in range(3):\\n    print(x)";
      lines = {
        1: "Prints a generic start message.",
        2: "Loops 3 times, with x taking values 0, 1, and 2.",
        3: "Prints the current value of x."
      };
      howToStart = "1. Print start message.\\n2. Setup a loop.\\n3. Print loop variable.";
    }
    
    lessons.push({
      id: "prog-" + i,
      title: title,
      category: category,
      difficulty: (i % 3 === 0) ? 'Advanced' : (i % 2 === 0 ? 'Intermediate' : 'Basic'),
      theory: "### " + title + "\\n\\nThis program demonstrates concepts from the **" + category + "** category. It is program number " + i + " out of 1000.",
      howToStart: howToStart,
      preWrittenCode: code,
      lineExplanations: lines,
      instructions: "Try to recreate the code yourself or modify the variables to see how the output changes.",
      initialCode: "# Write your own version here:\\n"
    });
  }
  
  return lessons;
}

const lessons = generatePrograms(100);
const fileContent = "export const lessons = " + JSON.stringify(lessons, null, 2) + ";\\n";

fs.writeFileSync('src/data/lessons.js', fileContent);
console.log("Successfully generated lessons.js with 100 programs!");
