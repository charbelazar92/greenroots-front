import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';


import { App } from './App';
import "./styles/reset.css";
import './index.css';
import TreesProvider from './context/TreesProvider.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { CartProvider } from './context/CartProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <TreesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TreesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);