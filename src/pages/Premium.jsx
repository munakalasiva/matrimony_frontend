// src/pages/Premium.jsx
import React from "react";
import ProfileCard from "../components/ProfileCard";

// Sample premium profiles (later fetch from backend)
const premiumProfiles = [
  {
    id: 1,
    name: "Raghav",
    age: 29,
    location: "Hyderabad",
    caste: "Reddy",
    education: "MBA",
    photo: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 2,
    name: "Divya",
    age: 26,
    location: "Vijayawada",
    caste: "Kapu",
    education: "B.Tech",
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 3,
    name: "Sandeep",
    age: 30,
    location: "Visakhapatnam",
    caste: "Reddy",
    education: "M.Tech",
    photo: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const Premium = () => {
  const containerStyle = {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#800000",
    marginBottom: "20px",
  };

  const subHeadingStyle = {
    fontSize: "18px",
    color: "#333",
    marginBottom: "30px",
  };

  const profileContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const buttonStyle = {
    marginTop: "30px",
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#FFD700",
    color: "#800000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Premium Membership</h2>
      <p style={subHeadingStyle}>
        Upgrade to{" "}
        <span style={{ color: "#FFD700", fontWeight: "bold" }}>Premium</span> to
        unlock exclusive benefits:
      </p>
      <ul
        style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto 30px" }}
      >
        <li>Access verified and featured profiles</li>
        <li>Highlight your own profile for more visibility</li>
        <li>Advanced search filters to find your perfect match</li>
        <li>Priority support and matchmaking assistance</li>
      </ul>

      <div style={profileContainerStyle}>
        {premiumProfiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>

      <button style={buttonStyle}>Upgrade to Premium</button>
    </div>
  );
};

export default Premium;
