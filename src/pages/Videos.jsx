import React, { useEffect, useRef, useState } from "react";

export default function Videos() {
  const [fullscreenId, setFullscreenId] = useState(null);
  const fullscreenRefs = useRef({});

  const videos = [
    { _id: 1, title: "College Function Video 1", type: "drive", driveId: "1ZSgaHj3NDQen5T_Xnfw6TRMSqECA0WuU", description: "College event video" },
    { _id: 2, title: "College Function Video 2", type: "youtube", videoId: "tLhfjt8sMoo", description: "College function highlights" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }
  }, []);

  const handleFullscreen = (videoId) => {
    const element = fullscreenRefs.current[videoId];
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setFullscreenId(null);
      } else {
        element.requestFullscreen().then(() => {
          setFullscreenId(videoId);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenId(null);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="video-wrapper">
      <h1>🎓 Access is Protected & Secured. Only Authorised Access</h1>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <div 
              className="video-container"
              ref={(el) => (fullscreenRefs.current[video._id] = el)}
            >
              <iframe
                src={video.type === "drive" 
                  ? `https://drive.google.com/file/d/${video.driveId}/preview`
                  : `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&modestbranding=1&fs=0&controls=1&showinfo=0`
                }
                title={video.title}
                allow={video.type === "drive" ? "" : "encrypted-media"}
              ></iframe>
              <button 
                className="fullscreen-btn"
                onClick={() => handleFullscreen(video._id)}
                title={fullscreenId === video._id ? "Exit Fullscreen" : "View Fullscreen"}
              >
                {fullscreenId === video._id ? "✕" : "⛶"}
              </button>
            </div>
            <h3>{video.title}</h3>
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
