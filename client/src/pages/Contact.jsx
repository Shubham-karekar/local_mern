import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ThemeContext"; // Import the theme context


const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const { theme} = useTheme(); // Use the theme context
  
  const { user, URL } = useAuth();

  useEffect(() => {
    if (userData && user) {
      setData({
        username: user.username,
        email: user.email,
        message: "",
      });
      setUserData(false);
    }
  }, [userData, user]);

  const postUserData = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const submitData = async (event) => {
    event.preventDefault();
    console.log("Submitting Data:", data);

    try {
     
      const [contactResponse, emailResponse] = await Promise.all([
        fetch(`https://local-mern.onrender.com/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
      ]);

      if (contactResponse.ok) {
        setData(defaultContactFormData);
        toast.success("Message sent successfully!");
      } else {
        toast.error("Message not sent successfully. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <>
      <div className={`container-fluid ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"} shadow-sm`}>
        {/* Location Section */}
        <div className="row justify-content-center py-4">
          <div className="col-lg-10 text-center">
            <p className="section-title px-5">
              <span className={`px-2 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} shadow-sm`}>
                Get In Touch By Our Location
              </span>
            </p>
            <h1 className="mb-4 text-primary">Visit Our Location For More Information</h1>
            <div className="justify-content-center">
              <iframe
                className="embed-responsive-item"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.52129981637611!2d73.82695081229251!3d18.468216102914177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295ea6dda1627%3A0xab7b56deb204c1ca!2sSHREE%20LAXMI%20KIRANA%20AND%20GENERAL%20STORE!5e0!3m2!1sen!2sin!4v1743089099029!5m2!1sen!2sin"
                width={1260}
                height={600}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="container pt-5">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Get In Touch</span>
            </p>
            <h1 className="mb-4 text-primary">Contact Us For Any Query</h1>
          </div>
          <div className="custom-container custom-bg-gray p-4 mb-5 rounded shadow-sm">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <form onSubmit={submitData}>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control mb-3"
                    id="name"
                    value={data.username}
                    onChange={postUserData}
                    required
                  />
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    id="email"
                    value={data.email}
                    onChange={postUserData}
                    required
                  />
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control mb-3"
                    name="message"
                    id="message"
                    rows={6}
                    value={data.message}
                    onChange={postUserData}
                    required
                  />
                  <button
                    type="submit"
                    className={`btn  ${theme === "dark" ? "btn-outline-light" : "btn-outline-primary"} btn-lg btn-block mt-3 mb-3`}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


