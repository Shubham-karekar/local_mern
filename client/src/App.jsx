import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login"
import Nav from "./Components/Nav";
import Products from "./pages/Product";
import { Logout } from "./pages/Logout";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
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
        <Route path="//SingleProduct/:id" element={<SingleProduct/>} />
      </Routes>
    </Router>
  );
};

export default App;
