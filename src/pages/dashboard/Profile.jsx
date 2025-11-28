// src/pages/Dashboard/ProfileTab.jsx
import React, { useState, useEffect } from "react";
import { baseUrl } from "../../api";
import "../../App.css";

const ProfileTab = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const token = localStorage.getItem("token");

  // Dropdown options
  const educationOptions = [
    "Below 10th",
    "10th / SSC",
    "Intermediate / Plus 2",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "M.Phil / Ph.D",
    "Doctorate",
    "Engineering / B.Tech / M.Tech",
    "Medicine / MBBS / MD",
    "Law / LLB / LLM",
    "Management / MBA",
    "Finance / CA / CS",
    "Others",
  ];

  const occupationOptions = [
    "Software Professional",
    "Business Owner / Entrepreneur",
    "Government Employee",
    "Private Sector Employee",
    "Doctor",
    "Engineer",
    "Teacher / Professor",
    "Lawyer",
    "Banking / Finance Professional",
    "Marketing / Sales Professional",
    "Media / Entertainment Professional",
    "Agriculture",
    "Defence / Civil Services",
    "Student",
    "Not Working",
    "Others",
  ];

  const incomeOptions = [
    "0 - 1 Lakh",
    "1 - 2 Lakhs",
    "2 - 3 Lakhs",
    "3 - 4 Lakhs",
    "4 - 5 Lakhs",
    "5 - 6 Lakhs",
    "6 - 7 Lakhs",
    "7 - 8 Lakhs",
    "8 - 9 Lakhs",
    "9 - 10 Lakhs",
    "10 - 15 Lakhs",
    "15 - 20 Lakhs",
    "20 - 25 Lakhs",
    "25 - 30 Lakhs",
    "30 - 35 Lakhs",
    "35 - 40 Lakhs",
    "40 - 45 Lakhs",
    "45 - 50 Lakhs",
    "50 - 60 Lakhs",
    "60 - 70 Lakhs",
    "70 - 80 Lakhs",
    "80 - 90 Lakhs",
    "90 Lakhs - 1 Crore",
    "1 Crore & Above",
  ];

  const maritalStatusOptions = [
    "Unmarried",
    "Divorced",
    "Widowed",
    "Separated",
  ];

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        const formattedData = {
          ...data,
          dob: data.dob ? data.dob.split("T")[0] : "",
        };

        setUser(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,

      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleRemoveOld = (public_id) => {
    setUser({
      ...user,
      profileImages: user.profileImages.filter(
        (img) => img.public_id !== public_id
      ),
    });
    setRemoveImages((prev) => [...prev, public_id]);
  };

  const handleRemoveNew = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        if (key !== "profileImages") formData.append(key, user[key] || "");
      });

      newImages.forEach((file) => formData.append("profileImages", file));
      if (removeImages.length > 0)
        formData.append("removeImages", JSON.stringify(removeImages));

      const res = await fetch(`${baseUrl}/user/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setUser(data.user);
      setEditing(false);
      setNewImages([]);
      setPreview([]);
      setRemoveImages([]);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found</p>;

  const renderRow = (label, field, type = "text") => {
    const renderSelectOptions = (options) =>
      options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ));

    // const isSelectField = ["education", "occupation", "income"].includes(field);
    const isSelectField = [
      "education",
      "occupation",
      "income",
      "maritalStatus",
    ].includes(field);

    return (
      <tr>
        <th>{label}</th>
        <td>
          {!editing ? (
            user[field] || "-"
          ) : isSelectField ? (
            // <select
            //   name={field}
            //   value={user[field] || ""}
            //   onChange={handleChange}
            // >
            //   <option value="">-- Select {label} --</option>
            //   {field === "education" && renderSelectOptions(educationOptions)}
            //   {field === "occupation" && renderSelectOptions(occupationOptions)}
            //   {field === "income" && renderSelectOptions(incomeOptions)}
            // </select>
            <select
              name={field}
              value={user[field] || ""}
              onChange={handleChange}
            >
              <option value="">-- Select {label} --</option>
              {field === "education" && renderSelectOptions(educationOptions)}
              {field === "occupation" && renderSelectOptions(occupationOptions)}
              {field === "income" && renderSelectOptions(incomeOptions)}
              {field === "maritalStatus" &&
                renderSelectOptions(maritalStatusOptions)}
            </select>
          ) : type === "textarea" ? (
            <textarea
              name={field}
              value={user[field] || ""}
              onChange={handleChange}
            />
          ) : (
            <input
              type={type}
              name={field}
              value={user[field] || ""}
              onChange={handleChange}
            />
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      {/* Images */}
      <div className="profile-images">
        <h3>Profile Pictures</h3>
        <div className="image-gallery">
          {[
            ...(user.profileImages || []),
            ...preview.map((src, i) => ({ url: src, isNew: true, index: i })),
          ].map((img, i) => (
            <div key={i} className="image-box">
              <img src={img.url} alt="profile" className="profile-pic" />
              {editing && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    img.isNew
                      ? handleRemoveNew(img.index)
                      : handleRemoveOld(img.public_id)
                  }
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          {Array.from({
            length: 3 - ((user.profileImages?.length || 0) + preview.length),
          }).map((_, i) => (
            <div key={`placeholder-${i}`} className="image-box placeholder">
              <span>Image (Optional)</span>
            </div>
          ))}
        </div>

        {editing && (
          <div className="multi-imgs">
            <p className="para-input">
              ** You can upload multiple images here **
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      {!editing ? (
        <button className="btn edit" onClick={() => setEditing(true)}>
          ✏️ Edit Profile
        </button>
      ) : (
        <div className="form-buttons">
          <button
            type="button"
            className="btn cancel"
            onClick={() => setEditing(false)}
          >
            ❌ Cancel
          </button>
          <button type="button" className="btn save" onClick={handleSave}>
            💾 Save
          </button>
        </div>
      )}

      {/* Sections */}
      <div className="profile-sections">
        <div className="update-profile">
          <div>
            <h3>Basic Info</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("User ID", "customId")}
                {renderRow("Full Name", "fullName")}
                {renderRow("Email", "email", "email")}
                {renderRow("Phone", "phone", "tel")}
                {renderRow("Profile For", "profileFor")}
                {renderRow("Gender", "gender")}
                {renderRow("DOB", "dob", "date")}
                {renderRow("Marital Status", "maritalStatus")}
                {renderRow("Height", "height")}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Religion & Community</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("Religion", "religion")}
                {renderRow("Caste", "caste")}
                {renderRow("Sub-Caste", "subCaste")}
                {renderRow("Mother Tongue", "motherTongue")}
                {renderRow("Gotra", "gotra")}
                {renderRow("Horoscope", "horoscope")}
              </tbody>
            </table>
          </div>
        </div>

        <div className="update-profile">
          <div>
            <h3>Education & Career</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("Education", "education")}
                {renderRow("Occupation", "occupation")}
                {renderRow("Company", "company")}
                {renderRow("Income (yearly)", "income")}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Lifestyle</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("Diet", "diet")}
                {renderRow("Drinking", "drinking")}
                {renderRow("Smoking", "smoking")}
              </tbody>
            </table>
          </div>
        </div>

        <div className="update-profile">
          <div>
            <h3>Location</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("Country", "country")}
                {renderRow("State", "state")}
                {renderRow("City", "city")}
                {renderRow("Address", "address", "textarea")}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Family Details</h3>
            <table className="profile-table">
              <tbody>
                {renderRow("Father's Occupation", "fatherOccupation")}
                {renderRow("Mother's Occupation", "motherOccupation")}
                {renderRow("Siblings", "siblings")}
              </tbody>
            </table>
          </div>
        </div>

        <h3>About Me</h3>
        <table className="profile-table">
          <tbody>{renderRow("Bio", "bio", "textarea")}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTab;

// // src/pages/Dashboard/ProfileTab.jsx
// import React, { useState, useEffect } from "react";
// import "../../App.css";
// const ProfileTab = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [newImages, setNewImages] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [removeImages, setRemoveImages] = useState([]); // track deleted images

//   const token = localStorage.getItem("token");

//   // Fetch profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();

//         const formattedData = {
//           ...data,
//           dob: data.dob ? data.dob.split("T")[0] : "", // safely extract date
//         };

//         setUser(formattedData);

//         setLoading(false);
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//         setLoading(false);
//       }
//     };
//     if (token) fetchProfile();
//   }, [token]);

//   const handleChange = (e) =>
//     setUser({ ...user, [e.target.name]: e.target.value });

//   // Handle new image uploads
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages((prev) => [...prev, ...files]);
//     setPreview((prev) => [
//       ...prev,
//       ...files.map((f) => URL.createObjectURL(f)),
//     ]);
//   };

//   // Remove old image
//   const handleRemoveOld = (public_id) => {
//     setUser({
//       ...user,
//       profileImages: user.profileImages.filter(
//         (img) => img.public_id !== public_id
//       ),
//     });
//     setRemoveImages((prev) => [...prev, public_id]);
//   };

//   // Remove new image (before saving)
//   const handleRemoveNew = (index) => {
//     setNewImages(newImages.filter((_, i) => i !== index));
//     setPreview(preview.filter((_, i) => i !== index));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(user).forEach((key) => {
//         if (key !== "profileImages") {
//           formData.append(key, user[key] || "");
//         }
//       });

//       // attach new images if any
//       newImages.forEach((file) => formData.append("profileImages", file));

//       // attach remove list as JSON
//       if (removeImages.length > 0) {
//         formData.append("removeImages", JSON.stringify(removeImages));
//       }

//       const res = await fetch("http://localhost:5000/api/user/profile", {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Update failed");
//       const data = await res.json();
//       setUser(data.user);
//       setEditing(false);
//       setNewImages([]);
//       setPreview([]);
//       setRemoveImages([]);
//       alert("✅ Profile updated successfully!");
//     } catch (err) {
//       console.error("Profile update error:", err);
//       alert("❌ Failed to update profile");
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;
//   if (!user) return <p>No user data found</p>;

//   const renderRow = (label, field, type = "text") => (
//     <tr>
//       <th>{label}</th>
//       <td>
//         {!editing ? (
//           user[field] || "-"
//         ) : type === "textarea" ? (
//           <textarea
//             name={field}
//             value={user[field] || ""}
//             onChange={handleChange}
//           />
//         ) : (
//           <input
//             type={type}
//             name={field}
//             value={user[field] || ""}
//             onChange={handleChange}
//           />
//         )}
//       </td>
//     </tr>
//   );

//   return (
//     <div className="profile-container">
//       <h2 className="profile-heading">My Profile</h2>

//       {/* Images */}
//       <div className="profile-images">
//         <h3>Profile Pictures</h3>
//         <div className="image-gallery">
//           {/* Show existing + new preview images */}
//           {[
//             ...(user.profileImages || []),
//             ...preview.map((src, i) => ({ url: src, isNew: true, index: i })),
//           ].map((img, i) => (
//             <div key={i} className="image-box">
//               <img src={img.url} alt="profile" className="profile-pic" />
//               {editing && (
//                 <button
//                   type="button"
//                   className="remove-btn"
//                   onClick={() =>
//                     img.isNew
//                       ? handleRemoveNew(img.index)
//                       : handleRemoveOld(img.public_id)
//                   }
//                 >
//                   ❌
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* Placeholders for remaining slots (max 3 total) */}
//           {Array.from({
//             length: 3 - ((user.profileImages?.length || 0) + preview.length),
//           }).map((_, i) => (
//             <div key={`placeholder-${i}`} className="image-box placeholder">
//               <span>Image (Optional)</span>
//             </div>
//           ))}
//         </div>
//         {/*
//         {editing && (
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleFileChange}
//           />
//         )} */}
//         {editing && (
//           <div className="multi-imgs">
//             <p className="para-input">
//               ** You can upload multiple images here **
//             </p>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//             />
//           </div>
//         )}
//       </div>

//       {/* Sections */}
//       <div className="profile-sections">
//         <h3>Basic Info</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("User ID", "customId")}
//             {renderRow("Full Name", "fullName")}
//             {renderRow("Email", "email", "email")}
//             {renderRow("Phone", "phone", "tel")}
//             {renderRow("Profile For", "profileFor")}
//             {renderRow("Gender", "gender")}
//             {renderRow("DOB", "dob", "date")}
//             {renderRow("Marital Status", "maritalStatus")}
//             {renderRow("Height", "height")}
//           </tbody>
//         </table>

//         <h3>Religion & Community</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("Religion", "religion")}
//             {renderRow("Caste", "caste")}
//             {renderRow("Sub-Caste", "subCaste")}
//             {renderRow("Mother Tongue", "motherTongue")}
//             {renderRow("Gotra", "gotra")}
//             {renderRow("Horoscope", "horoscope")}
//           </tbody>
//         </table>

//         <h3>Education & Career</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("Education", "education")}
//             {renderRow("Occupation", "occupation")}
//             {renderRow("Company", "company")}
//             {renderRow("Income (yearly)", "income")}
//           </tbody>
//         </table>

//         <h3>Lifestyle</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("Diet", "diet")}
//             {renderRow("Drinking", "drinking")}
//             {renderRow("Smoking", "smoking")}
//           </tbody>
//         </table>

//         <h3>Location</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("Country", "country")}
//             {renderRow("State", "state")}
//             {renderRow("City", "city")}
//             {renderRow("Address", "address", "textarea")}
//           </tbody>
//         </table>

//         <h3>Family Details</h3>
//         <table className="profile-table">
//           <tbody>
//             {renderRow("Father's Occupation", "fatherOccupation")}
//             {renderRow("Mother's Occupation", "motherOccupation")}
//             {renderRow("Siblings", "siblings")}
//           </tbody>
//         </table>

//         <h3>About Me</h3>
//         <table className="profile-table">
//           <tbody>{renderRow("Bio", "bio", "textarea")}</tbody>
//         </table>
//       </div>

//       {/* Buttons */}
//       {!editing ? (
//         <button className="btn edit" onClick={() => setEditing(true)}>
//           ✏️ Edit Profile
//         </button>
//       ) : (
//         <div className="form-buttons">
//           <button
//             type="button"
//             className="btn cancel"
//             onClick={() => setEditing(false)}
//           >
//             ❌ Cancel
//           </button>
//           <button type="button" className="btn save" onClick={handleSave}>
//             💾 Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileTab;
