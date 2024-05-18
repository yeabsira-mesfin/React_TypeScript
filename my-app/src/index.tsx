import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const name = "Yeaspira"
// Find the root element
const container = document.getElementById('root');

// Ensure the root element exists
if (container) {
  // Create a root
  const root = createRoot(container);

  // Initial render
  root.render(
    <React.StrictMode>
      <App message="This is Yeaspira!" />
    </React.StrictMode>
  );
}
