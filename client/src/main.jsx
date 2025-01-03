import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Store/auth.jsx'
import { FilterContextProvider } from './Context/FilterContext.jsx'
import { CartProvider } from './Context/CartContext.jsx';
import { AppProvider } from './Context/ProductContex.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <AppProvider>
        <FilterContextProvider>
        <CartProvider>
          <StrictMode>
            <App />
          </StrictMode>
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </AuthProvider>
)



// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { AuthProvider } from "./Store/auth.jsx";
// import { FilterContextProvider } from "./Context/FilterContext.jsx";
// import { CartProvider } from "./Context/CartContext.jsx";
// import { AppProvider } from "./Context/ProductContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <AppProvider>
//         <FilterContextProvider>
//           <CartProvider>
//             <App />
//           </CartProvider>
//         </FilterContextProvider>
//       </AppProvider>
//     </AuthProvider>
//   </StrictMode>
// );
