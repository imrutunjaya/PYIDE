import React, { useRef, useEffect, useState } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Terminal({ output, errorExplanation, isExplainingError, onEnableAi }) {
  const endOfOutputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('console');

  // Auto-switch to explainer tab when an error explanation starts loading or finishes
  useEffect(() => {
    if (isExplainingError || errorExplanation) {
      setActiveTab('explainer');
    } else {
      setActiveTab('console');
    }
  }, [isExplainingError, errorExplanation]);

  // Auto-scroll to bottom when output changes in console tab
  useEffect(() => {
    if (activeTab === 'console') {
      endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [output, activeTab]);

  return (
    <div className="terminal-container">
      <div className="terminal-tabs-header">
        <button 
          className={`term-tab-btn ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => setActiveTab('console')}
        >
          <TerminalIcon size={14} /> Output Console
        </button>
        
        {(errorExplanation || isExplainingError) && (
          <button 
            className={`term-tab-btn explainer-tab ${activeTab === 'explainer' ? 'active' : ''}`}
            onClick={() => setActiveTab('explainer')}
          >
            <Sparkles size={14} /> AI Explainer
          </button>
        )}
      </div>

      <div className="terminal-content-area">
        {activeTab === 'console' ? (
          <div className="terminal-output">
            {output ? (
              <pre>{output}</pre>
            ) : (
              <div className="terminal-placeholder">Run your code to see output here...</div>
            )}
            <div ref={endOfOutputRef} />
          </div>
        ) : (
          <div className="terminal-explainer-output markdown-body" style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
            {isExplainingError ? (
              <div className="flex items-center gap-2 text-yellow-400 font-medium" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 'bold' }}>
                <Sparkles className="animate-pulse" size={16} /> 
                Analyzing error...
              </div>
            ) : errorExplanation === "NO_API_KEY" ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h3 style={{ color: '#e2e8f0', marginBottom: '10px' }}>AI Error Explainer is Disabled</h3>
                <p style={{ color: '#888888', marginBottom: '20px' }}>To get simple English explanations of your coding errors, please provide your free Gemini API Key.</p>
                <button 
                  onClick={onEnableAi} 
                  style={{ background: '#eab308', color: '#000', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  <Sparkles size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                  Enable AI Teacher
                </button>
              </div>
            ) : (
              <ReactMarkdown>{errorExplanation || "No errors to explain."}</ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
