import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../Context/ThemeContext";
import "../App.css"; // Custom CSS for animations

const reviews = [
  { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing. I love it.", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing.", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "Absolutely incredible work. I love it!", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "The best thing I've seen in a while. Highly recommended!", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "Top-notch quality! Would use again!", img: "https://avatar.vercel.sh/james" }
];

const ReviewCard = ({ img, name, username, body, isDarkMode }) => (
  <div className={`review-card ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
    <div className="review-header d-flex align-items-center">
      <img src={img} alt={name} className="review-avatar" />
      <div>
        <p className="review-name">{name}</p>
        <p className="review-username">{username}</p>
      </div>
    </div>
    <p className="review-body">{body}</p>
  </div>
);

const Comments = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Reviews</h2>
      <div className="marquee-container">
        <div className="marquee-content">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
