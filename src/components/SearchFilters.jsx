import React, { useState } from "react";

const SearchFilters = ({ onApply, initial = {} }) => {
  const [filters, setFilters] = useState({
    ageMin: initial.ageMin || "",
    ageMax: initial.ageMax || "",
    location: initial.location || "",
    caste: initial.caste || "",
    education: initial.education || "",
    occupation: initial.occupation || "",
    incomeMin: initial.incomeMin || "",
    incomeMax: initial.incomeMax || "",
    maritalStatus: initial.maritalStatus || "",
    motherTongue: initial.motherTongue || "",
  });

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

  // 💰 Single-point income options (LPA)
  const incomeOptions = [
    "1 Lakh",
    "2 Lakh",
    "3 Lakh",
    "4 Lakh",
    "5 Lakh",
    "6 Lakh",
    "7 Lakh",
    "8 Lakh",
    "9 Lakh",
    "10 Lakh",
    "12 Lakh",
    "15 Lakh",
    "18 Lakh",
    "20 Lakh",
    "25 Lakh",
    "30 Lakh",
    "35 Lakh",
    "40 Lakh",
    "45 Lakh",
    "50 Lakh",
    "60 Lakh",
    "70 Lakh",
    "80 Lakh",
    "90 Lakh",
    "1 Crore & Above",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate income range
    if (
      (name === "incomeMin" || name === "incomeMax") &&
      filters.incomeMin &&
      filters.incomeMax
    ) {
      const minIndex = incomeOptions.indexOf(
        name === "incomeMin" ? value : filters.incomeMin
      );
      const maxIndex = incomeOptions.indexOf(
        name === "incomeMax" ? value : filters.incomeMax
      );

      if (minIndex > -1 && maxIndex > -1 && minIndex > maxIndex) {
        alert("❌ Minimum income cannot exceed maximum income!");
        return;
      }
    }

    setFilters({ ...filters, [name]: value });
  };

  const apply = (e) => {
    e.preventDefault();
    onApply(filters);
  };

  const reset = () => {
    const cleared = {
      ageMin: "",
      ageMax: "",
      location: "",
      caste: "",
      education: "",
      occupation: "",
      incomeMin: "",
      incomeMax: "",
      maritalStatus: "",
      motherTongue: "",
    };
    setFilters(cleared);
    onApply(cleared);
  };

  const containerStyle = {
    width: "280px",
    padding: "16px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    background: "#fff",
    position: "sticky",
    top: "20px",
    height: "fit-content",
  };

  const labelStyle = {
    fontWeight: 600,
    color: "#333",
    marginTop: 8,
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #ccc",
    marginTop: 6,
  };

  return (
    <form style={containerStyle} onSubmit={apply}>
      <h3 style={{ color: "#800000", marginBottom: 8 }}>Search by filter</h3>

      {/* Age */}
      <label style={labelStyle}>Age (between)</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          name="ageMin"
          value={filters.ageMin}
          onChange={handleChange}
          placeholder="Min"
          style={{ ...inputStyle, width: "50%" }}
          type="number"
        />
        <input
          name="ageMax"
          value={filters.ageMax}
          onChange={handleChange}
          placeholder="Max"
          style={{ ...inputStyle, width: "50%" }}
          type="number"
        />
      </div>

      {/* Location */}
      <label style={labelStyle}>Location</label>
      <input
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="City / State"
        style={inputStyle}
      />

      {/* Caste */}
      <label style={labelStyle}>Caste / Sub-caste</label>
      <input
        name="caste"
        value={filters.caste}
        onChange={handleChange}
        placeholder="e.g. Reddy"
        style={inputStyle}
      />

      {/* Education */}
      <label style={labelStyle}>Education</label>
      <select
        name="education"
        value={filters.education}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Any</option>
        {educationOptions.map((edu) => (
          <option key={edu} value={edu}>
            {edu}
          </option>
        ))}
      </select>

      {/* Occupation */}
      <label style={labelStyle}>Occupation</label>
      <select
        name="occupation"
        value={filters.occupation}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Any</option>
        {occupationOptions.map((occ) => (
          <option key={occ} value={occ}>
            {occ}
          </option>
        ))}
      </select>

      {/* Income */}
      <label style={labelStyle}>Annual Income (LPA)</label>
      <div style={{ display: "flex", gap: 8 }}>
        <select
          name="incomeMin"
          value={filters.incomeMin}
          onChange={handleChange}
          style={{ ...inputStyle, width: "50%", overflowY: "auto" }}
        >
          <option value="">Min</option>
          {incomeOptions.map((inc) => (
            <option key={inc} value={inc}>
              {inc}
            </option>
          ))}
        </select>

        <select
          name="incomeMax"
          value={filters.incomeMax}
          onChange={handleChange}
          style={{ ...inputStyle, width: "50%", overflowY: "auto" }}
        >
          <option value="">Max</option>
          {incomeOptions.map((inc) => (
            <option key={inc} value={inc}>
              {inc}
            </option>
          ))}
        </select>
      </div>

      {/* Marital Status */}
      <label style={labelStyle}>Marital Status</label>
      <select
        name="maritalStatus"
        value={filters.maritalStatus}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Any</option>
        <option value="Unmarried">Unmarried</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
        <option value="Separated">Separated</option>
      </select>

      {/* Mother Tongue */}
      <label style={labelStyle}>Mother Tongue</label>
      <input
        name="motherTongue"
        value={filters.motherTongue}
        onChange={handleChange}
        placeholder="Telugu, Tamil..."
        style={inputStyle}
      />

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="submit"
          style={{
            flex: 1,
            background: "#800000",
            color: "#fff",
            padding: "10px",
            borderRadius: 6,
            border: "none",
          }}
        >
          Apply
        </button>
        <button
          type="button"
          onClick={reset}
          style={{
            flex: 1,
            background: "#f0f0f0",
            color: "#333",
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;

// import React, { useState } from "react";

// const SearchFilters = ({ onApply, initial = {} }) => {
//   const [filters, setFilters] = useState({
//     ageMin: initial.ageMin || "",
//     ageMax: initial.ageMax || "",
//     location: initial.location || "",
//     caste: initial.caste || "",
//     education: initial.education || "",
//     occupation: initial.occupation || "",
//     incomeMin: initial.incomeMin || "",
//     incomeMax: initial.incomeMax || "",
//     maritalStatus: initial.maritalStatus || "",
//     motherTongue: initial.motherTongue || "",
//   });

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const apply = (e) => {
//     e.preventDefault();
//     onApply(filters);
//   };

//   const reset = () => {
//     const cleared = {
//       ageMin: "",
//       ageMax: "",
//       location: "",
//       caste: "",
//       education: "",
//       occupation: "",
//       incomeMin: "",
//       incomeMax: "",
//       maritalStatus: "",
//       motherTongue: "",
//     };
//     setFilters(cleared);
//     onApply(cleared);
//   };

//   const containerStyle = {
//     width: "280px",
//     padding: "16px",
//     border: "1px solid #e6e6e6",
//     borderRadius: "8px",
//     background: "#fff",
//     position: "sticky",
//     top: "20px",
//     height: "fit-content",
//   };

//   const labelStyle = {
//     fontWeight: 600,
//     color: "#333",
//     marginTop: 8,
//     display: "block",
//   };
//   const inputStyle = {
//     width: "100%",
//     padding: "8px 10px",
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     marginTop: 6,
//   };

//   return (
//     <form style={containerStyle} onSubmit={apply}>
//       <h3 style={{ color: "#800000", marginBottom: 8 }}>Search by filter</h3>

//       <label style={labelStyle}>Age (between)</label>
//       <div style={{ display: "flex", gap: 8 }}>
//         <input
//           name="ageMin"
//           value={filters.ageMin}
//           onChange={handleChange}
//           placeholder="Min"
//           style={{ ...inputStyle, width: "50%" }}
//         />
//         <input
//           name="ageMax"
//           value={filters.ageMax}
//           onChange={handleChange}
//           placeholder="Max"
//           style={{ ...inputStyle, width: "50%" }}
//         />
//       </div>

//       <label style={labelStyle}>Location</label>
//       <input
//         name="location"
//         value={filters.location}
//         onChange={handleChange}
//         placeholder="City / State"
//         style={inputStyle}
//       />

//       <label style={labelStyle}>Caste / Sub-caste</label>
//       <input
//         name="caste"
//         value={filters.caste}
//         onChange={handleChange}
//         placeholder="e.g. Reddy"
//         style={inputStyle}
//       />

//       <label style={labelStyle}>Education</label>
//       <input
//         name="education"
//         value={filters.education}
//         onChange={handleChange}
//         placeholder="e.g. B.Tech, MBA"
//         style={inputStyle}
//       />

//       <label style={labelStyle}>Occupation</label>
//       <input
//         name="occupation"
//         value={filters.occupation}
//         onChange={handleChange}
//         placeholder="e.g. Software Engineer"
//         style={inputStyle}
//       />

//       <label style={labelStyle}>Annual Income (LPA)</label>
//       <div style={{ display: "flex", gap: 8 }}>
//         <input
//           name="incomeMin"
//           value={filters.incomeMin}
//           onChange={handleChange}
//           placeholder="Min"
//           style={{ ...inputStyle, width: "50%" }}
//         />
//         <input
//           name="incomeMax"
//           value={filters.incomeMax}
//           onChange={handleChange}
//           placeholder="Max"
//           style={{ ...inputStyle, width: "50%" }}
//         />
//       </div>

//       <label style={labelStyle}>Marital Status</label>
//       <select
//         name="maritalStatus"
//         value={filters.maritalStatus}
//         onChange={handleChange}
//         style={inputStyle}
//       >
//         <option value="">Any</option>
//         <option value="Unmarried">Unmarried</option>
//         <option value="Divorced">Divorced</option>
//         <option value="Widowed">Widowed</option>
//         <option value="Widowed">Separated</option>
//       </select>

//       <label style={labelStyle}>Mother Tongue</label>
//       <input
//         name="motherTongue"
//         value={filters.motherTongue}
//         onChange={handleChange}
//         placeholder="Telugu, Tamil..."
//         style={inputStyle}
//       />

//       <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//         <button
//           type="submit"
//           style={{
//             flex: 1,
//             background: "#800000",
//             color: "#fff",
//             padding: "10px",
//             borderRadius: 6,
//             border: "none",
//           }}
//         >
//           Apply
//         </button>
//         <button
//           type="button"
//           onClick={reset}
//           style={{
//             flex: 1,
//             background: "#f0f0f0",
//             color: "#333",
//             padding: "10px",
//             borderRadius: 6,
//             border: "1px solid #ddd",
//           }}
//         >
//           Reset
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchFilters;
