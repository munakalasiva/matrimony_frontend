import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileListItem from "../components/ProfileListItem";
import SearchFilters from "../components/SearchFilters";
import { useLocation } from "react-router-dom";

const Matches = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";

  const initialFilters = location.state?.filters || {};
  const [filters, setFilters] = useState(initialFilters);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);

        const res = await axios.get(
          "http://localhost:5000/api/match/profiles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let allProfiles = res.data || [];

        // ✅ Filter opposite gender
        if (user?.gender === "Bride") {
          allProfiles = allProfiles.filter((p) => p.gender === "Groom");
        } else if (user?.gender === "Groom") {
          allProfiles = allProfiles.filter((p) => p.gender === "Bride");
        }

        setProfiles(allProfiles);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const applyFilters = (data) => setFilters(data);

  const getAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return new Date(ageDiff).getUTCFullYear() - 1970;
  };

  // ✅ Combine advanced filters + search query
  const filteredProfiles = profiles.filter((p) => {
    const matchesFilters =
      (!filters.ageMin || getAge(p.dob) >= parseInt(filters.ageMin)) &&
      (!filters.ageMax || getAge(p.dob) <= parseInt(filters.ageMax)) &&
      (!filters.location ||
        p.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.state?.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.country?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.caste ||
        p.caste?.toLowerCase() === filters.caste.toLowerCase()) &&
      (!filters.education ||
        p.education?.toLowerCase().includes(filters.education.toLowerCase())) &&
      (!filters.occupation ||
        p.occupation
          ?.toLowerCase()
          .includes(filters.occupation.toLowerCase())) &&
      (!filters.incomeMin ||
        parseInt(p.income) >= parseInt(filters.incomeMin)) &&
      (!filters.incomeMax ||
        parseInt(p.income) <= parseInt(filters.incomeMax)) &&
      (!filters.maritalStatus ||
        p.maritalStatus?.toLowerCase() ===
          filters.maritalStatus.toLowerCase()) &&
      (!filters.motherTongue ||
        p.motherTongue?.toLowerCase() === filters.motherTongue.toLowerCase());

    // ✅ Search by name OR customId
    const matchesSearch =
      !searchQuery ||
      p.fullName?.toLowerCase().includes(searchQuery) ||
      p.customId?.toLowerCase().includes(searchQuery);

    return matchesFilters && matchesSearch;
  });

  return (
    <div style={{ display: "flex", gap: 80, padding: 20 }}>
      <div style={{ flex: "0 0 280px" }}>
        <SearchFilters onApply={applyFilters} />
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: 16, color: "#800000" }}>
          Profiles Found ({filteredProfiles.length})
        </h2>

        {loading ? (
          <p>Loading profiles...</p>
        ) : filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileListItem key={profile._id} profile={profile} />
          ))
        ) : (
          <p style={{ color: "#666" }}>No profiles match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Matches;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProfileListItem from "../components/ProfileListItem";
// import SearchFilters from "../components/SearchFilters";
// import { useLocation } from "react-router-dom";

// const Matches = () => {
//   const location = useLocation();
//   const initialFilters = location.state?.filters || {};
//   const [filters, setFilters] = useState(initialFilters);
//   const [profiles, setProfiles] = useState([]);
//   // const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log(user); // 👈 get user
//         setCurrentUser(user);

//         const res = await axios.get(
//           "http://localhost:5000/api/match/profiles",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         let allProfiles = res.data || [];
//         console.log("Fetched Profiles:", allProfiles);

//         // ✅ Show only opposite gender profiles
//         if (user?.gender === "Bride") {
//           allProfiles = allProfiles.filter((p) => p.gender === "Groom");
//         } else if (user?.gender === "Groom") {
//           allProfiles = allProfiles.filter((p) => p.gender === "Bride");
//         }

//         setProfiles(allProfiles);
//       } catch (err) {
//         console.error("Error fetching profiles:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const applyFilters = (data) => {
//     setFilters(data);
//   };

//   const getAge = (dob) => {
//     if (!dob) return null;
//     const birthDate = new Date(dob);
//     const ageDiff = Date.now() - birthDate.getTime();
//     return new Date(ageDiff).getUTCFullYear() - 1970;
//   };

//   // ✅ Apply search filters
//   const filteredProfiles = profiles.filter((p) => {
//     return (
//       (!filters.ageMin || getAge(p.dob) >= parseInt(filters.ageMin)) &&
//       (!filters.ageMax || getAge(p.dob) <= parseInt(filters.ageMax)) &&
//       (!filters.location ||
//         p.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
//         p.state?.toLowerCase().includes(filters.location.toLowerCase()) ||
//         p.country?.toLowerCase().includes(filters.location.toLowerCase())) &&
//       (!filters.caste ||
//         p.caste?.toLowerCase() === filters.caste.toLowerCase()) &&
//       (!filters.education ||
//         p.education?.toLowerCase().includes(filters.education.toLowerCase())) &&
//       (!filters.occupation ||
//         p.occupation
//           ?.toLowerCase()
//           .includes(filters.occupation.toLowerCase())) &&
//       (!filters.incomeMin ||
//         parseInt(p.income) >= parseInt(filters.incomeMin)) &&
//       (!filters.incomeMax ||
//         parseInt(p.income) <= parseInt(filters.incomeMax)) &&
//       (!filters.maritalStatus ||
//         p.maritalStatus?.toLowerCase() ===
//           filters.maritalStatus.toLowerCase()) &&
//       (!filters.motherTongue ||
//         p.motherTongue?.toLowerCase() === filters.motherTongue.toLowerCase())
//     );
//   });

//   return (
//     <div style={{ display: "flex", gap: 80, padding: 20 }}>
//       <div style={{ flex: "0 0 280px" }}>
//         <SearchFilters onApply={applyFilters} />
//       </div>

//       <div style={{ flex: 1 }}>
//         <h2 style={{ marginBottom: 16, color: "#800000" }}>
//           Profiles Found ({filteredProfiles.length})
//         </h2>

//         {loading ? (
//           <p>Loading profiles...</p>
//         ) : filteredProfiles.length > 0 ? (
//           filteredProfiles.map((profile) => (
//             <ProfileListItem key={profile._id} profile={profile} />
//           ))
//         ) : (
//           <p style={{ color: "#666" }}>No profiles match your search.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Matches;
