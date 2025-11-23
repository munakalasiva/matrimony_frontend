import React, { createContext, useState, useEffect } from "react";
import profileData from "../data/profileData";

// Create context
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(profileData); // all profiles
  const [filteredProfiles, setFilteredProfiles] = useState(profileData); // visible after filters
  const [filters, setFilters] = useState({
    ageRange: [18, 40],
    location: "",
    caste: "",
    religion: "",
    gender: "",
  });

  // ✅ Filter logic
  useEffect(() => {
    let updated = [...profiles];

    // Age filter
    updated = updated.filter(
      (p) => p.age >= filters.ageRange[0] && p.age <= filters.ageRange[1]
    );

    // Location filter
    if (filters.location) {
      updated = updated.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Caste filter
    if (filters.caste) {
      updated = updated.filter((p) =>
        p.caste.toLowerCase().includes(filters.caste.toLowerCase())
      );
    }

    // Religion filter
    if (filters.religion) {
      updated = updated.filter((p) =>
        p.religion.toLowerCase().includes(filters.religion.toLowerCase())
      );
    }

    // Gender filter
    if (filters.gender) {
      updated = updated.filter(
        (p) => p.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    setFilteredProfiles(updated);
  }, [filters, profiles]);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        setProfiles,
        filteredProfiles,
        setFilteredProfiles,
        filters,
        setFilters,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
