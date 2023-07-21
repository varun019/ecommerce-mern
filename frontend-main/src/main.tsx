import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import { ToastContainer } from 'react-toastify';
import { ProductProvider } from './components/Context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <App />
      <ToastContainer />
    </ProductProvider>
  </React.StrictMode>,
)
