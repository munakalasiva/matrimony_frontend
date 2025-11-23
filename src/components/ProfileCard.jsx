// src/components/ProfileCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ id, name, age, location, height, photo }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/profile/${id}`);
    } else {
      navigate("/login");
    }
  };

  const cardStyle = {
    position: "relative",
    borderRadius: "16px",
    padding: "0",
    margin: "15px",
    width: "300px",
    background: "#ffffff",
    boxShadow: isHovered
      ? "0px 12px 40px rgba(128,0,0,0.18)"
      : "0px 4px 20px rgba(0,0,0,0.08)",
    transform: isHovered
      ? "translateY(-6px) scale(1.02)"
      : "translateY(0px) scale(1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    overflow: "hidden",
    border: "1px solid rgba(128,0,0,0.08)",
  };

  const imageContainerStyle = {
    position: "relative",
    width: "100%",
    height: "320px",
    overflow: "hidden",
    borderRadius: "16px 16px 0 0",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
    transform: isHovered ? "scale(1.08)" : "scale(1)",
  };

  const gradientOverlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
    pointerEvents: "none",
  };

  const nameOverlayStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    color: "#ffffff",
    zIndex: 2,
  };

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "4px",
    textTransform: "capitalize",
    textShadow: "0px 2px 8px rgba(0,0,0,0.3)",
    letterSpacing: "0.3px",
  };

  const ageLocationStyle = {
    fontSize: "15px",
    fontWeight: "500",
    opacity: 0.95,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textShadow: "0px 1px 4px rgba(0,0,0,0.4)",
  };

  const contentStyle = {
    padding: "20px 24px 24px",
    background: "#ffffff",
  };

  const infoRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
  };

  const infoLabelStyle = {
    fontSize: "13px",
    color: "#718096",
    fontWeight: "600",
    // textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const infoValueStyle = {
    fontSize: "15px",
    color: "#2d3748",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const badgeStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "linear-gradient(135deg, #800000 0%, #a00000 100%)",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    boxShadow: "0px 4px 12px rgba(128,0,0,0.3)",
    zIndex: 3,
    textTransform: "uppercase",
  };

  const hoverIndicatorStyle = {
    position: "absolute",
    bottom: "24px",
    right: "24px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #800000 0%, #a00000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "scale(1)" : "scale(0.8)",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 12px rgba(128,0,0,0.3)",
  };

  const arrowStyle = {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div style={badgeStyle}>New</div>

      <div style={imageContainerStyle}>
        <img src={photo} alt={name} style={imgStyle} />
        <div style={gradientOverlayStyle}></div>

        <div style={nameOverlayStyle}>
          <h3 style={nameStyle}>{name}</h3>
          <div style={ageLocationStyle}>
            <span>{age} years</span>
            {location && (
              <>
                <span>•</span>
                <span>{location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        {height && (
          <div style={infoRowStyle}>
            <span style={infoLabelStyle}>Height</span>
            <span style={infoValueStyle}>{height}</span>
          </div>
        )}

        <div style={hoverIndicatorStyle}>
          <span style={arrowStyle}>→</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
