// src/components/ProfileListItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
import axios from "axios";

const ProfileListItem = ({ profile }) => {
  const wrapper = {
    border: "1px solid #e6e6e6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 18,
    background: "#fff",
    display: "flex",
    gap: 40,
    alignItems: "flex-start",
    width: "1000px",
  };

  const imgStyle = {
    width: 140,
    height: 160,
    objectFit: "cover",
    borderRadius: 6,
    border: "1px solid #ddd",
  };

  const nameStyle = {
    color: "#800000",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 6,
    textTransform: "capitalize",
  };

  const smallGrey = { color: "#666", fontSize: 16, marginBottom: 6 };

  // helper to calculate age
  const getAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return new Date(ageDiff).getUTCFullYear() - 1970;
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // store token after login
      if (!token) {
        alert("Please login to save profiles");
        return;
      }

      await axios.post(
        `${baseUrl}/savedProfiles/${profile._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(
        err.response?.data?.message ||
          "Could not save profile. Try again later."
      );
    }
  };

  const handleSendInterest = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to send interest");
        return;
      }

      const res = await fetch(
        `${baseUrl}/interests/${profile._id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Interest sent successfully!");
    } catch (err) {
      alert(err.message || "Error sending interest");
    }
  };

  // Example button inside a profile card

  return (
    <div style={wrapper}>
      <div style={{ paddingLeft: "10px" }}>
        <img
          src={profile.profileImages?.[0]?.url || "/default-avatar.png"}
          alt={profile.fullName}
          style={imgStyle}
        />
        <div style={{ marginTop: 8 }}>
          <Link
            to={`/profile/${profile._id}`}
            style={{
              color: "#b22222",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            View Full Profile ▸
          </Link>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div>
          <div style={nameStyle}>{profile.fullName}</div>
          <div style={smallGrey}>{profile.profileFor || "Profile"}</div>
          {/* <div style={{ fontSize: 14, color: "#444", marginTop: 6 }}>
            {profile.bio || "No bio available"}
          </div> */}
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 14 }}>
          <div style={{ display: "grid" }}>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Age</strong>
              <span>: {getAge(profile.dob)} Yrs</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Height</strong>
              <span>: {profile.height || "-"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Religion</strong>
              <span style={{ textTransform: "capitalize" }}>
                : {profile.religion || "-"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Marital Status</strong>
              <span>: {profile.maritalStatus || "-"}</span>
            </div>
          </div>

          <div style={{ display: "grid" }}>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Education</strong>
              <span>: {profile.education || "-"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Profession</strong>
              <span>: {profile.occupation || "-"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Income</strong>
              <span>: {profile.income ? `${profile.income}` : "-"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "150px auto" }}>
              <strong>Mother Tongue</strong>
              <span style={{ textTransform: "capitalize" }}>
                : {profile.motherTongue || "-"}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            borderTop: "1px solid #eee",
            paddingTop: 12,
            display: "flex",
            justifyContent: "end",
            gap: 10,
            paddingRight: "20px",
          }}
        >
          <button
            style={{
              background: "#28a745",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
            }}
            onClick={handleSaveProfile}
          >
            Save Profile
          </button>
          <button
            onClick={handleSendInterest}
            style={{
              background: "#ffc107",
              color: "#222",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
            }}
          >
            Send Interest ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileListItem;
