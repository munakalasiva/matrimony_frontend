// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Premium from "./pages/Premium";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import FloatingButtons from "./components/FloatingButtons";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <div
        className="app-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Navbar */}
        <Navbar user={user} onLogout={handleLogout} />
        <FloatingButtons />
        {/* Page Content */}
        <main style={{ flex: 1, background: "#fafafa" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Register onRegister={handleLogin} />}
            />

            {/* Account Route (Protected) */}
            {/* <Route
              path="/account"
              element={
                user ? <Account user={user} /> : <Navigate to="/login" />
              }
            /> */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Auth from "./pages/Auth";
// import Premium from "./pages/Premium";
// import Matches from "./pages/Matches";
// import Profile from "./pages/Profile";
// import Search from "./pages/Search";
// import Account from "./pages/MyAccount";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div
//         className="app-container"
//         style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         {/* Navbar always visible */}
//         <Navbar />

//         {/* Page Content */}
//         <main style={{ flex: 1, background: "#fafafa" }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/premium" element={<Premium />} />
//             <Route path="/matches" element={<Matches />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/account" element={<Account />} />
//           </Routes>
//         </main>

//         {/* Footer always visible */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
