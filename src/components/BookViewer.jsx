import React from 'react';

export default function BookViewer({ book }) {
  if (!book) return (
    <div className="book-viewer" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
      <p>No book selected or no books uploaded.</p>
    </div>
  );

  return (
    <div className="book-viewer" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #3c3c3c', backgroundColor: '#252526', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#cccccc', margin: 0 }}>{book.title}</h2>
        <span style={{ fontSize: '0.85rem', color: '#888' }}>{book.author}</span>
      </div>
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <iframe
          src={book.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: '#fff' // PDFs usually look better on white or use reader defaults
          }}
          title={book.title}
        />
      </div>
    </div>
  );
}
