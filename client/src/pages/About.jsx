import React from "react";
import { useAuth } from "../Store/auth";

export const About = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Header Section */}
      <header className="bg-primary text-white text-center py-5">
        <h1>About Us</h1>
        <p>Welcome, {user?.username || "Guest"}</p>
        <p className="lead">Learn more about our team and mission</p>
      </header>

      {/* About Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500"
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2>Our Mission</h2>
            <p>
              We are a passionate team dedicated to delivering high-quality
              solutions that help businesses and individuals achieve their
              goals. Our mission is to innovate and create products that make
              a difference.
            </p>
            <p>
              With a focus on excellence and customer satisfaction, we strive
              to exceed expectations and build lasting relationships with our
              clients.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Meet Our Team</h2>
          <div className="row mt-4">
            {/* Team Member 1 */}
            <div className="col-md-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
                className="rounded-circle mb-3"
              />
              <h5>John Doe</h5>
              <p>CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
                className="rounded-circle mb-3"
              />
              <h5>Jane Smith</h5>
              <p>Lead Developer</p>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
                className="rounded-circle mb-3"
              />
              <h5>Emily Johnson</h5>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
