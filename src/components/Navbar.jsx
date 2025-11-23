import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/kalyanam-logo1.png";
import { IoSearch } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi"; // toggle icons
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      // 🔒 If not logged in, redirect to login page
      navigate("/login");
      return; // stop here, don’t continue
    }

    // ✅ If logged in and query is not empty
    if (query.trim()) {
      navigate(`/matches?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo" className="kalyanam-logo" />
      </Link>

      {/* Hamburger toggle (only visible on mobile) */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Menu */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        {/* {user && ( */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-container">
            <IoSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
        {/* )} */}

        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/about"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/matches"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Matches
            </Link>
            <Link
              to="/dashboard"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              MyProfile
            </Link>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <span className="nav-link logout-link" onClick={handleLogoutClick}>
              Logout
            </span>
          </>
        ) : (
          <>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/kalyanam-logo1.png";
// import { IoSearch } from "react-icons/io5";
// import "./component.css";

// const Navbar = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const handleLogoutClick = () => {
//     onLogout();
//     navigate("/");
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/matches?search=${encodeURIComponent(query.trim())}`);
//       setQuery("");
//     }
//   };

//   // Styles
//   const navStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "8px 30px",
//     backgroundColor: "#800000", // maroon
//     color: "#fff",
//   };

//   const logoStyle = {
//     fontSize: "22px",
//     fontWeight: "bold",
//     color: "#FFD700", // gold
//     textDecoration: "none",
//   };

//   const menuStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//   };

//   const linkStyle = {
//     color: "#ffebcd",
//     textDecoration: "none",
//     fontSize: "18px",
//     fontWeight: "500",
//   };
//   const containerStyle = {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//   };

//   const searchInputStyle = {
//     padding: "5px 10px 5px 30px", // add left padding for icon
//     borderRadius: "15px",
//     border: "2px solid #ffebcd",
//     outline: "none",
//     fontSize: "15px",
//     width: "187px",
//     marginTop: "20px",
//     color: "#ffebcd",
//     backgroundColor: "transparent",
//   };

//   const searchIconStyle = {
//     position: "absolute",
//     left: "10px",
//     top: "55%",
//     transform: "translateY(-50%)",
//     color: "#ffebcd",
//     pointerEvents: "none",
//     fontSize: "20px", // so icon doesn't block typing
//   };

//   const searchFormStyle = {
//     display: "flex",
//     alignItems: "center",
//   };

//   return (
//     <nav style={navStyle}>
//       {/* Logo */}
//       <Link to="/" style={logoStyle}>
//         <img src={logo} alt="logo" className="kalyanam-logo" />
//       </Link>

//       {/* Menu */}
//       <div style={menuStyle}>
//         {user && (
//           <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
//             <div style={containerStyle}>
//               <IoSearch style={searchIconStyle} />
//               <input
//                 type="text"
//                 placeholder="Search by name or ID"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 style={searchInputStyle}
//                 className="search-input"
//               />
//             </div>
//           </form>
//         )}

//         <Link to="/" style={linkStyle}>
//           Home
//         </Link>
//         <Link to="/about" style={linkStyle}>
//           About
//         </Link>

//         {user ? (
//           <>
//             {/* 🔍 Search bar visible only for logged-in users */}

//             <Link to="/matches" style={linkStyle}>
//               Matches
//             </Link>
//             <Link to="/dashboard" style={linkStyle}>
//               MyProfile
//             </Link>
//             <Link to="/contact" style={linkStyle}>
//               Contact
//             </Link>

//             <span
//               style={{ ...linkStyle, cursor: "pointer" }}
//               onClick={handleLogoutClick}
//             >
//               Logout
//             </span>
//           </>
//         ) : (
//           <>
//             <Link to="/contact" style={linkStyle}>
//               Contact
//             </Link>
//             <Link to="/login" style={linkStyle}>
//               Login
//             </Link>
//             <Link to="/register" style={linkStyle}>
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
