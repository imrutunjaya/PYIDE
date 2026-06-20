import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Target } from 'lucide-react';

export default function TheoryPanel({ lesson }) {
  if (!lesson) return null;

  return (
    <div className="theory-panel">
      <div className="theory-content">
        <span className={`badge badge-${lesson.difficulty.toLowerCase()}`}>
          {lesson.difficulty}
        </span>
        <h1>{lesson.title}</h1>
        
        <div className="markdown-body">
          <ReactMarkdown>{lesson.theory}</ReactMarkdown>
        </div>
      </div>
      
      <div className="instructions-panel">
        <div className="instructions-header">
          <Target size={18} className="text-green-400" />
          <h3>Your Task</h3>
        </div>
        <div className="markdown-body">
          <ReactMarkdown>{lesson.instructions}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
