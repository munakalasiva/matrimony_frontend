import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("🎉 Login successful!");
      navigate("/");
      console.log("Login Response:", data.token);
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login with Email, Mobile, or ID ❤️</p>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          name="identifier"
          placeholder="Email / Mobile / ID"
          value={formData.identifier}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button type="submit" className="btn login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="small-text">
          Don’t have an account?{" "}
          <a href="/register" className="link">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

// // src/pages/Auth/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // redirect after login
// import "../../App.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // save token in localStorage (or cookie)
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       alert("🎉 Login successful!");
//       navigate("/"); // redirect after login
//       console.log("Login Response:", data.token);
//     } catch (err) {
//       console.error("Login Error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <form onSubmit={handleSubmit} className="login-card">
//         <h2>Welcome Back</h2>
//         <p className="subtitle">Login to continue your journey ❤️</p>

//         {error && <p className="error-text">{error}</p>}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           autoComplete="email"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           autoComplete="current-password"
//           required
//         />

//         <button type="submit" className="btn login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="small-text">
//           Don’t have an account?{" "}
//           <a href="/register" className="link">
//             Register
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
