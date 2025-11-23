import React from "react";
import "./FloatingButtons.css"; // styling
import whatsapp from "../assets/whatsapp.png";
import call from "../assets/call.png";
const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      {/* Call Button */}
      <a href="tel:+919876543210" className="fab call-btn" title="Call Us">
        <img
          src={call}
          alt="call btn"
          className="callBtn"
          style={{ height: "30px" }}
        />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fab whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <img src={whatsapp} alt="float" className="fab whatsapp-btn" />
      </a>
    </div>
  );
};

export default FloatingButtons;
