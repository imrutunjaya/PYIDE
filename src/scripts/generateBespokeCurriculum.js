import fs from 'fs';

const lessons = [
  {
    id: "intro-1",
    title: "1. Introduction to the IDE",
    category: "Getting Started",
    difficulty: "Basic",
    theory: "### Welcome to Python Master!\\n\\nWelcome to your interactive Python learning environment. This IDE (Integrated Development Environment) has three main parts:\\n\\n1. **Theory & Task (Here):** Read the concepts and your goal.\\n2. **Line-by-Line Walkthrough:** Click the tab above to see a pre-written solution. Click on any line of code to see exactly what it does!\\n3. **Editor (Right side):** Write your Python code here and click 'Run Code' to see the output below.\\n\\nLet's write our first program!",
    howToStart: "1. Read the instructions.\\n2. Look at the Editor on the right.\\n3. Type your code.\\n4. Click 'Run Code'.",
    preWrittenCode: "print('Welcome to Python!')",
    lineExplanations: {
      1: "The print() function outputs the text inside the parentheses to the screen. The text is enclosed in quotes, meaning it is a String."
    },
    instructions: "In the editor on the right, type exactly: `print('Hello World!')` and then click **Run Code**.",
    initialCode: "# Type your code below and click Run Code:\n"
  },
  {
    id: "chap4-1",
    title: "2. Your First Application",
    category: "Chapter 4: Writing Your First Application",
    difficulty: "Basic",
    theory: "### Comments and Output\\n\\nWhen writing applications, you need to leave notes for yourself or other programmers. These are called **comments**. In Python, any line starting with a `#` is ignored by the computer.\\n\\nYou also need to output information to the user using `print()`.",
    howToStart: "1. Start by writing a comment to describe the program.\\n2. Use the print() function to say something.",
    preWrittenCode: "# This program says hello\nprint('Hello, Python Programmer!')\n# The computer ignores this line",
    lineExplanations: {
      1: "This is a comment. It starts with '#' and is completely ignored by Python. It's just for humans to read.",
      2: "This prints the text to the terminal.",
      3: "Another comment that does nothing when the program runs."
    },
    instructions: "Write a comment describing yourself, then print your name.",
    initialCode: "# Write your comment below:\n\n"
  },
  {
    id: "chap5-1",
    title: "3. Variables as Storage Boxes",
    category: "Chapter 5: Storing Information",
    difficulty: "Basic",
    theory: "### Storing Information\\n\\nThink of a **variable** as a storage box with a label on it. You can put data into the box and use the label to find it later.\\n\\nData can be numbers (Integers or Floats), text (Strings), or true/false values (Booleans).",
    howToStart: "1. Create a variable for a name (string).\\n2. Create a variable for an age (integer).\\n3. Print them out.",
    preWrittenCode: "my_name = 'Alice'\nmy_age = 25\n\nprint(my_name)\nprint(my_age)",
    lineExplanations: {
      1: "Creates a variable (storage box) named 'my_name' and puts the string 'Alice' inside it.",
      2: "Creates a variable named 'my_age' and puts the integer 25 inside it.",
      4: "Finds the box labeled 'my_name', takes out the data ('Alice'), and prints it.",
      5: "Finds the box labeled 'my_age', takes out the data (25), and prints it."
    },
    instructions: "Create variables for your favorite color and your lucky number, then print them.",
    initialCode: "# Create your variables:\n\n"
  },
  {
    id: "chap6-1",
    title: "4. Operators and Comparisons",
    category: "Chapter 6: Managing Information",
    difficulty: "Basic",
    theory: "### Making Comparisons\\n\\nComputers are great at comparing things. You can use operators like `>` (greater than), `<` (less than), or `==` (equal to) to compare values. The result is always a Boolean (`True` or `False`).",
    howToStart: "1. Define two numbers.\\n2. Compare them using the > operator.\\n3. Print the result of the comparison.",
    preWrittenCode: "score = 95\npassing_score = 60\n\nis_passing = score > passing_score\nprint('Did I pass?')\nprint(is_passing)",
    lineExplanations: {
      1: "Assigns 95 to the variable 'score'.",
      2: "Assigns 60 to 'passing_score'.",
      4: "Compares score (95) and passing_score (60). Since 95 is greater than 60, this evaluates to True. It stores True in 'is_passing'.",
      5: "Prints a simple string.",
      6: "Prints the Boolean value stored in 'is_passing', which is True."
    },
    instructions: "Create a variable `my_height` and `req_height`. Compare if `my_height` is greater than or equal to (`>=`) `req_height` and print the result.",
    initialCode: "# Compare your heights:\n\n"
  },
  {
    id: "chap7-1",
    title: "5. The if...else Statement",
    category: "Chapter 7: Making Decisions",
    difficulty: "Intermediate",
    theory: "### Making Decisions\\n\\nPrograms need to make decisions. The `if` statement checks a condition. If it is True, it runs the code indented underneath it. If it is False, it skips it and runs the `else` block.",
    howToStart: "1. Create a variable.\\n2. Use 'if' to check a condition.\\n3. Indent the code that should run if True.\\n4. Use 'else' and indent the code that runs if False.",
    preWrittenCode: "weather = 'raining'\n\nif weather == 'raining':\n    print('Take an umbrella!')\nelse:\n    print('Enjoy the sunshine!')",
    lineExplanations: {
      1: "Stores the string 'raining' in the variable 'weather'.",
      3: "Checks if the value of 'weather' is exactly equal to 'raining'. The colon `:` means a block of code is starting.",
      4: "This line is INDENTED. It only runs if the condition on line 3 is True.",
      5: "The 'else' block catches any case where the condition is False.",
      6: "This runs if it is not raining."
    },
    instructions: "Write an if...else statement that checks if a variable `age` is 18 or older. If so, print 'Adult', otherwise print 'Minor'.",
    initialCode: "age = 15\n# Write your if...else statement below:\n\n"
  },
  {
    id: "chap8-1",
    title: "6. The for Statement",
    category: "Chapter 8: Repetitive Tasks",
    difficulty: "Intermediate",
    theory: "### Repetitive Tasks\\n\\nComputers excel at doing the same thing over and over. A `for` loop lets you repeat a block of code a specific number of times using `range()`, or for every item in a collection.",
    howToStart: "1. Use the 'for' keyword.\\n2. Create a temporary variable to hold the current item.\\n3. Use 'in range()' to specify how many times to loop.\\n4. Indent the code to repeat.",
    preWrittenCode: "for count in range(3):\n    print('Repeating task...')\n    print(count)",
    lineExplanations: {
      1: "Starts a loop. 'range(3)' generates numbers 0, 1, and 2. 'count' is a temporary variable that takes each of these values in turn.",
      2: "This line repeats 3 times.",
      3: "Prints the current value of 'count'. It will print 0, then 1, then 2."
    },
    instructions: "Write a for loop that repeats 5 times and prints the loop variable.",
    initialCode: "# Write your for loop:\n\n"
  },
  {
    id: "chap9-1",
    title: "7. Catching Exceptions",
    category: "Chapter 9: Dealing with Errors",
    difficulty: "Intermediate",
    theory: "### Handling Errors\\n\\nSometimes things go wrong (like trying to divide by zero). Instead of letting the program crash, you can 'catch' the error using a `try...except` block.",
    howToStart: "1. Put risky code inside a 'try' block.\\n2. Put fallback code inside an 'except' block.",
    preWrittenCode: "try:\n    result = 10 / 0\n    print(result)\nexcept ZeroDivisionError:\n    print('Error: You cannot divide by zero!')\n\nprint('Program continues normally...')",
    lineExplanations: {
      1: "Starts a block of code to test for errors.",
      2: "Attempts to divide 10 by 0. This causes a mathematical error (ZeroDivisionError) and immediately stops executing the try block.",
      3: "This line is skipped because an error occurred on line 2.",
      4: "Catches the specific ZeroDivisionError.",
      5: "Runs instead of crashing.",
      7: "The program didn't crash, so it reaches this line successfully."
    },
    instructions: "Wrap `print(unknown_variable)` in a try/except block to catch the `NameError` and print a nice message.",
    initialCode: "# Try to print an unknown variable:\n\n"
  },
  {
    id: "chap10-1",
    title: "8. Interacting with Modules",
    category: "Chapter 10: Modules",
    difficulty: "Intermediate",
    theory: "### Modules\\n\\nModules are pre-written code files you can import into your program to do complex tasks instantly. Python comes with many built-in modules.",
    howToStart: "1. Use 'import' to bring in a module.\\n2. Use module_name.function_name() to use it.",
    preWrittenCode: "import random\n\nlucky_number = random.randint(1, 100)\nprint('Your lucky number is:')\nprint(lucky_number)",
    lineExplanations: {
      1: "Imports the built-in 'random' module, giving you access to random number generators.",
      3: "Calls the 'randint' function from the 'random' module to pick a random integer between 1 and 100.",
      4: "Prints a string.",
      5: "Prints the random number."
    },
    instructions: "Import the `math` module and print the value of `math.pi`.",
    initialCode: "# Import math and print pi:\n\n"
  },
  {
    id: "chap11-1",
    title: "9. Slicing and Formatting Strings",
    category: "Chapter 11: Working with Strings",
    difficulty: "Advanced",
    theory: "### String Manipulation\\n\\nYou can extract parts of strings using 'slicing' `[start:stop]`, and format them easily using f-strings `f'Text {variable}'`.",
    howToStart: "1. Define a string.\\n2. Use square brackets to slice it.\\n3. Use an f-string to inject variables into a new string.",
    preWrittenCode: "alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'\nfirst_five = alphabet[0:5]\n\nmessage = f'The first five letters are: {first_five}'\nprint(message)",
    lineExplanations: {
      1: "Creates a string containing the alphabet.",
      2: "Slices the string. It takes characters from index 0 up to (but not including) index 5. Result: 'ABCDE'.",
      4: "Creates an f-string (formatted string). The 'f' at the start allows you to put variables directly inside curly braces {}.",
      5: "Prints the final message."
    },
    instructions: "Create a string `word = 'Programming'`. Slice the first 7 letters and use an f-string to print it.",
    initialCode: "word = 'Programming'\n# Slice and format:\n\n"
  },
  {
    id: "chap12-1",
    title: "10. Managing Lists",
    category: "Chapter 12: Lists",
    difficulty: "Advanced",
    theory: "### Lists\\n\\nLists store multiple items in a single variable. They are created using square brackets `[]` and you can add, remove, and change items.",
    howToStart: "1. Create a list with [] brackets.\\n2. Use .append() to add an item.\\n3. Use .sort() to sort it.\\n4. Loop through the list to print items.",
    preWrittenCode: "groceries = ['Apples', 'Milk', 'Bread']\ngroceries.append('Eggs')\ngroceries.sort()\n\nfor item in groceries:\n    print(f'Need to buy: {item}')",
    lineExplanations: {
      1: "Creates a list containing three string elements.",
      2: "Appends (adds) 'Eggs' to the end of the list.",
      3: "Sorts the list alphabetically in place.",
      5: "Loops over every item in the list.",
      6: "Prints each item using an f-string."
    },
    instructions: "Create a list of 3 animals. Append one more, then print the entire list.",
    initialCode: "# Create and modify a list:\n\n"
  },
  {
    id: "chap13-1",
    title: "11. Working with Dictionaries",
    category: "Chapter 13: Collecting Data",
    difficulty: "Advanced",
    theory: "### Dictionaries\\n\\nDictionaries store data in key-value pairs (like a real dictionary mapping words to definitions). Created using curly braces `{}`.",
    howToStart: "1. Create a dictionary with {'key': 'value'}.\\n2. Access data using dict['key'].\\n3. Add new data the same way.",
    preWrittenCode: "student = {\n    'name': 'Bob',\n    'grade': 'A'\n}\n\nstudent['age'] = 20\nprint(f\"{student['name']} is {student['age']} years old.\")",
    lineExplanations: {
      1: "Starts defining a dictionary named 'student'.",
      2: "Key 'name' maps to value 'Bob'.",
      3: "Key 'grade' maps to value 'A'.",
      6: "Adds a new key 'age' with the integer value 20 to the dictionary.",
      7: "Accesses the dictionary values using their keys inside an f-string to print a sentence."
    },
    instructions: "Create a dictionary describing a car (make, model). Add a 'year' key, then print the dictionary.",
    initialCode: "# Create your dictionary:\n\n"
  },
  {
    id: "chap14-1",
    title: "12. Creating Classes",
    category: "Chapter 14: Classes",
    difficulty: "Advanced",
    theory: "### Object-Oriented Programming\\n\\nA Class is a blueprint for creating objects. Objects bundle data (attributes) and behavior (methods) together.",
    howToStart: "1. Use the 'class' keyword.\\n2. Define the __init__ method to set up attributes.\\n3. Define a custom method to do something.\\n4. Create an instance (object) from the class.",
    preWrittenCode: "class Dog:\n    def __init__(self, name):\n        self.name = name\n        \n    def bark(self):\n        print(f'{self.name} says Woof!')\n\nmy_dog = Dog('Buddy')\nmy_dog.bark()",
    lineExplanations: {
      1: "Defines a new class named 'Dog'.",
      2: "The __init__ method is a special 'constructor' that runs automatically when a new Dog is created. 'self' refers to the specific dog being created.",
      3: "Saves the passed 'name' into the object's memory.",
      5: "Defines a method (behavior) named 'bark'.",
      6: "Prints a message using the dog's name.",
      8: "Creates an instance of Dog, naming it 'Buddy', and stores it in 'my_dog'.",
      9: "Calls the bark method on our specific dog."
    },
    instructions: "Create a `Cat` class with an `__init__` that takes a name, and a `meow()` method. Create a cat and make it meow.",
    initialCode: "# Define your class:\n\n"
  }
];

const fileContent = "export const lessons = " + JSON.stringify(lessons, null, 2) + ";";

fs.writeFileSync('src/data/lessons.js', fileContent);
console.log("Successfully generated bespoken lessons.js!");
