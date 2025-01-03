// import React, { useState } from "react";
// import Footer from "../Components/Footer";
// import { useAuth } from "../Store/auth";


// const defaultContactFormData = {
//   username: "",
//   email: "",
//   message: "",
// };

// export const Contact = () => {
//   const [data, setData] = useState(defaultContactFormData);

//   const postUserData = (event) => {
//     const { name, value } = event.target;
//     setUser({
//       ...contact,
//       [name]: value,
//     });
//   };

//   const [userData, setUserData] = useState(true);

//   const { user } = useAuth();

//   console.log("frontend user ", user.email);

//   if (userData && user) {
//     setData({
//       username:user.username,
//       email: user.email,
//       message: "",
//     });
//     setUserData(false);
//   }

//   const submitData = async (event) => {
//     event.preventDefault();
//     console.log(user);

//     try {
//       const response = await fetch("http://localhost:5000/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       if(response.ok){
//         setData(defaultContactFormData);
//         const data = await response.json();
//         console.log(data);
//         alert("Message send sucessfully")
        
//       }
//       console.log(response);
//     } catch (error) {
//       alert("Message not send sucessfu")
//       console.log("Error in submitting data:", error);
//     }
//   };

//   return (
//     <>
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="text-center pb-2 my-4">
//             <p className="section-title px-5">
//               <span className="px-2">Get In Touch By Our Location</span>
//             </p>
//             <h1 className="mb-4 text-primary">
//               Visit Our Location For More Information
//             </h1>
//           </div>
//           <div className="justify-content-center">
//             <iframe
//               className="embed-responsive-item"
//               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60554.18905221528!2d73.854388!3d18.454792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac6040cb269%3A0xac653591baaaa13e!2sSarhad%20College%20of%20Arts%2CCommerce%20and%20Science!5e0!3m2!1sen!2sin!4v1707550403154!5m2!1sen!2sin"
//               width={1260}
//               height={600}
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//         </div>

//         <div className="container-fluid pt-5">
//           <div className="container">
//             <div className="text-center pb-2">
//               <p className="section-title px-5">
//                 <span className="px-2">Get In Touch</span>
//               </p>
//               <h1 className="mb-4 text-primary">Contact Us For Any Query</h1>
//             </div>
//             <div className="custom-container custom-bg-gray p-4 mb-5">
//               <div className="row justify-content-center">
//                 <div className="col-md-8">
//                   {/* Added form tag */}
//                   <form onSubmit={submitData}>
//                     <label htmlFor="name" className="form-label">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control mb-3"
//                       id="name"
//                       value={data.username}
//                       onChange={postUserData}
//                       required
//                     />
//                     <label htmlFor="email" className="form-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control mb-3"
//                       id="email"
//                       value={user.email}
//                       onChange={postUserData}
//                       required
//                     />
//                     <label htmlFor="message" className="form-label">
//                       Message
//                     </label>
//                     <textarea
//                       className="form-control"
//                       name="message"
//                       id="message"
//                       rows={6}
//                       value={user.message}
//                       onChange={postUserData}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="btn btn-outline-primary btn-lg btn-block mt-3 mb-3"
//                     >
//                       Send
//                     </button>
//                   </form>
//                   {/* End of form tag */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };


import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { useAuth } from "../Store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();
  const [isUserDataInitialized, setIsUserDataInitialized] = useState(false);

  // Populate form fields with user data if not already done
  useEffect(() => {
    if (user && !isUserDataInitialized) {
      setData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
      setIsUserDataInitialized(true);
    }
  }, [user, isUserDataInitialized]);

  // Handle form field changes
  const postUserData = (event) => {
    const { name, value } = event.target;
    setData({
      ...contact,
      [name]: value,
    });
  };

  // Handle form submission
  const submitData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setData(defaultContactFormData);
        const responseData = await response.json();
        console.log("Response data:", responseData);
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center pb-2 my-4">
            <p className="section-title px-5">
              <span className="px-2">Get In Touch By Our Location</span>
            </p>
            <h1 className="mb-4 text-primary">
              Visit Our Location For More Information
            </h1>
          </div>
          <div className="justify-content-center">
            <iframe
              className="embed-responsive-item"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60554.18905221528!2d73.854388!3d18.454792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac6040cb269%3A0xac653591baaaa13e!2sSarhad%20College%20of%20Arts%2CCommerce%20and%20Science!5e0!3m2!1sen!2sin!4v1707550403154!5m2!1sen!2sin"
              width={1260}
              height={600}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="container-fluid pt-5">
          <div className="container">
            <div className="text-center pb-2">
              <p className="section-title px-5">
                <span className="px-2">Get In Touch</span>
              </p>
              <h1 className="mb-4 text-primary">Contact Us For Any Query</h1>
            </div>
            <div className="custom-container custom-bg-gray p-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  {/* Contact Form */}
                  <form onSubmit={submitData}>
                    <label htmlFor="username" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control mb-3"
                      id="username"
                      value={data.username}
                      onChange={postUserData}
                      required
                    />
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      id="email"
                      value={data.email}
                      onChange={postUserData}
                      required
                    />
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows={6}
                      value={data.message}
                      onChange={postUserData}
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-lg btn-block mt-3 mb-3"
                    >
                      Send
                    </button>
                  </form>
                  {/* End of Contact Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
