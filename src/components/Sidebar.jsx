import React, { useState, useMemo } from 'react';
import { BookOpen, Code, Award, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { lessons } from '../data/lessons';

export default function Sidebar({ activeLessonId, onSelectLesson }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const getIcon = (difficulty) => {
    switch(difficulty) {
      case 'Basic': return <BookOpen size={16} className="text-blue-400" />;
      case 'Intermediate': return <Code size={16} className="text-purple-400" />;
      case 'Advanced': return <Award size={16} className="text-yellow-400" />;
      default: return <BookOpen size={16} />;
    }
  };

  const filteredCategories = useMemo(() => {
    const filtered = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lesson.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = {};
    filtered.forEach(lesson => {
      if (!categories[lesson.category]) {
        categories[lesson.category] = [];
      }
      categories[lesson.category].push(lesson);
    });

    return categories;
  }, [searchQuery]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: prev[category] !== undefined ? !prev[category] : false
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Python Master</h2>
        <p>100+ Programs IDE</p>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search programs..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-nav">
        {Object.entries(filteredCategories).length === 0 ? (
          <div className="no-results">No programs found.</div>
        ) : (
          Object.entries(filteredCategories).map(([category, categoryLessons]) => {
            const isExpanded = expandedCategories[category] !== false;
            return (
              <div key={category} className="category-group">
                <button 
                  className="category-btn"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category} <span className="category-count">({categoryLessons.length})</span></span>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {isExpanded && (
                  <ul className="category-list">
                    {categoryLessons.map((lesson) => (
                      <li 
                        key={lesson.id} 
                        className={`nav-item ${activeLessonId === lesson.id ? 'active' : ''}`}
                        onClick={() => onSelectLesson(lesson.id)}
                      >
                        <span className="icon-wrapper">{getIcon(lesson.difficulty)}</span>
                        <span className="lesson-title" title={lesson.title}>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
