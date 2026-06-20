import fs from 'fs';

const lessons = [
  // BEGINNER
  {
    id: "micro-1", title: "Lesson 1: Hello Computer", category: "Step 1: The Absolute Basics", difficulty: "Basic",
    theory: "### The Teacher says: Welcome!\\n\\nRight now, the computer is waiting for you to tell it what to do. But it only understands code. Let's make it speak!\\n\\nWe use a special command called `print()`. Whatever you put inside the parentheses `()` will show up on the screen.",
    howToStart: "1. Type the word `print`\\n2. Open a parenthesis `(`\\n3. Type a number, like `1`\\n4. Close the parenthesis `)`",
    preWrittenCode: "print(1)",
    lineExplanations: { 1: "The print() command tells the computer to show whatever is inside the parentheses on the screen." },
    instructions: "In the editor on the right, type exactly: `print(1)` and then click the green **Run Code** button.",
    initialCode: "# Type your code here, then click Run Code:\\n"
  },
  {
    id: "micro-2", title: "Lesson 2: Talking with Text", category: "Step 1: The Absolute Basics", difficulty: "Basic",
    theory: "### The Teacher says: Great job!\\n\\nYou just printed a number. But what if you want to print a word, like your name?\\n\\nIf you just type `print(Hello)`, the computer gets confused. It thinks 'Hello' is a secret code it hasn't learned yet. To tell the computer 'this is just normal text', you must wrap the text in quotes `\"`.",
    howToStart: "1. Type `print(`\\n2. Type a quote `\"`\\n3. Type the word `Hello`\\n4. Type another quote `\"`\\n5. Type `)`",
    preWrittenCode: "print(\"Hello\")",
    lineExplanations: { 1: "The quotes around \"Hello\" tell the computer: 'Don't try to understand this word, just print it out exactly as it is.' This is called a String." },
    instructions: "Type `print(\"Hello\")` in the editor and run it.",
    initialCode: "# Type your code here:\\n"
  },
  {
    id: "micro-3", title: "Lesson 3: The Storage Box", category: "Step 2: Remembering Things", difficulty: "Basic",
    theory: "### The Teacher says: Computers need memory!\\n\\nImagine you have a cardboard box. You write the word `age` on the outside of the box with a marker. Then, you put the number `20` inside the box.\\n\\nIn Python, we do this using the equals sign `=`. We call these boxes **Variables**.",
    howToStart: "1. Write the name of your box on the left (e.g., `age`).\\n2. Write an equals sign `=`.\\n3. Write what goes inside the box on the right (e.g., `20`).",
    preWrittenCode: "age = 20\\nprint(age)",
    lineExplanations: { 1: "Creates a storage box named 'age' and puts the number 20 inside it.", 2: "Looks inside the box named 'age' and prints whatever is inside (20)." },
    instructions: "Create a box called `age`, put a number in it, and then `print(age)`.",
    initialCode: "# Create your variable and print it:\\n"
  },
  {
    id: "micro-4", title: "Lesson 4: Doing Math", category: "Step 3: Doing Work", difficulty: "Basic",
    theory: "### The Teacher says: Computers are calculators!\\n\\nYou can ask the computer to do math for you. You can use `+` for addition, `-` for subtraction, `*` for multiplication, and `/` for division.\\n\\nYou can even store the result in a box!",
    howToStart: "1. Create a box named `result`.\\n2. Put a math problem inside it: `result = 10 + 5`.\\n3. Print the result.",
    preWrittenCode: "result = 10 + 5\\nprint(result)",
    lineExplanations: { 1: "Calculates 10 + 5, gets 15, and stores the 15 inside the 'result' box.", 2: "Prints the number 15." },
    instructions: "Try some math. Create a variable `total = 100 * 2` and print it.",
    initialCode: "# Do some math:\\n"
  },
  {
    id: "micro-5", title: "Lesson 5: Making a Decision", category: "Step 4: Logic", difficulty: "Basic",
    theory: "### The Teacher says: Branching paths!\\n\\nNow we can tell the computer to do different things based on a condition. We use the `if` statement for this.\\n\\n**Crucial rule:** The code inside the `if` block MUST be indented (pushed to the right by spaces).",
    howToStart: "1. Use the word `if`\\n2. Ask a question, like `age > 18`\\n3. End the line with a colon `:`\\n4. Go to the next line and indent (press Tab).\\n5. Write what should happen.",
    preWrittenCode: "age = 20\\nif age > 18:\\n    print(\"You are an adult!\")",
    lineExplanations: { 1: "Stores 20 in 'age'.", 2: "Checks if age is greater than 18. The colon ':' means 'If true, do the indented stuff below'.", 3: "Because it is indented, this line ONLY runs if line 2 is True." },
    instructions: "Write an `if` statement to check if a score is greater than 90, and if so, print 'A grade!'.",
    initialCode: "score = 95\\n# Write your if statement below:\\n"
  },
  // INTERMEDIATE
  {
    id: "micro-6", title: "Lesson 6: The List Collection", category: "Step 5: Intermediate", difficulty: "Intermediate",
    theory: "### The Teacher says: What if we have many items?\\n\\nInstead of creating 10 different variables for 10 apples, we can put them all in a single Collection called a **List**. We use square brackets `[]` for lists.",
    howToStart: "1. Create a variable called `fruits`.\\n2. Assign it a list: `[\"apple\", \"banana\"]`",
    preWrittenCode: "fruits = [\"apple\", \"banana\"]\\nprint(fruits)",
    lineExplanations: { 1: "Creates a list containing two string items and stores it in the 'fruits' variable.", 2: "Prints the whole list." },
    instructions: "Create a list of your 3 favorite numbers and print it.",
    initialCode: "# Create a list:\\n"
  },
  {
    id: "micro-7", title: "Lesson 7: Adding to a List", category: "Step 5: Intermediate", difficulty: "Intermediate",
    theory: "### The Teacher says: Lists can grow!\\n\\nYou can add items to an existing list by using the `.append()` command.",
    howToStart: "1. Make a list.\\n2. Use the name of the list, a dot, and `append(\"new item\")`.",
    preWrittenCode: "fruits = [\"apple\"]\\nfruits.append(\"banana\")\\nprint(fruits)",
    lineExplanations: { 1: "Creates a list with one item.", 2: "Adds 'banana' to the very end of the list.", 3: "Prints the new list, which now has two items." },
    instructions: "Create a list, append an item to it, and print it.",
    initialCode: "# Append to a list:\\n"
  },
  {
    id: "micro-8", title: "Lesson 8: The For Loop", category: "Step 5: Intermediate", difficulty: "Intermediate",
    theory: "### The Teacher says: Doing things repeatedly!\\n\\nIf you want to print every item in a list, you don't need to write `print()` 100 times. You use a `for` loop!",
    howToStart: "1. Create a list.\\n2. Write `for item in list_name:`\\n3. Indent and write what to do with `item`.",
    preWrittenCode: "fruits = [\"apple\", \"banana\", \"cherry\"]\\nfor fruit in fruits:\\n    print(fruit)",
    lineExplanations: { 1: "Creates a list of 3 fruits.", 2: "Starts a loop. It pulls out the first item, calls it 'fruit', and runs the indented code. Then repeats for the next item.", 3: "Prints whatever item is currently pulled out." },
    instructions: "Create a list of colors and loop through them, printing each one.",
    initialCode: "# Create a for loop:\\n"
  },
  {
    id: "micro-9", title: "Lesson 9: The Dictionary", category: "Step 5: Intermediate", difficulty: "Intermediate",
    theory: "### The Teacher says: Key and Value pairs!\\n\\nA list is just a sequence of items. A **Dictionary** stores data in pairs, like a real dictionary (a Word and its Definition). We use curly braces `{}`.",
    howToStart: "1. Create a variable: `person = {}`\\n2. Put pairs inside: `{\"name\": \"Alice\", \"age\": 25}`",
    preWrittenCode: "person = {\"name\": \"Alice\", \"age\": 25}\\nprint(person[\"name\"])",
    lineExplanations: { 1: "Creates a Dictionary with two keys ('name' and 'age') and their corresponding values.", 2: "Looks inside the 'person' dictionary for the key 'name', and prints its value ('Alice')." },
    instructions: "Create a dictionary describing a car (brand, color) and print its brand.",
    initialCode: "# Create a dictionary:\\n"
  },
  // ADVANCED
  {
    id: "micro-10", title: "Lesson 10: Custom Commands (Functions)", category: "Step 6: Advanced", difficulty: "Advanced",
    theory: "### The Teacher says: Write your own commands!\\n\\nYou've been using `print()` which is a command built into Python. You can create your own commands using `def` (which stands for Define).",
    howToStart: "1. Write `def say_hello():`\\n2. Indent the code you want the command to run.\\n3. Un-indent and call your new command by typing `say_hello()`.",
    preWrittenCode: "def say_hello():\\n    print(\"Hello from my custom command!\")\\n\\nsay_hello()",
    lineExplanations: { 1: "Defines a new function named 'say_hello'.", 2: "The code that runs when 'say_hello' is called.", 3: "Blank space.", 4: "Actually executes the custom command you just created." },
    instructions: "Define a function called `greet` that prints 'Greetings!', and then call it.",
    initialCode: "# Define a function:\\n"
  },
  {
    id: "micro-11", title: "Lesson 11: Functions with Inputs", category: "Step 6: Advanced", difficulty: "Advanced",
    theory: "### The Teacher says: Passing information!\\n\\nJust like `print(1)` takes the number `1` as an input, your custom commands can take inputs too! These are called Parameters.",
    howToStart: "1. Write `def greet(name):`\\n2. Inside, use the `name` variable.\\n3. Call it: `greet(\"Alice\")`.",
    preWrittenCode: "def greet(name):\\n    print(\"Hello \" + name)\\n\\ngreet(\"Alice\")\\ngreet(\"Bob\")",
    lineExplanations: { 1: "Defines a function 'greet' that expects one piece of information, which it will temporarily call 'name'.", 2: "Prints 'Hello ' followed by whatever name was given.", 3: "Blank space.", 4: "Calls greet, giving it the string 'Alice'.", 5: "Calls greet again, this time giving it 'Bob'." },
    instructions: "Create a function that takes a number and prints it multiplied by 2.",
    initialCode: "# Define a function with inputs:\\n"
  },
  {
    id: "micro-12", title: "Lesson 12: Object Blueprints (Classes)", category: "Step 7: Mastery", difficulty: "Advanced",
    theory: "### The Teacher says: Welcome to Object-Oriented Programming!\\n\\nA Class is a blueprint for creating custom objects. If you want a program with 10 dogs, you don't make 10 variables. You make one `Dog` blueprint, and use it to create 10 dog objects!",
    howToStart: "1. Write `class Dog:`\\n2. Define what a dog can do (its methods).",
    preWrittenCode: "class Dog:\\n    def bark(self):\\n        print(\"Woof!\")\\n\\nmy_dog = Dog()\\nmy_dog.bark()",
    lineExplanations: { 1: "Creates a blueprint named 'Dog'.", 2: "Defines a capability (method) for this blueprint called 'bark'. The 'self' means 'the specific object doing the barking'.", 3: "Prints Woof.", 4: "Blank space.", 5: "Creates a brand new object using the Dog blueprint, and stores it in 'my_dog'.", 6: "Tells that specific object to use its bark capability." },
    instructions: "Create a Class called `Cat` with a `meow` capability, make a cat object, and tell it to meow.",
    initialCode: "# Create a class:\\n"
  }
];

const fileContent = "export const lessons = " + JSON.stringify(lessons, null, 2) + ";";

fs.writeFileSync('src/data/lessons.js', fileContent);
console.log("Successfully generated expanded micro-curriculum!");
