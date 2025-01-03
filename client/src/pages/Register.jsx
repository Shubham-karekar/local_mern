import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const res_data = await response.json();
                console.log("userdata", res_data);

                storeTokenInLS(res_data.token);
                localStorage.setItem("token", res_data)
                
                setUser({
                    username: "", email: "", phone: "", password: "",
                });
                console.log("Redirecting to login...");
                Navigate("/login");
            } else {
                console.log("Registration failed:", response.status, response.statusText);
                const errorData = await response.json();
                console.log("Error details:", errorData);
            }
        } catch (error) {
            console.log("register", error);
        }
    };
    return (
        <div>
            <section
                className="vh-100"
                style={{ backgroundColor: "#f4f5f7", paddingTop: "50px" }}
            >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>
                                            <form
                                                className="mx-1 mx-md-4"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="d-flex flex-column mb-4">
                                                    <label className="form-label" htmlFor="form3Example1c">
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="form3Example1c"
                                                        className="form-control"
                                                        value={user.username}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                                <div className="d-flex flex-column mb-4">
                                                    <label className="form-label" htmlFor="form3Example3c">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="form3Example3c"
                                                        className="form-control"
                                                        value={user.email}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                                <div className="d-flex flex-column mb-4">
                                                    <label className="form-label" htmlFor="form3Example4c">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        value={user.phone}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                                <div className="d-flex flex-column mb-4">
                                                    <label className="form-label" htmlFor="form3Example4cd">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="form3Example4cd"
                                                        className="form-control"
                                                        value={user.password}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        id="form2Example3c"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="form2Example3c"
                                                    >
                                                        I agree to all statements in{" "}
                                                        <a href="#!">Terms of Service</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid"
                                                alt="Sample image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
