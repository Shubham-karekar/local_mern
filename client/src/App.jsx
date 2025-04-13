// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Home } from "./pages/Home";
// import { Contact } from "./pages/Contact";
// import { About } from "./pages/About";
// import { Register } from "./pages/Register";
// import { Login } from "./pages/Login";
// import Nav from "./Components/Nav";
// import Products from "./pages/Product";
// import { Logout } from "./pages/Logout";
// import { AdminLayout } from "./Components/layouts/admin-layout";
// import { AdminUser } from "./pages/Admin-User"
// import { AdminContact } from "./pages/Admin-Contact"
// import SingleProduct from "./pages/SingleProduct";
// import GridView from "./Components/GridView";
// import ListView from "./Components/ListView";
// import Cart from "./pages/Cart";
// import PrivateRoute from "./Store/PrivateRoute";
// import { UserLayouts } from "./Components/Layouts/User-Layout";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import PaymentPage from "./pages/PaymentPage"

// import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS
// import AddressPage from "./pages/AddressPage";
// import InvoicePage from "./Components/InvoicePage";
// import ProtectedRoute from "./Store/ProtectedRoute"

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time to mimic data fetching
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3 fw-bold text-secondary">Loading, please wait...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="/paymentPage" element={<PaymentPage />} />
//           <Route path="/addressPage" element={<AddressPage />} />
//           <Route path="/invoicePage" element={<InvoicePage />} />
//           <Route
//           path="/cart"
//           element={
//             <PrivateRoute>
//               <Cart />
//             </PrivateRoute>
//           }
//         />
//         </Route>


//         <Route path="/product" element={<Products />} />
//         <Route path="/singleproduct/:id" element={<SingleProduct />} />
//         <Route path="/gridview" element={<GridView />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/listView" element={<ListView />} />
//         <Route path="/admin" element={<AdminLayout />} >
//           <Route path="user" element={<AdminUser />} />
//           <Route path="user/:id/update" element={<UserLayouts />} />
//           <Route path="contact" element={<AdminContact />} />

//         </Route>

//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import Products from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PaymentPage from "./pages/PaymentPage";
import AddressPage from "./pages/AddressPage";
import InvoicePage from "./Components/InvoicePage";

// Admin Pages
import { AdminUser } from "./pages/Admin-User";
import { AdminContact } from "./pages/Admin-Contact";

// Components
import Nav from "./Components/Nav";
import GridView from "./Components/GridView";
import ListView from "./Components/ListView";

// Layouts
import { AdminLayout } from "./Components/layouts/admin-layout";
import { UserLayouts } from "./Components/Layouts/User-Layout";

// Route Guard
import PrivateRoute from "./Store/PrivateRoute";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-bold text-secondary">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Nav />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/paymentPage" element={<PaymentPage />} />
          <Route path="/addressPage" element={<AddressPage />} />
          <Route path="/invoicePage" element={<InvoicePage />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/gridview" element={<GridView />} />
          <Route path="/listView" element={<ListView />} />
          <Route path="/product" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes inside PrivateRoute */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="user" element={<AdminUser />} />
            <Route path="user/:id/update" element={<UserLayouts />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
