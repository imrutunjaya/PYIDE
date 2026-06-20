import React from 'react';
import { BookOpen } from 'lucide-react';

export default function BookSidebar({ books, activeBookId, onSelectBook }) {
  return (
    <div className="sidebar" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="sidebar-header">
        <h2>Reference Books</h2>
        <p>Your uploaded PDF library</p>
      </div>
      
      <div className="sidebar-nav">
        {books.length === 0 ? (
          <div style={{ padding: '24px', color: '#888', fontSize: '0.85rem', textAlign: 'center' }}>
            <p>No books found.</p>
            <p>Upload PDF files to the <code>public/books</code> directory and add them to <code>src/data/books.js</code>.</p>
          </div>
        ) : (
          <ul>
            {books.map((book) => (
              <li 
                key={book.id}
                className={`nav-item ${activeBookId === book.id ? 'active' : ''}`}
                onClick={() => onSelectBook(book.id)}
              >
                <div className="icon-wrapper">
                  <BookOpen size={18} />
                </div>
                <span className="lesson-title">{book.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
