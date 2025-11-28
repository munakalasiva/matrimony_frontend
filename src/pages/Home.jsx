import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ProfileCard from "../components/ProfileCard";

import Blogs from "../components/Blogs";
import Timeline from "../components/Timeline";

import { baseUrl } from "../api";
const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await fetch(`${baseUrl}/match/latest`, {
          headers,
        });
        const data = await res.json();

        setProfiles(data);
        console.log("Fetched Profiles:", data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const profileContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "50px",
  };

  const sectionHeadingStyle = {
    textAlign: "center",
    fontSize: "3.5rem",
    // fontWeight: "bold",
    fontFamily: "'Georgia', serif",
    color: "rgb(139, 69, 19)",
    fontWeight: "400",
    margin: "60px 0 20px 0",
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  return (
    <div>
      <Banner />

      <div>
        <h2 style={sectionHeadingStyle}>Recent Profiles</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading profiles...</p>
        ) : (
          <div style={profileContainerStyle}>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileCard
                  key={profile._id}
                  id={profile._id}
                  name={profile.fullName}
                  age={calculateAge(profile.dob)}
                  location={profile.city}
                  height={profile.height}
                  photo={
                    profile.profileImages?.[0]?.url ||
                    "https://via.placeholder.com/100"
                  }
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#800000",
                  fontWeight: "bold",
                }}
              >
                No profiles found.
              </p>
            )}
          </div>
        )}
      </div>

      <Timeline />
      <Blogs />
    </div>
  );
};

export default Home;
