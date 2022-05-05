import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AlertProvider } from "./components/alert/alertProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
);
