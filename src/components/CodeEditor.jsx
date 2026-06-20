import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Sparkles } from 'lucide-react';
import { pythonDocs } from '../data/pythonDocs';
import { translatePythonLine } from '../lib/liveTranslator';

export default function CodeEditor({ code, setCode, onRun, isRunning }) {
  const hoverProviderRef = useRef(null);
  const editorRef = useRef(null);
  const [translation, setTranslation] = useState("Waiting for code...");

  const updateTranslation = (editor) => {
    const position = editor.getPosition();
    if (position) {
      const lineContent = editor.getModel().getLineContent(position.lineNumber);
      setTranslation(translatePythonLine(lineContent));
    }
  };

  const handleEditorChange = (value) => {
    setCode(value || "");
    if (editorRef.current) {
      updateTranslation(editorRef.current);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Initial translation
    updateTranslation(editor);

    // Listeners for cursor moves and typing
    editor.onDidChangeCursorPosition(() => {
      updateTranslation(editor);
    });

    editor.onDidChangeModelContent(() => {
      updateTranslation(editor);
    });

    // Only register the hover provider once
    if (!hoverProviderRef.current) {
      hoverProviderRef.current = monaco.languages.registerHoverProvider('python', {
        provideHover: function (model, position) {
          const wordInfo = model.getWordAtPosition(position);
          if (wordInfo) {
            const word = wordInfo.word;
            const doc = pythonDocs[word];
            if (doc) {
              return {
                range: new monaco.Range(
                  position.lineNumber, 
                  wordInfo.startColumn, 
                  position.lineNumber, 
                  wordInfo.endColumn
                ),
                contents: [
                  { value: `**${word}**` },
                  { value: doc.description },
                  { value: `[📖 Read more on official docs](${doc.link})` }
                ]
              };
            }
          }
          return null;
        }
      });
    }
  };

  return (
    <div className="editor-container" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div className="editor-header">
        <span className="file-name">main.py</span>
        <button 
          className={`run-button ${isRunning ? 'running' : ''}`} 
          onClick={onRun}
          disabled={isRunning}
        >
          <Play size={16} />
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <div className="editor-wrapper" style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Inter', monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>
      <div className="live-translator-panel">
        <div className="translator-header">
          <Sparkles size={16} className="text-yellow-400" />
          <span>Live Translator</span>
        </div>
        <p className="translator-text">{translation}</p>
      </div>
    </div>
  );
}
