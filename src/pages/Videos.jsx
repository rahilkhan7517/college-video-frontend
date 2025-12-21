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
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
          allowFullScreen
        ></iframe>

        <iframe
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
