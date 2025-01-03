import { NavLink } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth"; 

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                alert("Login sucessfully")
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                localStorage.setItem("token", res_data)
                // localStorage.setItem("token", res_data.token);
                console.log("userdata", res_data);
                setUser({
                    username: "", email: "", password: ""
                })
                Navigate("/")
            } else {
                alert("invalid data")
                console.log(response);
            }
        }
        catch (error) {
            console.log("login", error);

        }
    };
    return (
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
                                <div data-mdb-input-init="" className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />

                                </div>

                                {/* Password input */}
                                <div data-mdb-input-init="" className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInput}
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />

                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        data-mdb-button-init=""
                                        data-mdb-ripple-init=""
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
                    {/* Copyright */}
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                </div>
            </section>
        </div>
    );
};



// import { NavLink } from "react-router-dom";
// import "../App.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Store/auth";

// export const Login = () => {
//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//     });
//     const navigate = useNavigate();
//     const { storeTokenInLS } = useAuth(); // Destructure correctly

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(user),
//             });
//             if (response.ok) {
//                 const res_data = await response.json();
//                 alert("Login successful");
//                 storeTokenInLS(res_data.token); // Store token using context
//                 localStorage.setItem("userData", JSON.stringify(res_data)); // Store user data
//                 setUser({ email: "", password: "" }); // Reset form
//                 navigate("/"); // Navigate to home
//             } else {
//                 alert("Invalid credentials");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//         }
//     };

//     return (
//         <div className="container my-auto">
//             <section className="vh-100">
//                 <div className="container-fluid h-custom">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-md-9 col-lg-6 col-xl-5">
//                             <img
//                                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                                 className="img-fluid"
//                                 alt="Sample"
//                             />
//                         </div>
//                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="divider d-flex align-items-center my-4">
//                                     <h1 className="text-center fw-bold mx-3 mb-0">Login</h1>
//                                 </div>

//                                 {/* Email input */}
//                                 <div className="form-outline mb-4">
//                                     <label className="form-label" htmlFor="email">
//                                         Email address
//                                     </label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         value={user.email}
//                                         onChange={handleInput}
//                                         className="form-control form-control-lg"
//                                         placeholder="Enter a valid email address"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Password input */}
//                                 <div className="form-outline mb-3">
//                                     <label className="form-label" htmlFor="password">
//                                         Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         name="password"
//                                         value={user.password}
//                                         onChange={handleInput}
//                                         className="form-control form-control-lg"
//                                         placeholder="Enter password"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="d-flex justify-content-between align-items-center">
//                                     {/* Checkbox */}
//                                     <div className="form-check mb-0">
//                                         <input
//                                             className="form-check-input me-2"
//                                             type="checkbox"
//                                             id="rememberMe"
//                                         />
//                                         <label className="form-check-label" htmlFor="rememberMe">
//                                             Remember me
//                                         </label>
//                                     </div>
//                                     <a href="#!" className="text-body">
//                                         Forgot password?
//                                     </a>
//                                 </div>

//                                 <div className="text-center text-lg-start mt-4 pt-2">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary btn-lg"
//                                         style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
//                                     >
//                                         Login
//                                     </button>
//                                     <p className="small fw-bold mt-2 pt-1 mb-0">
//                                         Don't have an account?{" "}
//                                         <NavLink to="/register" className="link-danger">
//                                             Register
//                                         </NavLink>
//                                     </p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//                     {/* Copyright */}
//                     <div className="text-white mb-3 mb-md-0">
//                         Copyright © 2020. All rights reserved.
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };
