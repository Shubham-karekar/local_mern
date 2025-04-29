import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { AuthProvider } from './Store/auth.jsx'
import { FilterContextProvider } from './Context/FilterContext.jsx'
import { CartProvider } from './Context/CartContext.jsx';
import { AppProvider } from './Context/ProductContex.jsx'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "./Context/ThemeContext";

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <StrictMode>
              <App />
              <ToastContainer />
            </StrictMode>
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
)

