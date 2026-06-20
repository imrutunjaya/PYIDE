export async function generateNextLesson(currentLessons) {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  // Create a summary of what the user has learned
  const learnedTopics = currentLessons.map(l => l.title).join(", ");
  
  const prompt = `
You are an expert Python AI Teacher.
The student has just completed a series of interactive Python micro-lessons.
Here are the exact topics they have learned so far:
[${learnedTopics}]

Your task is to dynamically generate the NEXT logical advanced topic for them to learn. It MUST be a brand new topic they haven't seen yet.

You must return ONLY a raw JSON object that strictly follows this interface. Do not include markdown blocks or any other text.
{
  "title": "Lesson X: [Topic Name]",
  "category": "Step X: AI Generated Advanced",
  "difficulty": "Advanced",
  "theory": "### The AI Teacher says:\\n\\n[A detailed, engaging explanation of the concept.]",
  "howToStart": "1. [Step 1]\\n2. [Step 2]",
  "preWrittenCode": "[The complete valid Python code demonstrating the concept]",
  "lineExplanations": {
    "1": "[Explanation for line 1]",
    "2": "[Explanation for line 2]"
  },
  "instructions": "[A short instruction on what the user should run or modify]",
  "initialCode": "# Try it out:\\n"
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      throw new Error("Failed to connect to AI Teacher. Please check your API Key.");
    }

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;
    
    // Clean up any potential markdown formatting the AI might still include
    text = text.replace(/^```json/m, '').replace(/^```/m, '').trim();

    const newLesson = JSON.parse(text);
    // Assign a unique ID
    newLesson.id = "ai-generated-" + Date.now();
    return newLesson;

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export async function explainPythonError(code, errorMessage) {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const prompt = `
You are an expert Python AI Teacher helping a beginner student.
They just ran the following Python code and got an error.

CODE:
\`\`\`python
${code}
\`\`\`

ERROR:
\`\`\`
${errorMessage}
\`\`\`

Explain exactly what this error means in very simple, plain English (no jargon).
Then, explicitly tell them how they can fix it.
Format your response with a friendly tone. Use markdown.
Do NOT give them the entire rewritten code, just tell them which line is wrong and what to change.
`;

  try {
    const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${apiKey}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.4,
        }
      })
    });

    if (!response.ok) {
      throw new Error("Failed to connect to AI Teacher.");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("AI Error Explanation failed:", error);
    throw error;
  }
}

