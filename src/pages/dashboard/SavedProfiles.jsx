import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // custom css

import { baseUrl } from "../../api";
const SavedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${baseUrl}/savedProfiles`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfiles();
  }, []);

  const removeProfile = async (id) => {
    try {
      await fetch(`${baseUrl}/savedProfiles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="saved-profiles-container">
      <h2 className="saved-profiles-title">💖 Saved Profiles</h2>
      {profiles.length === 0 ? (
        <p className="saved-profiles-empty">No saved profiles yet.</p>
      ) : (
        <div className="saved-profiles-grid">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="saved-profile-card"
              onClick={() => navigate(`/profile/${p.id}`)}
            >
              <img src={p.image} alt={p.name} className="saved-profile-image" />
              <div className="saved-profile-info">
                <h3 className="saved-profile-name">{p.name}</h3>
                <p className="saved-profile-details">
                  {p.age ? `${p.age} yrs` : "Age N/A"} •{" "}
                  {p.location || "Unknown"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigate
                  removeProfile(p.id);
                }}
                className="saved-profile-remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProfiles;
