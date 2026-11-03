import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PrintPages } from './components/PrintPages';
import './index.css';

// `?print` renders only the A4 pages, for the PDF exporter.
const printMode = new URLSearchParams(window.location.search).has('print');
if (printMode) document.body.classList.add('print-mode');

createRoot(document.getElementById('root')!).render(<StrictMode>{printMode ? <PrintPages /> : <App />}</StrictMode>);
