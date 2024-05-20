import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = process.env.REACT_APP_GOOGLE_APP_ID;

/**
 * Main entry point of the React application.
 * Renders the App component into the DOM.
 * Wraps the App component with React.StrictMode and GoogleOAuthProvider.
 * 
 * @component
 * @example
 * // This file is usually not imported or used directly, but serves as the main entry point.
 * // To run the application, use a command like `npm start` or `yarn start`.
 */
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);