import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import Nav from "./Components/Nav";
import Products from "./pages/Product";
import { Logout } from "./pages/Logout";
import SingleProduct from "./pages/SingleProduct";
import GridView from "./Components/GridView";
import ListView from "./Components/ListView";
import Cart from "./pages/Cart";
import PrivateRoute from "./Store/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to mimic data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Products />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/gridview" element={<GridView />} />
        <Route path="/listView" element={<ListView />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
