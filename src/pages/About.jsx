import React from "react";
import aboutImg from "../assets/aboutImg.jpeg";
import "./About.css";

const AboutUs = () => {
  const handleCardHover = (e) => {
    e.currentTarget.classList.add("hovered");
  };

  const handleCardLeave = (e) => {
    e.currentTarget.classList.remove("hovered");
  };

  return (
    <div className="about-container-main">
      <div className="about-wrapper">
        {/* Intro Section */}
        <div className="about-top">
          <div className="about-content">
            <h1 className="about-heading">
              Who We Are
              <span className="heading-underline"></span>
            </h1>
            <p className="about-paragraph">
              We are a trusted matrimony platform dedicated to helping
              individuals and families find meaningful, lifelong relationships.
              Built on the foundation of trust, authenticity, and cultural
              values, we go beyond being just a matchmaking site — we are a
              space where hearts meet, families connect, and new stories begin.
            </p>
            <p className="about-paragraph">
              Our goal is to combine tradition with technology, ensuring that
              every profile is genuine, every match is thoughtful, and every
              journey feels personal. Whether you’re looking for a partner who
              shares your values, lifestyle, or dreams, we are here to guide you
              with care and commitment.
            </p>
            <p className="about-paragraph">
              At the core, we believe that marriage is not only about two people
              but about two families coming together. That’s why we strive to
              create a respectful, safe, and supportive environment where
              relationships are built on trust, compatibility, and love.
            </p>
          </div>
          <div className="about-image-wrapper">
            <img src={aboutImg} alt="about us" className="about-image" />
          </div>
        </div>

        {/* Values & Mission Cards */}
        <div className="about-grid">
          <div
            className="about-card"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="card-header">
              <div className="card-icon">🤝</div>
              <h2 className="card-title">Our Values</h2>
            </div>
            <p className="card-text">
              We believe in preserving the beautiful traditions and cultural
              values that make Telugu families special. Our platform respects
              the importance of family involvement in marriage decisions while
              providing modern tools to make the search easier and more
              effective.
            </p>
          </div>

          <div
            className="about-card"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="card-header">
              <div className="card-icon">💝</div>
              <h2 className="card-title">Our Mission</h2>
            </div>
            <p className="card-text">
              Our mission is to bring together people who share the same
              cultural values, traditions, and aspirations. We provide a secure
              and reliable space where families can connect and explore
              potential life partners. With advanced search options, verified
              profiles, and a simple interface, finding your soulmate has never
              been easier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
