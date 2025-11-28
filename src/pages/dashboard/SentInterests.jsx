import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // custom css
import { baseUrl } from "../../api";
const SentInterests = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/interests/sent`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="interests-container">
      <h2>📤 Sent Interests</h2>
      {profiles.length === 0 ? (
        <p>No interests sent yet.</p>
      ) : (
        <ul>
          {profiles.map((p) => (
            <li
              key={p.id}
              className="interest-card sent-container"
              onClick={() => {
                if (p.status === "Accepted") {
                  navigate(`/profile/${p.id}`);
                } else {
                  alert(
                    "You can view the profile only after your interest is accepted."
                  );
                }
              }}
            >
              <img src={p.image} alt={p.name} className="interest-img" />
              <div className="saved-profile-info">
                <h3 className="saved-profile-name">{p.name}</h3>
                <p className="saved-profile-details">
                  {p.age ? `${p.age} yrs` : "Age N/A"} •{" "}
                  {p.location || "Unknown"}
                </p>
              </div>
              <p>Status:{p.status}</p>
              {/* <div>
                <h3>{p.name}</h3>
                <p>{p.location}</p>
                <small>Status: {p.status}</small>
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SentInterests;
