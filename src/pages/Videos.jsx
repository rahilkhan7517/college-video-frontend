import React, { useEffect } from "react";

export default function Videos() {
  const videos = [
    { _id: 1, title: "College Function Video 1", videoId: "r8Fh-I3rMsA", description: "College event video" },
    { _id: 2, title: "College Function Video 2", videoId: "tLhfjt8sMoo", description: "College function highlights" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }
  }, []);

  return (
    <div className="video-wrapper">
      <h1>🎓 Access is Protected & Secured. Only Authorised Access</h1>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <h3>{video.title}</h3>
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              allowFullScreen
              title={video.title}
            ></iframe>
            {video.description && <p>{video.description}</p>}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>📸 Candids</h2>
      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">✨</div>
          <h3>Coming Soon!</h3>
          <p>Candid moments and memories from our college events will be here shortly.</p>
          <div className="coming-soon-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
