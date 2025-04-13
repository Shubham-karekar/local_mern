import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';
import { useTheme } from '../Context/ThemeContext';



export const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { theme } = useTheme(); // Using theme from context
  const { storeTokenInLS , URL} = useAuth();
  

  const validateInputs = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!user.username) {
      validationErrors.username = 'Name is required.';
    }

    if (!user.email) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(user.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!user.phone) {
      validationErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(user.phone)) {
      validationErrors.phone = 'Phone number must be 10 digits.';
    }

    if (!user.password) {
      validationErrors.password = 'Password is required.';
    } else if (user.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
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
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        localStorage.setItem('token', res_data.token);

        setUser({ username: '', email: '', phone: '', password: '' });
        toast.success('Registration successful');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error('Registration failed: ' + errorData.message || 'Error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
    >
      <section className="vh-100 d-flex justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className={`row justify-content-center`}>
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div
                className={`card shadow-lg ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                style={{ borderRadius: '25px', border: 'none' }}
              >
                <div className="card-body p-5">
                  <h2 className="text-center fw-bold mb-4">Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Input fields */}
                    <div className="mb-4">
                      <label className="form-label" htmlFor="username">Your Name</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={user.username}
                        onChange={handleInput}
                      />
                      {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        value={user.email}
                        onChange={handleInput}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        placeholder="Enter your phone number"
                        value={user.phone}
                        onChange={handleInput}
                      />
                      {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter a strong password"
                        value={user.password}
                        onChange={handleInput}
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    {/* Submit button */}
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p className="mb-0">Already have an account? <a href="/login" className="text-primary">Login here</a></p>
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
