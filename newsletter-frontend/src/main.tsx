import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

async function enableMocking() {
  if (import.meta.env.MODE !== 'production') {
    const { worker } = await import('./test/mocks/browser');
    
    // Start the worker with specific options
    return worker.start({
      onUnhandledRequest(request, print) {
        // Ignore certain file types and paths
        const shouldIgnore = [
          /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
          /^\/manifest\.json$/,
          /^\/favicon\.ico$/,
          /^\/assets\//,
          /^\/$/,
          /hot-update\.json$/,
          /\/@vite\/client$/,
          /\/@react-refresh$/,
          /^\/node_modules\//,
          /^\/src\//,
          /^\/public\//,
          /^\/static\//,
          /^\/sockjs-node\//,
          /^\/ws$/,
        ].some(pattern => pattern.test(request.url));

        // Only print warnings for unhandled API requests
        if (!shouldIgnore && request.url.includes('/api/')) {
          print.warning();
        }
      },
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
