import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TheoryPanel from './components/TheoryPanel';
import CodeEditor from './components/CodeEditor';
import Terminal from './components/Terminal';
import LineWalkthrough from './components/LineWalkthrough';
import BookSidebar from './components/BookSidebar';
import BookViewer from './components/BookViewer';
import { lessons as initialLessons } from './data/lessons';
import { books } from './data/books';
import { initPyodide, runPythonCode } from './lib/pyodideRunner';
import { generateNextLesson } from './lib/aiTeacher';
import { ChevronLeft, ChevronRight, BrainCircuit, Book } from 'lucide-react';
import './App.css';

function App() {
  const [appLessons, setAppLessons] = useState(initialLessons);
  const [activeLessonId, setActiveLessonId] = useState(initialLessons[0].id);
  const [code, setCode] = useState(initialLessons[0].initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [activeTab, setActiveTab] = useState('theory');
  
  // Dual-Mode Architecture States
  const [isAiTeacherActive, setIsAiTeacherActive] = useState(false); // Default to Book Mode
  const [activeBookId, setActiveBookId] = useState(books.length > 0 ? books[0].id : null);
  
  // Pro IDE States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default for books
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(true); // Open by default for books
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  const [leftPaneWidth, setLeftPaneWidth] = useState(40); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // Dropdown Menu States
  const [openMenu, setOpenMenu] = useState(null);

  // AI Teacher States
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");

  const activeLesson = appLessons.find(l => l.id === activeLessonId) || appLessons[0];
  const currentIndex = appLessons.findIndex(l => l.id === activeLessonId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === appLessons.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / appLessons.length) * 100);

  useEffect(() => {
    const setup = async () => {
      try {
        await initPyodide((msg) => {
          setOutput((prev) => prev + msg);
        });
        setIsPyodideReady(true);
      } catch (err) {
        console.error("Failed to load pyodide", err);
      }
    };
    setup();
  }, []);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Dragging logic for Resizer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 10 && newWidth < 90) {
        setLeftPaneWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.classList.add('dragging');
    } else {
      document.body.classList.remove('dragging');
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const startDragging = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleLessonChange = (lessonId) => {
    const lesson = appLessons.find(l => l.id === lessonId);
    if (lesson) {
      setActiveLessonId(lessonId);
      setCode(lesson.initialCode);
      setOutput('');
      setActiveTab('theory');
    }
  };

  const handleRunCode = async () => {
    if (!isPyodideReady) return;
    setIsTerminalOpen(true); // Auto-open terminal on run
    setIsRunning(true);
    setOutput('');
    await runPythonCode(code, (msg) => {
      setOutput((prev) => prev + msg);
    });
    setIsRunning(false);
  };

  const handleMenuClick = (menuName, e) => {
    e.stopPropagation();
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleGenerateAiLesson = async () => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setIsAiLoading(true);
    try {
      const newLesson = await generateNextLesson(appLessons);
      setAppLessons(prev => [...prev, newLesson]);
      
      // Auto-navigate to the new lesson and open panels so user can see it
      setActiveLessonId(newLesson.id);
      setCode(newLesson.initialCode);
      setActiveTab('theory');
      setIsAiTeacherActive(true);
      setIsSidebarOpen(true);
      setIsLeftPaneOpen(true);
      
    } catch (err) {
      alert("AI Generation failed: " + err.message);
      if (err.message.includes("API_KEY_MISSING") || err.message.includes("API Key")) {
        localStorage.removeItem('gemini_api_key');
        setShowApiKeyModal(true);
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', tempApiKey);
    setShowApiKeyModal(false);
    handleGenerateAiLesson();
  };

  return (
    <div className="app-container">
      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>AI Teacher Setup</h2>
            <p>To use the Infinite AI Teacher, you need a free Google Gemini API Key.</p>
            <input 
              type="password" 
              placeholder="Paste your Gemini API Key here..."
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="api-input"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowApiKeyModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={saveApiKey} className="save-btn">Save & Generate</button>
            </div>
            <p className="modal-help">
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
                Get a free API key here
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Conditionally Rendered Sidebar (Only in Book Mode) */}
      {!isAiTeacherActive && (
        <div className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="sidebar-inner" style={{ display: 'flex', flexDirection: 'column' }}>
            <BookSidebar 
              books={books}
              activeBookId={activeBookId}
              onSelectBook={setActiveBookId}
            />
          </div>
        </div>
      )}
      
      <main className="main-content">
        
        {/* IDE Menu Bar */}
        <div className="ide-menu-bar">
          <div className="ide-logo">PyIDE</div>
          
          <div className="menu-item-container">
            <button className="menu-btn" onClick={(e) => handleMenuClick('File', e)}>File</button>
            {openMenu === 'File' && (
              <div className="menu-dropdown">
                <div className="dropdown-item">New File</div>
                <div className="dropdown-item">Open File...</div>
                <div className="dropdown-item">Save</div>
              </div>
            )}
          </div>

          <div className="menu-item-container">
            <button className="menu-btn" onClick={(e) => handleMenuClick('View', e)}>View</button>
            {openMenu === 'View' && (
              <div className="menu-dropdown">
                {!isAiTeacherActive && (
                  <div className="dropdown-item" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? '✓ ' : '  '}Show Books Sidebar
                  </div>
                )}
                <div className="dropdown-item" onClick={() => setIsLeftPaneOpen(!isLeftPaneOpen)}>
                  {isLeftPaneOpen ? '✓ ' : '  '}Show Topic/Walkthrough Panel
                </div>
              </div>
            )}
          </div>

          <div className="menu-item-container">
            <button className="menu-btn" onClick={(e) => handleMenuClick('Run', e)}>Run</button>
            {openMenu === 'Run' && (
              <div className="menu-dropdown">
                <div className="dropdown-item" onClick={handleRunCode}>Run Code</div>
              </div>
            )}
          </div>

          <div className="menu-item-container">
            <button className="menu-btn" onClick={(e) => handleMenuClick('Terminal', e)}>Terminal</button>
            {openMenu === 'Terminal' && (
              <div className="menu-dropdown">
                <div className="dropdown-item" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
                  {isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}
                </div>
              </div>
            )}
          </div>

          <div className="menu-item-container ai-teacher-menu">
            <button 
              className={`menu-btn ai-btn ${isAiTeacherActive ? 'active' : ''}`} 
              onClick={(e) => handleMenuClick('AITeacher', e)}
              style={{ color: isAiTeacherActive ? '#a855f7' : '#cccccc' }}
            >
              <BrainCircuit size={14} style={{ marginRight: '4px', display: 'inline' }} />
              {isAiTeacherActive ? 'AI Teacher (ON)' : 'AI Teacher (OFF)'}
            </button>
            {openMenu === 'AITeacher' && (
              <div className="menu-dropdown">
                <div className="dropdown-item" onClick={() => setIsAiTeacherActive(!isAiTeacherActive)}>
                  {isAiTeacherActive ? "✓ Enabled" : "  Enable"}
                </div>
                <div className="dropdown-item" onClick={handleGenerateAiLesson}>
                  {isAiLoading ? "Generating..." : "Generate Next Advanced Topic ✨"}
                </div>
                <div className="dropdown-item" onClick={() => {
                  localStorage.removeItem('gemini_api_key');
                  alert("API Key cleared.");
                }}>
                  Clear API Key
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="split-pane">
          
          {/* Conditionally Rendered Left Pane */}
          {isLeftPaneOpen && (
            <>
              <div 
                className="left-pane" 
                style={{ width: `${leftPaneWidth}%` }}
              >
                {!isAiTeacherActive ? (
                  // Book Viewer Mode
                  <BookViewer book={books.find(b => b.id === activeBookId)} />
                ) : (
                  // AI Teacher Mode (Walkthrough)
                  <>
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                      <span className="progress-text">Lesson {currentIndex + 1} of {appLessons.length}</span>
                    </div>
                    
                    <div className="tabs">
                      <button 
                        className={`tab-btn ${activeTab === 'theory' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('theory')}
                      >
                        Topic Overview
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'walkthrough' ? 'active-tab-walkthrough' : ''}`}
                        onClick={() => setActiveTab('walkthrough')}
                      >
                        Walkthrough
                      </button>
                    </div>
                    
                    <div className="tab-content">
                      {activeTab === 'theory' ? (
                        <TheoryPanel lesson={activeLesson} />
                      ) : (
                        <div className="walkthrough-tab">
                          <div className="walkthrough-header">
                            <h2 className="walkthrough-title">Program Walkthrough</h2>
                            <button 
                              onClick={() => {
                                if (activeLesson.preWrittenCode) {
                                  setCode(activeLesson.preWrittenCode);
                                  setActiveTab('theory');
                                }
                              }}
                              className="copy-btn"
                            >
                              Copy Code
                            </button>
                          </div>
                          <LineWalkthrough 
                            code={activeLesson.preWrittenCode}
                            explanations={activeLesson.lineExplanations}
                            howToStart={activeLesson.howToStart}
                          />
                        </div>
                      )}
                    </div>

                    <div className="lesson-navigation">
                      <button 
                        className="nav-btn prev-btn" 
                        onClick={() => !isFirst && handleLessonChange(appLessons[currentIndex - 1].id)}
                        disabled={isFirst}
                      >
                        <ChevronLeft size={20} /> Prev
                      </button>
                      <button 
                        className="nav-btn next-btn" 
                        onClick={() => {
                          if (!isLast) handleLessonChange(appLessons[currentIndex + 1].id);
                          else handleGenerateAiLesson();
                        }}
                      >
                        {isLast ? (isAiLoading ? "Generating..." : "Generate Next Level ✨") : "Next"} 
                        {!isLast && <ChevronRight size={20} />}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Resizer Handle */}
              <div 
                className="resizer"
                onMouseDown={startDragging}
              ></div>
            </>
          )}
          
          {/* Right Pane */}
          <div 
            className="right-pane" 
            style={{ width: isLeftPaneOpen ? `${100 - leftPaneWidth}%` : '100%' }}
          >
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              onRun={handleRunCode} 
              isRunning={isRunning || !isPyodideReady} 
            />
            {/* Conditional Terminal rendering */}
            {isTerminalOpen && <Terminal output={output} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
