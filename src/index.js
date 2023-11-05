import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModeProvider } from './context/index';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ModeProvider>
    <App />
  </ModeProvider>
);
