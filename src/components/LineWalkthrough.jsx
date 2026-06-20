import React, { useState, useEffect } from 'react';
import { Lightbulb, Code2, PlaySquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LineWalkthrough({ code, explanations, howToStart }) {
  const [revealedLines, setRevealedLines] = useState(0);

  // Reset when code changes (new lesson)
  useEffect(() => {
    setRevealedLines(0);
  }, [code]);

  if (!code) return <div className="no-walkthrough">No walkthrough available for this program.</div>;

  const lines = code.split('\\n');
  const totalLines = lines.length;
  const isFinished = revealedLines >= totalLines;

  const handleNextStep = () => {
    if (revealedLines < totalLines) {
      setRevealedLines(prev => prev + 1);
    }
  };

  const handleRevealAll = () => {
    setRevealedLines(totalLines);
  };

  // Find the most recently revealed line that has an explanation to show
  let currentExplanation = null;
  let currentExplanationLineNum = null;
  for (let i = revealedLines; i > 0; i--) {
    if (explanations && explanations[i]) {
      currentExplanation = explanations[i];
      currentExplanationLineNum = i;
      break;
    }
  }

  return (
    <div className="walkthrough-container">
      {/* Step 1: The Master Plan */}
      <div className="how-to-start-section mb-24">
        <h3 className="how-to-title">
          <Lightbulb size={20} /> 
          The Master Plan (Before we write code)
        </h3>
        <div className="markdown-body model-box">
          <ReactMarkdown>{howToStart || "Let's figure out the logic first!"}</ReactMarkdown>
        </div>
      </div>

      {/* Step 2: The Progressive Builder */}
      <div className="line-explainer-section">
        <div className="builder-header">
          <h3 className="explainer-title">
            <Code2 size={20} /> 
            Building the Flow
          </h3>
          <span className="step-counter">
            Line {revealedLines} of {totalLines}
          </span>
        </div>
        
        {/* The Code Display */}
        <div className="code-display builder-display">
          {revealedLines === 0 ? (
            <div className="blank-canvas">
              The canvas is blank. Click "Reveal First Line" to begin constructing the program.
            </div>
          ) : (
            lines.slice(0, revealedLines).map((lineContent, index) => {
              const lineNum = index + 1;
              const isLatest = lineNum === revealedLines;
              
              return (
                <div 
                  key={lineNum} 
                  className={`code-line ${isLatest ? 'active-line' : 'dim-line'}`}
                >
                  <span className="line-number">{lineNum}</span>
                  <span className={`line-content ${isLatest ? 'text-highlight' : ''}`}>
                    {lineContent || ' '}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* The Dynamic Explanation Box */}
        <div className="dynamic-explanation-box">
          {revealedLines === 0 ? (
            <p className="waiting-text">Waiting to start...</p>
          ) : currentExplanation ? (
            <div>
              <h4 className="explanation-heading">Why did we just write Line {currentExplanationLineNum}?</h4>
              <p className="explanation-text">{currentExplanation}</p>
            </div>
          ) : (
            <p className="waiting-text">This line is just a continuation or empty space.</p>
          )}
        </div>

        {/* Builder Controls */}
        <div className="builder-controls">
          {!isFinished ? (
            <button 
              onClick={handleNextStep}
              className="reveal-btn"
            >
              <PlaySquare size={20} />
              {revealedLines === 0 ? "Reveal First Line" : "Reveal Next Line"}
            </button>
          ) : (
            <div className="finished-banner">
              Program Complete! Now try it yourself.
            </div>
          )}
          
          {!isFinished && revealedLines > 0 && (
            <button 
              onClick={handleRevealAll}
              className="reveal-all-btn"
            >
              Reveal All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
