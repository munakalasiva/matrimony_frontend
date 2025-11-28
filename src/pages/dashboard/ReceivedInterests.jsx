import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api";
import "../../App.css"; // custom css
const ReceivedInterests = () => {
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/interests/received`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleResponse = async (id, action) => {
    try {
      const res = await fetch(
        `${baseUrl}/interests/${id}/${action}`, // e.g., /accept or /reject
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        setProfiles((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, status: action === "accept" ? "Accepted" : "Rejected" }
              : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="interests-container">
      <h2>📥 Received Interests</h2>
      {profiles.length === 0 ? (
        <p className="received-para">No interests received yet.</p>
      ) : (
        <ul className="interest-list">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="interest-card"
              onClick={() => navigate(`/profile/${p.id}`)}
            >
              <img src={p.image} alt={p.name} className="interest-img" />
              <div className="interest-info">
                <h3>{p.name}</h3>
                <p>
                  {p.age ? `${p.age} yrs` : "Age N/A"} |{" "}
                  {p.location || "Unknown"}
                </p>
              </div>
              <p className="interest-status">Status: {p.status}</p>
              {p.status?.toLowerCase() === "pending" && (
                <div className="interest-actions">
                  <button onClick={() => handleResponse(p.id, "accept")}>
                    ✅ Accept
                  </button>
                  <button onClick={() => handleResponse(p.id, "reject")}>
                    ❌ Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceivedInterests;
