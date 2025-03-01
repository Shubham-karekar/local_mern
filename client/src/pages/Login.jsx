import { NavLink } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ThemeContext";


export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { storeTokenInLS, URL } = useAuth();
    

    const validateInputs = () => {
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!user.email) {
            validationErrors.email = "Email is required.";
        } else if (!emailRegex.test(user.email)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!user.password) {
            validationErrors.password = "Password is required.";
        } else if (user.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

        try {
            const response = await fetch("https://ecom-mern-backend-1y7p.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                toast.success("Login successful");
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                localStorage.setItem("token", res_data.token);
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                toast.error("Invalid credentials");
                // toast.error(res_data.msg || "Invalid credentials"); 
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`min-vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className="container my-auto">
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="img-fluid"
                                    alt="Sample"
                                />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form onSubmit={handleSubmit}>
                                    <div className="divider d-flex align-items-center my-4">
                                        <h1 className="text-center fw-bold mx-3 mb-0">Login</h1>
                                    </div>

                                    {/* Email input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="email">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            className="form-control form-control-lg"
                                            placeholder="Enter a valid email address"
                                        />
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>

                                    {/* Password input */}
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                        />
                                        {errors.password && <span className="text-danger">{errors.password}</span>}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* Checkbox */}
                                        <div className="form-check mb-0">
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                id="rememberMe"
                                            />
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#!" className={`${theme === "dark" ? "text-white" : "text-dark"}`}>
                                            Forgot password?
                                        </a>
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                        >
                                            Login
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                            Don't have an account?{" "}
                                            <NavLink to="/register" className="link-danger">
                                                Register
                                            </NavLink>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                        <div className="text-white mb-3 mb-md-0">
                            Copyright © 2020. All rights reserved.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
