import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Attempting to render application');

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found');
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div>
        <h1>Initial Render Test</h1>
        <App />
      </div>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Rendering failed:', error);
}
