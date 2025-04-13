// import React, { useState, useEffect } from "react";
// import { useAuth } from "../Store/auth";
// import { useNavigate } from "react-router-dom";
// import FormatPrice from "../Helpers/FormatPrice";
// import { useTheme } from "../Context/ThemeContext";
// import { useCartContext } from "../Context/CartContext";

// const statesAndCities = {
//   "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
//   "Karnataka": ["Bangalore", "Mysore", "Hubli"],
//   "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
//   "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
// };

// const AddressPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//    const { theme } = useTheme();
//   const { cart, total_price, shipping_fee } = useCartContext();

//   const [address, setAddress] = useState({
//     email: "",
//     fullName: "",
//     phone: "",
//     street: "",
//     state: "",
//     city: "",
//     zip: "",
//     country: "India",
//   });

//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/get-address", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: user.email }),
//         });

//         if (res.ok) {
//           const data = await res.json();
//           if (data.address) {
//             setAddress((prev) => ({
//               ...prev,
//               ...data.address,
//               email: user.email,
//               fullName: user.username,
//             }));
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching address:", err);
//       }
//     };

//     if (user?.email) {
//       setAddress((prev) => ({
//         ...prev,
//         email: user.email,
//         fullName: user.username,
//       }));
//       fetchAddress();
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const handleStateChange = (e) => {
//     setAddress({ ...address, state: e.target.value, city: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/save-address", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: user.email, address }),
//       });

//       if (!response.ok) throw new Error("Failed to save address");

//       alert("Address saved successfully!");
//       navigate("/paymentPage");
//     } catch (error) {
//       console.error("Error saving address:", error);
//     }
//   };

//   return (
//     <div className={`container py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
//       <div className="row justify-content-center">
//         <div className="col-md-7">
//           <div className="card shadow-lg p-4">
//             <h4 className="mb-4 text-center">Shipping Address</h4>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input type="email" name="email" value={address.email} readOnly className="form-control" />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input type="text" name="fullName" value={address.fullName} onChange={handleChange} className="form-control" required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone</label>
//                 <input type="text" name="phone" value={address.phone} onChange={handleChange} className="form-control" required />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Street Address</label>
//                 <input type="text" name="street" value={address.street} onChange={handleChange} className="form-control" required />
//               </div>
//               <div className="row">
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">Country</label>
//                   <input type="text" value="India" className="form-control" disabled />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">State</label>
//                   <select name="state" value={address.state} onChange={handleStateChange} className="form-control" required>
//                     <option value="">Select State</option>
//                     {Object.keys(statesAndCities).map((state) => (
//                       <option key={state} value={state}>{state}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">City</label>
//                   <select name="city" value={address.city} onChange={handleChange} className="form-control" required disabled={!address.state}>
//                     <option value="">Select City</option>
//                     {statesAndCities[address.state]?.map((city) => (
//                       <option key={city} value={city}>{city}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">ZIP Code</label>
//                 <input type="text" name="zip" value={address.zip} onChange={handleChange} className="form-control" required />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">Proceed to Payment</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { useAuth } from '../Store/auth';

const statesAndCities = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore'],
  Delhi: ['New Delhi'],
  Gujarat: ['Ahmedabad', 'Surat'],
};

const AddressPage = ({ cartItems }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Auto-fill address if user data is available
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: user.username || '',
        phone: user.phone || '',
        email: user.email || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zip: user.address?.zip || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setAddress((prev) => ({
      ...prev,
      state: selectedState,
      city: '', // Reset city when state changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save address to context/localStorage/db if needed
    // Then proceed to payment
    navigate('/paymentPage', { state: { cartItems, address } });
  };

  return (
    <div className={`min-vh-100 d-flex flex-column ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <section className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-6">
              <div className={`card shadow-lg ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ borderRadius: '25px', border: 'none' }}>
                <div className="card-body p-5">
                  <h4 className="text-center fw-bold mb-4">Shipping Address</h4>
                  <form onSubmit={handleSubmit}>
                    {/* Email (Read-only) */}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" value={address.email} readOnly className="form-control" />
                    </div>

                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="fullName" value={address.fullName} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input type="text" name="phone" value={address.phone} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Street Address */}
                    <div className="mb-3">
                      <label className="form-label">Street Address</label>
                      <input type="text" name="street" value={address.street} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Country, State, City */}
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Country</label>
                        <input type="text" className="form-control" value="India" disabled />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State</label>
                        <select name="state" value={address.state} onChange={handleStateChange} className="form-control" required>
                          <option value="">Select State</option>
                          {Object.keys(statesAndCities).map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City</label>
                        <select name="city" value={address.city} onChange={handleChange} className="form-control" required disabled={!address.state}>
                          <option value="">Select City</option>
                          {statesAndCities[address.state]?.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* ZIP Code */}
                    <div className="mb-3">
                      <label className="form-label">ZIP Code</label>
                      <input type="text" name="zip" value={address.zip} onChange={handleChange} className="form-control" required />
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary w-100">Proceed to Payment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddressPage;
