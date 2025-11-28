// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { baseUrl } from "../api";
import "../App.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("/default-avatar.png");

  console.log(profile);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 === profile.profileImages.length ? 0 : prev + 1
    );
  };

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? profile.profileImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isLightboxOpen]);

  // Optional: handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLightboxOpen]);

  // Update selected image after profile loads
  useEffect(() => {
    if (profile && profile.profileImages?.length > 0) {
      setSelectedImage(profile.profileImages[0].url);
    }
  }, [profile]);

  const handleThumbClick = (url) => {
    setSelectedImage(url);
  };

  // Fetch main profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${baseUrl}/match/profiles/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  // Fetch similar profiles
  useEffect(() => {
    if (!profile) return;
    const fetchSimilar = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${baseUrl}/match/profiles`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const all = Array.isArray(res.data) ? res.data : [];

        const others = all.filter(
          (p) =>
            String(p._id) !== String(profile._id) && p.gender == profile.gender // only opposite gender
        );

        const scored = others
          .map((p) => {
            let score = 0;
            if (p.religion === profile.religion) score += 3;
            if (p.caste === profile.caste) score += 3;
            if (p.city === profile.city) score += 2;
            if (p.state === profile.state) score += 1;
            if (p.motherTongue === profile.motherTongue) score += 1;
            return { profile: p, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map((s) => s.profile);

        setSimilarProfiles(scored);
      } catch (err) {
        console.error("Error fetching similar profiles:", err);
      }
    };
    fetchSimilar();
  }, [profile]);

  const getAge = (dob) => {
    if (!dob) return "-";
    try {
      const birthDate = new Date(dob);
      const ageDiff = Date.now() - birthDate.getTime();
      return new Date(ageDiff).getUTCFullYear() - 1970;
    } catch {
      return "-";
    }
  };

  const renderRow = (label, value) => (
    <tr>
      <th>{label}</th>
      <td>{value || "-"}</td>
    </tr>
  );

  if (loading) return <p className="loading">Loading...</p>;
  if (!profile) return <p className="loading">Profile not found</p>;

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

  return (
    <div className="viewprofile-container">
      {/* LEFT SIDE: Profile Details */}
      <div className="viewprofile-main">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to results
        </button>

        <div className="viewprofile-header">
          {/* <div className="viewprofile-photo">
            <img
              src={profile.profileImages?.[0]?.url || "/default-avatar.png"}
              alt={profile.fullName}
              className="main-photo"
            />
            <div className="photo-thumbs">
              {(profile.profileImages || []).map((img, idx) => (
                <img key={idx} src={img.url} alt={`thumb-${idx}`} />
              ))}
            </div>
            <div className="profile-actions">
              <button className="btn save" onClick={handleSaveProfile}>
                Save Profile
              </button>
              <button className="btn interest" onClick={handleSendInterest}>
                Send Interest
              </button>
            </div>
          </div> */}

          <div className="viewprofile-photo">
            {/* <img
              src={selectedImage}
              alt={profile.fullName}
              className="main-photo"
            /> */}

            <img
              src={selectedImage}
              alt={profile.fullName}
              className="main-photo"
              onClick={() => {
                const index = profile.profileImages.findIndex(
                  (img) => img.url === selectedImage
                );
                openLightbox(index >= 0 ? index : 0);
              }}
              style={{ cursor: "zoom-in" }}
            />

            <div className="photo-thumbs">
              {(profile.profileImages || []).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`thumb-${idx}`}
                  className={`thumb ${
                    selectedImage === img.url ? "active" : ""
                  }`}
                  onClick={() => handleThumbClick(img.url)}
                />
              ))}
            </div>

            <div className="profile-actions">
              <button className="btn save" onClick={handleSaveProfile}>
                Save Profile
              </button>
              <button className="btn interest" onClick={handleSendInterest}>
                Send Interest
              </button>
            </div>
          </div>

          <div className="viewprofile-info">
            <h2>{profile.fullName}</h2>
            <p className="subtext">
              Profile for {profile.profileFor || "-"} • Joined{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>

            {/* Sections in TABLE FORMAT */}
            <h3>Basic Info</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("User ID", profile.customId)}
                {renderRow("Age", `${getAge(profile.dob)} Yrs`)}
                {renderRow("Gender", profile.gender)}
                {renderRow("Marital Status", profile.maritalStatus)}
                {renderRow("Height", profile.height)}
                {renderRow("Phone", profile.phone)}
                {renderRow("Email", profile.email)}
              </tbody>
            </table>

            <h3>Religion & Community</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("Religion", profile.religion)}
                {renderRow("Caste", profile.caste)}
                {renderRow("Sub Caste", profile.subCaste)}
                {renderRow("Mother Tongue", profile.motherTongue)}
                {renderRow("Gotra", profile.gotra)}
                {renderRow("Horoscope", profile.horoscope)}
              </tbody>
            </table>

            <h3>Education & Career</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("Education", profile.education)}
                {renderRow("Occupation", profile.occupation)}
                {renderRow("Company", profile.company)}
                {renderRow(
                  "Income",
                  profile.income ? `${profile.income} LPA` : "-"
                )}
              </tbody>
            </table>

            <h3>Lifestyle</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("Diet", profile.diet)}
                {renderRow("Drinking", profile.drinking)}
                {renderRow("Smoking", profile.smoking)}
              </tbody>
            </table>

            <h3>Location</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("Country", profile.country)}
                {renderRow("State", profile.state)}
                {renderRow("City", profile.city)}
                {renderRow("Address", profile.address)}
              </tbody>
            </table>

            <h3>Family</h3>
            <table className="viewprofile-table">
              <tbody>
                {renderRow("Father's Occupation", profile.fatherOccupation)}
                {renderRow("Mother's Occupation", profile.motherOccupation)}
                {renderRow("Siblings", profile.siblings)}
              </tbody>
            </table>

            <h3>About</h3>
            <table className="viewprofile-table">
              <tbody>{renderRow("Bio", profile.bio)}</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Similar Profiles */}
      <div className="viewprofile-sidebar">
        <h3>View Similar Profiles</h3>
        {similarProfiles.length === 0 ? (
          <p>No similar profiles found.</p>
        ) : (
          similarProfiles.map((sp) => (
            <div className="similar-card" key={sp._id}>
              <img
                src={sp.profileImages?.[0]?.url || "/default-avatar.png"}
                alt={sp.fullName}
              />
              <div>
                <strong>{sp.fullName}</strong>
                <p>
                  {getAge(sp.dob)} Yrs, {sp.height || "-"}
                </p>
                <p>
                  {sp.religion || "-"}, {sp.caste || "-"}
                </p>
                <a href={`/profile/${sp._id}`}>View Profile ▸</a>
              </div>
            </div>
          ))
        )}
      </div>

      {isLightboxOpen && (
        <div className="lightbox-overlay">
          <span className="close-btn" onClick={closeLightbox}>
            <X size={30} />
          </span>

          {profile.profileImages.length > 1 && (
            <>
              <span className="arrow left" onClick={showPrev}>
                <ChevronLeft size={40} />
              </span>
              <span className="arrow right" onClick={showNext}>
                <ChevronRight size={40} />
              </span>
            </>
          )}

          <img
            src={profile.profileImages[currentIndex].url}
            alt={`Full view ${currentIndex + 1}`}
            className="lightbox-image"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
