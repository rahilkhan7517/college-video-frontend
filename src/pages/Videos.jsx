import React from "react";
import { useEffect } from "react";

export default function Videos() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
  }, []);

  return (
    <div className="video-wrapper">
      <h1>🎓 College Function Videos</h1>

      <div className="video-grid">
        <iframe
          src="https://www.youtube.com/embed/r8Fh-I3rMsA"
          allowFullScreen
        ></iframe>

        <iframe
          src="https://www.youtube.com/embed/tLhfjt8sMoo"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
