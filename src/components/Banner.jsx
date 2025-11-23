import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/bannerImg2.png";
import banner3 from "../assets/bannerImg3.png";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const navigate = useNavigate();

  // Country/State selection
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    lookingFor: "",
    ageMin: "",
    ageMax: "",
    religion: "",
    motherTongue: "",
    country: "",
    state: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search click
  const handleSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/matches", { state: { filters: formData } });
    } else {
      navigate("/login");
    }
  };

  // Handle browse profiles button
  const handleProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/matches");
    } else {
      navigate("/login");
    }
  };

  // Age options (18 to 60)
  const ages = Array.from({ length: 43 }, (_, i) => i + 18);

  // Religions
  const religions = ["Hindu", "Other"];

  // Mother tongues
  const motherTongues = [
    "Telugu",
    "Tamil",
    "Hindi",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Bengali",
    "Urdu",
    "Odia",
    "Other",
  ];

  return (
    <section className="banner">
      {/* 🔽 Slider Section */}
      <Slider {...settings}>
        {[banner1, banner2, banner3].map((img, index) => (
          <div key={index} className="banner-slide">
            <img src={img} alt={`Banner ${index + 1}`} className="banner-img" />
            <div className="banner-overlay"></div>

            <div className="banner-content">
              <h1>
                Find Your <span className="highlight">Perfect Match</span>
              </h1>
              <p>India's most trusted Telugu matrimony platform.</p>

              <div className="banner-buttons">
                <button
                  className="btn-register"
                  onClick={() => navigate("/register")}
                >
                  Register Free
                </button>
                <button className="btn-browse" onClick={handleProfile}>
                  Browse Profiles
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* 🔽 Filter Section */}
      <div className="banner-filter">
        <form className="filter-form" onSubmit={handleSearch}>
          {/* Looking For */}
          <select name="lookingFor" onChange={handleChange}>
            <option value="">Looking For</option>
            <option value="Bride">Bride</option>
            <option value="Groom">Groom</option>
          </select>

          {/* Age From */}
          <select name="ageMin" onChange={handleChange}>
            <option value="">Age From</option>
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>

          {/* Age To */}
          <select name="ageMax" onChange={handleChange}>
            <option value="">Age To</option>
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>

          {/* Religion */}
          <select name="religion" onChange={handleChange}>
            <option value="">Religion</option>
            {religions.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>

          {/* Mother Tongue */}
          <select name="motherTongue" onChange={handleChange}>
            <option value="">Mother Tongue</option>
            {motherTongues.map((mt) => (
              <option key={mt} value={mt}>
                {mt}
              </option>
            ))}
          </select>

          {/* Country */}
          <select
            name="country"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              handleChange(e);
            }}
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}
          <select
            name="state"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              handleChange(e);
            }}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {selectedCountry &&
              State.getStatesOfCountry(selectedCountry).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
          </select>

          {/* Search Button */}
          <button type="submit" className="btn-search">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner;

// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Banner.css";

// import banner1 from "../assets/banner.jpg";
// import banner2 from "../assets/bannerImg2.png";
// import banner3 from "../assets/bannerImg3.png";
// import { useNavigate } from "react-router-dom";
// import { Country, State } from "country-state-city";

// const Banner = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//   };

//   const navigate = useNavigate();

//   // 🔽 State for filter values
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");

//   const handleProfile = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/matches");
//     } else {
//       navigate("/login");
//     }
//   };

//   // Age options (18 to 60)
//   const ages = Array.from({ length: 43 }, (_, i) => i + 18);

//   // Religions
//   const religions = [
//     "Hindu",
//     "Muslim",
//     "Christian",
//     "Sikh",
//     "Buddhist",
//     "Jain",
//     "Parsi",
//     "Jewish",
//     "Other",
//   ];

//   // Mother tongues
//   const motherTongues = [
//     "Telugu",
//     "Tamil",
//     "Hindi",
//     "Kannada",
//     "Malayalam",
//     "Marathi",
//     "Gujarati",
//     "Punjabi",
//     "Bengali",
//     "Urdu",
//     "Odia",
//     "Other",
//   ];

//   return (
//     <section className="banner">
//       <Slider {...settings}>
//         {[banner1, banner2, banner3].map((img, index) => (
//           <div key={index} className="banner-slide">
//             <img src={img} alt={`Banner ${index + 1}`} className="banner-img" />
//             <div className="banner-overlay"></div>

//             <div className="banner-content">
//               <h1>
//                 Find Your <span className="highlight">Perfect Match</span>
//               </h1>
//               <p>India's most trusted Telugu matrimony platform.</p>

//               <div className="banner-buttons">
//                 <button
//                   className="btn-register"
//                   onClick={() => navigate("/register")}
//                 >
//                   Register Free
//                 </button>
//                 <button className="btn-browse" onClick={handleProfile}>
//                   Browse Profiles
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>

//       {/* 🔽 Filter section */}
//       <div className="banner-filter">
//         <form className="filter-form">
//           <select>
//             <option>Looking For</option>
//             <option>Bride</option>
//             <option>Groom</option>
//           </select>

//           {/* Age From */}
//           <select>
//             <option>Age From</option>
//             {ages.map((age) => (
//               <option key={age}>{age}</option>
//             ))}
//           </select>

//           {/* Age To */}
//           <select>
//             <option>Age To</option>
//             {ages.map((age) => (
//               <option key={age}>{age}</option>
//             ))}
//           </select>

//           {/* Religion */}
//           <select>
//             <option>Religion</option>
//             {religions.map((rel) => (
//               <option key={rel}>{rel}</option>
//             ))}
//           </select>

//           {/* Mother Tongue */}
//           <select>
//             <option>Mother Tongue</option>
//             {motherTongues.map((mt) => (
//               <option key={mt}>{mt}</option>
//             ))}
//           </select>

//           {/* Country */}
//           <select
//             value={selectedCountry}
//             onChange={(e) => {
//               setSelectedCountry(e.target.value);
//               setSelectedState(""); // reset state when country changes
//             }}
//           >
//             <option value="">Select Country</option>
//             {Country.getAllCountries().map((c) => (
//               <option key={c.isoCode} value={c.isoCode}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           {/* State */}
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             disabled={!selectedCountry}
//           >
//             <option value="">Select State</option>
//             {selectedCountry &&
//               State.getStatesOfCountry(selectedCountry).map((s) => (
//                 <option key={s.isoCode} value={s.isoCode}>
//                   {s.name}
//                 </option>
//               ))}
//           </select>

//           <button type="submit" className="btn-search">
//             Search
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Banner;
