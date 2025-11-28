// src/pages/Auth/Register.jsx
import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { baseUrl } from "../../api";
import "../../App.css";

const steps = [
  "Basic Info",
  "Religion & Community",
  "Education & Career",
  "Lifestyle",
  "Location",
  "Family Details",
  "Finalize",
];

const Register = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    () =>
      JSON.parse(localStorage.getItem("registerDraft")) || {
        // Basic Info
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        profileFor: "",
        gender: "",
        dob: "",
        maritalStatus: "",
        height: "",

        // Religion & Community
        religion: "",
        caste: "",
        subCaste: "",
        motherTongue: "",
        gotra: "",
        horoscope: "",

        // Education & Career
        education: "",
        occupation: "",
        company: "",
        income: "",

        // Lifestyle
        diet: "",
        drinking: "",
        smoking: "",

        // Location
        country: "",
        state: "",
        city: "",
        address: "",

        // Family
        fatherOccupation: "",
        motherOccupation: "",
        siblings: "",

        // Final
        // Final
        bio: "",
        profileImages: [], // ✅ array for multiple images (works for single too)
        // new field for image file
      }
  );

  const [preview, setPreview] = useState(null); // image preview
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load countries
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formData.country) {
      const country = countries.find((c) => c.isoCode === formData.country);
      if (country) {
        setStates(State.getStatesOfCountry(country.isoCode));
        setCities([]);
        setFormData({ ...formData, state: "", city: "" });
      }
    }
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (formData.state && formData.country) {
      setCities(City.getCitiesOfState(formData.country, formData.state));
      setFormData({ ...formData, city: "" });
    }
  }, [formData.state]);

  // Save draft in localStorage
  useEffect(() => {
    localStorage.setItem("registerDraft", JSON.stringify(formData));
  }, [formData]);

  // Replace your current handleFileChange
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // always an array
    if (files.length > 0) {
      setFormData({ ...formData, profileImages: files }); // ✅ always array
      setPreview(files.map((file) => URL.createObjectURL(file))); // preview works for 1+ files
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step !== steps.length - 1) return;

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profileImages" && formData.profileImages?.length > 0) {
          formData.profileImages.forEach((file) => {
            dataToSend.append("profileImages", file);
          });
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      // const response = await fetch("http://localhost:5000/api/auth/register", {
      //   method: "POST",
      //   body: dataToSend,
      // });
      // ✅ Debug log — check files before sending
      for (let [key, value] of dataToSend.entries()) {
        console.log("🧩 FormData entry:", key, value);
      }

      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        body: dataToSend,
      });

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // ✅ parse JSON only if server sends JSON
      } else {
        const text = await response.text(); // fallback to text
        throw new Error(`Server Error: ${text || "Non-JSON response"}`);
      }

      if (!response.ok) throw new Error(data.message || "Registration failed");

      localStorage.removeItem("registerDraft");
      alert("🎉 Registration completed successfully!");
      console.log("Registered User:", data);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        profileFor: "",
        gender: "",
        dob: "",
        maritalStatus: "",
        height: "",
        religion: "",
        caste: "",
        subCaste: "",
        motherTongue: "",
        gotra: "",
        horoscope: "",
        education: "",
        occupation: "",
        company: "",
        income: "",
        diet: "",
        drinking: "",
        smoking: "",
        country: "",
        state: "",
        city: "",
        address: "",
        fatherOccupation: "",
        motherOccupation: "",
        siblings: "",
        bio: "",
        profileImages: [],
      });
      setPreview(null);
      setStep(0);
    } catch (error) {
      console.error("Registration Error:", error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((s, i) => (
          <div key={i} className="progress-step">
            <div className={`circle ${i <= step ? "active" : ""}`}>{i + 1}</div>
            <p className={`label ${i === step ? "highlight" : ""}`}>{s}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="register-card">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <>
            <h2>Basic Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <div className="password">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <select
                name="profileFor"
                value={formData.profileFor}
                onChange={handleChange}
              >
                <option value="">Profile Created For</option>
                <option>Self</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Brother</option>
                <option>Sister</option>
                <option>Relative</option>
              </select>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Marital Status</option>
              <option>Unmarried</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Separated</option>
            </select>
            <input
              type="text"
              name="height"
              placeholder="Height (e.g. 5'7'')"
              value={formData.height}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 1: Religion & Community */}
        {step === 1 && (
          <>
            <h2>Religion & Community</h2>
            <input
              type="text"
              name="religion"
              placeholder="Religion"
              value={formData.religion}
              onChange={handleChange}
            />
            <div className="password">
              <input
                type="text"
                name="caste"
                placeholder="Caste"
                value={formData.caste}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subCaste"
                placeholder="Sub-caste"
                value={formData.subCaste}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="motherTongue"
              placeholder="Mother Tongue"
              value={formData.motherTongue}
              onChange={handleChange}
            />
            <input
              type="text"
              name="gotra"
              placeholder="Gotra"
              value={formData.gotra}
              onChange={handleChange}
            />
            <input
              type="text"
              name="horoscope"
              placeholder="Star"
              value={formData.horoscope}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 2: Education & Career */}
        {step === 2 && (
          <>
            <h2>Education & Career</h2>
            {/* <input
              type="text"
              name="education"
              placeholder="Education Qualification"
              value={formData.education}
              onChange={handleChange}
            /> */}

            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Education Qualification --</option>
              {[
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
              ].map((education, index) => (
                <option key={index} value={education}>
                  {education}
                </option>
              ))}
            </select>

            {/* <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
            /> */}

            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Occupation --</option>
              {[
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
              ].map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
            />
            {/* <input
              type="text"
              name="income"
              placeholder="Annual Income ex: 500,000"
              value={formData.income}
              onChange={handleChange}
            /> */}
            <select
              name="income"
              value={formData.income}
              onChange={handleChange}
            >
              <option value="">-- Select Annual Income --</option>

              <option value="0 - 1 Lakh">0 - 1 Lakh</option>
              <option value="1 - 2 Lakhs">1 - 2 Lakhs</option>
              <option value="2 - 3 Lakhs">2 - 3 Lakhs</option>
              <option value="3 - 4 Lakhs">3 - 4 Lakhs</option>
              <option value="4 - 5 Lakhs">4 - 5 Lakhs</option>
              <option value="5 - 6 Lakhs">5 - 6 Lakhs</option>
              <option value="6 - 7 Lakhs">6 - 7 Lakhs</option>
              <option value="7 - 8 Lakhs">7 - 8 Lakhs</option>
              <option value="8 - 9 Lakhs">8 - 9 Lakhs</option>
              <option value="9 - 10 Lakhs">9 - 10 Lakhs</option>
              <option value="10 - 15 Lakhs">10 - 15 Lakhs</option>
              <option value="15 - 20 Lakhs">15 - 20 Lakhs</option>
              <option value="20 - 25 Lakhs">20 - 25 Lakhs</option>
              <option value="25 - 30 Lakhs">25 - 30 Lakhs</option>
              <option value="30 - 35 Lakhs">30 - 35 Lakhs</option>
              <option value="35 - 40 Lakhs">35 - 40 Lakhs</option>
              <option value="40 - 45 Lakhs">40 - 45 Lakhs</option>
              <option value="45 - 50 Lakhs">45 - 50 Lakhs</option>
              <option value="50 - 60 Lakhs">50 - 60 Lakhs</option>
              <option value="60 - 70 Lakhs">60 - 70 Lakhs</option>
              <option value="70 - 80 Lakhs">70 - 80 Lakhs</option>
              <option value="80 - 90 Lakhs">80 - 90 Lakhs</option>
              <option value="90 Lakhs - 1 Crore">90 Lakhs - 1 Crore</option>
              <option value="1 Crore & Above">1 Crore & Above</option>
            </select>
          </>
        )}

        {/* Step 3: Lifestyle */}
        {step === 3 && (
          <>
            <h2>Lifestyle</h2>
            <select name="diet" value={formData.diet} onChange={handleChange}>
              <option value="">Diet Preference</option>
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
              <option>Vegan</option>
              <option>Eggetarian</option>
            </select>
            <select
              name="drinking"
              value={formData.drinking}
              onChange={handleChange}
            >
              <option value="">Drinking Habit</option>
              <option>No</option>
              <option>Occasionally</option>
              <option>Yes</option>
            </select>
            <select
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
            >
              <option value="">Smoking Habit</option>
              <option>No</option>
              <option>Occasionally</option>
              <option>Yes</option>
            </select>
          </>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <>
            <h2>Location</h2>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <textarea
              name="address"
              placeholder="Address (optional)"
              value={formData.address}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 5: Family Details */}
        {step === 5 && (
          <>
            <h2>Family Details</h2>
            <input
              type="text"
              name="fatherOccupation"
              placeholder="Father's Occupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
            />
            <input
              type="text"
              name="motherOccupation"
              placeholder="Mother's Occupation"
              value={formData.motherOccupation}
              onChange={handleChange}
            />
            <input
              type="text"
              name="siblings"
              placeholder="Siblings ex: One married sister ..."
              value={formData.siblings}
              onChange={handleChange}
            />
          </>
        )}

        {/* Step 6: Finalize */}
        {step === 6 && (
          <>
            <h2>Finalize</h2>
            <textarea
              name="bio"
              placeholder="Write something about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
            {/* <input
              type="file"
              name="profileImages"
              accept="image/*"
              multiple // allow multiple, still works if only 1 selected
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setFormData({ ...formData, profileImages: files });
                setPreview(files.map((file) => URL.createObjectURL(file)));
              }}
            /> */}

            <input
              type="file"
              name="profileImages"
              accept="image/*"
              multiple // allow multiple, still works if only 1 selected
              onChange={handleFileChange}
            />

            {preview &&
              preview.map((src, i) => (
                <img key={i} src={src} alt="Preview" width="150" height="150" />
              ))}

            <div className="summary">
              <h3>Summary</h3>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="form-buttons">
          {step > 0 && (
            <button type="button" onClick={prevStep} className="btn back">
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn next">
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn submit"
              disabled={
                loading ||
                !formData.bio.trim() ||
                !formData.profileImages?.length
              }
            >
              {loading ? "Registering..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;

// // src/pages/Auth/Register.jsx
// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import "../../App.css";

// // Steps
// const steps = [
//   "Basic Info",
//   "Religion & Community",
//   "Education & Career",
//   "Lifestyle",
//   "Location",
//   "Family Details",
//   "Finalize",
// ];

// const Register = () => {
//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState(
//     () =>
//       JSON.parse(localStorage.getItem("registerDraft")) || {
//         // Basic Info
//         fullName: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         profileFor: "",
//         gender: "",
//         dob: "",
//         maritalStatus: "",
//         height: "",

//         // Religion & Community
//         religion: "",
//         caste: "",
//         subCaste: "",
//         motherTongue: "",
//         gotra: "",
//         horoscope: "",

//         // Education & Career
//         education: "",
//         occupation: "",
//         company: "",
//         income: "",

//         // Lifestyle
//         diet: "",
//         drinking: "",
//         smoking: "",

//         // Location
//         country: "",
//         state: "",
//         city: "",
//         address: "",

//         // Family
//         fatherOccupation: "",
//         motherOccupation: "",
//         siblings: "",

//         // Final
//         bio: "",

//       }
//   );

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   // Load countries
//   useEffect(() => {
//     setCountries(Country.getAllCountries());
//   }, []);

//   // Load states when country changes
//   useEffect(() => {
//     if (formData.country) {
//       const country = countries.find((c) => c.isoCode === formData.country);
//       if (country) {
//         setStates(State.getStatesOfCountry(country.isoCode));
//         setCities([]);
//         setFormData({ ...formData, state: "", city: "" });
//       }
//     }
//   }, [formData.country]);

//   // Load cities when state changes
//   useEffect(() => {
//     if (formData.state && formData.country) {
//       setCities(City.getCitiesOfState(formData.country, formData.state));
//       setFormData({ ...formData, city: "" });
//     }
//   }, [formData.state]);

//   // Save draft in localStorage
//   useEffect(() => {
//     localStorage.setItem("registerDraft", JSON.stringify(formData));
//   }, [formData]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
//   const prevStep = () => setStep((s) => Math.max(s - 1, 0));

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("❌ Passwords do not match!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       localStorage.removeItem("registerDraft");
//       alert("🎉 Registration completed successfully!");
//       console.log("Registered User:", data);
//       // Optionally navigate to login page
//       // navigate("/login");
//     } catch (error) {
//       console.error("Registration Error:", error);
//       alert("❌ " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       {/* Progress Bar */}
//       <div className="progress-bar">
//         {steps.map((s, i) => (
//           <div key={i} className="progress-step">
//             <div className={`circle ${i <= step ? "active" : ""}`}>{i + 1}</div>
//             <p className={`label ${i === step ? "highlight" : ""}`}>{s}</p>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="register-card">
//         {/* Step 0: Basic Info */}
//         {step === 0 && (
//           <>
//             <h2>Basic Information</h2>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//             <select
//               name="profileFor"
//               value={formData.profileFor}
//               onChange={handleChange}
//             >
//               <option value="">Profile Created For</option>
//               <option>Self</option>
//               <option>Son</option>
//               <option>Daughter</option>
//               <option>Brother</option>
//               <option>Sister</option>
//               <option>Relative</option>
//             </select>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//             >
//               <option value="">Select Gender</option>
//               <option>Bride</option>
//               <option>Groom</option>
//             </select>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//             />
//             <select
//               name="maritalStatus"
//               value={formData.maritalStatus}
//               onChange={handleChange}
//             >
//               <option value="">Marital Status</option>
//               <option>Unmarried</option>
//               <option>Divorced</option>
//               <option>Widowed</option>
//               <option>Separated</option>
//             </select>
//             <input
//               type="text"
//               name="height"
//               placeholder="Height (e.g. 5ft 6in)"
//               value={formData.height}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Step 1: Religion & Community */}
//         {step === 1 && (
//           <>
//             <h2>Religion & Community</h2>
//             <input
//               type="text"
//               name="religion"
//               placeholder="Religion"
//               value={formData.religion}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="caste"
//               placeholder="Caste"
//               value={formData.caste}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="subCaste"
//               placeholder="Sub-caste"
//               value={formData.subCaste}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="motherTongue"
//               placeholder="Mother Tongue"
//               value={formData.motherTongue}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="gotra"
//               placeholder="Gotra"
//               value={formData.gotra}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="horoscope"
//               placeholder="Horoscope"
//               value={formData.horoscope}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Step 2: Education & Career */}
//         {step === 2 && (
//           <>
//             <h2>Education & Career</h2>
//             <input
//               type="text"
//               name="education"
//               placeholder="Education Qualification"
//               value={formData.education}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="occupation"
//               placeholder="Occupation"
//               value={formData.occupation}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="company"
//               placeholder="Company"
//               value={formData.company}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="income"
//               placeholder="Annual Income"
//               value={formData.income}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Step 3: Lifestyle */}
//         {step === 3 && (
//           <>
//             <h2>Lifestyle</h2>
//             <select name="diet" value={formData.diet} onChange={handleChange}>
//               <option value="">Diet Preference</option>
//               <option>Vegetarian</option>
//               <option>Non-Vegetarian</option>
//               <option>Vegan</option>
//               <option>Eggetarian</option>
//             </select>
//             <select
//               name="drinking"
//               value={formData.drinking}
//               onChange={handleChange}
//             >
//               <option value="">Drinking Habit</option>
//               <option>No</option>
//               <option>Occasionally</option>
//               <option>Yes</option>
//             </select>
//             <select
//               name="smoking"
//               value={formData.smoking}
//               onChange={handleChange}
//             >
//               <option value="">Smoking Habit</option>
//               <option>No</option>
//               <option>Occasionally</option>
//               <option>Yes</option>
//             </select>
//           </>
//         )}

//         {/* Step 4: Location */}
//         {step === 4 && (
//           <>
//             <h2>Location</h2>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//             >
//               <option value="">Select Country</option>
//               {countries.map((c) => (
//                 <option key={c.isoCode} value={c.isoCode}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               disabled={!formData.country}
//             >
//               <option value="">Select State</option>
//               {states.map((s) => (
//                 <option key={s.isoCode} value={s.isoCode}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               disabled={!formData.state}
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city.name} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
//             <textarea
//               name="address"
//               placeholder="Address (optional)"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Step 5: Family Details */}
//         {step === 5 && (
//           <>
//             <h2>Family Details</h2>
//             <input
//               type="text"
//               name="fatherOccupation"
//               placeholder="Father's Occupation"
//               value={formData.fatherOccupation}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="motherOccupation"
//               placeholder="Mother's Occupation"
//               value={formData.motherOccupation}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="siblings"
//               placeholder="Siblings"
//               value={formData.siblings}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Step 6: Finalize */}
//         {step === 6 && (
//           <>
//             <h2>Finalize</h2>
//             <textarea
//               name="bio"
//               placeholder="Write something about yourself"
//               value={formData.bio}
//               onChange={handleChange}
//             />
//             <div className="summary">
//               <h3>Summary</h3>
//               <pre>{JSON.stringify(formData, null, 2)}</pre>
//             </div>
//           </>
//         )}

//         {/* Buttons */}
//         <div className="form-buttons">
//           {step > 0 && (
//             <button type="button" onClick={prevStep} className="btn back">
//               Back
//             </button>
//           )}
//           {step < steps.length - 1 ? (
//             <button type="button" onClick={nextStep} className="btn next">
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               className="btn submit"
//               disabled={loading || !formData.bio.trim()}
//             >
//               {loading ? "Registering..." : "Submit"}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
