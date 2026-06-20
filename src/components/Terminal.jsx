import React, { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal({ output }) {
  const endOfOutputRef = useRef(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <TerminalIcon size={16} />
        <span>Output Console</span>
      </div>
      <div className="terminal-output">
        {output ? (
          <pre>{output}</pre>
        ) : (
          <div className="terminal-placeholder">Run your code to see output here...</div>
        )}
        <div ref={endOfOutputRef} />
      </div>
    </div>
  );
}
