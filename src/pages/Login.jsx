import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !email) return alert("Enter all details");

    try {
      setLoading(true);
      const res = await API.post("/login", { name, email });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/video";
    } catch {
      alert("Login failed");
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
        <p>Continue to College Video Portal</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </button>
      </div>
    </div>
  );
}






















