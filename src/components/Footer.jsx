// src/components/Footer.jsx
import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { FaFacebookSquare } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section">
          <h1 className="footer-brand">Kaapu Kalyanam</h1>
          <p className="footer-tagline">A platform to unite Kaapu families</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <a href="/about" className="footer-link">
            About Us
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="footer-link">
            Terms & Conditions
          </a>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h2 className="footer-social-title">Follow Us</h2>
          <div className="footer-icons">
            <a href="#" className="social-icon">
              <IoLogoYoutube />
            </a>
            <a href="#" className="social-icon">
              <LuInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaFacebookSquare />
            </a>
          </div>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Kaapu Kalyanam. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
