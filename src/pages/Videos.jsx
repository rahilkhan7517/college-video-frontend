import React, { useEffect, useRef, useState } from "react";

export default function Videos() {
  const [fullscreenId, setFullscreenId] = useState(null);
  const [quality, setQuality] = useState("auto");
  const [rotation, setRotation] = useState(0);
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
        setRotation(0);
      } else {
        element.requestFullscreen().then(() => {
          setFullscreenId(videoId);
        });
      }
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreenId(null);
      setRotation(0);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenId(null);
        setRotation(0);
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
              className={`video-container ${fullscreenId === video._id ? "in-fullscreen" : ""}`}
              ref={(el) => (fullscreenRefs.current[video._id] = el)}
              style={fullscreenId === video._id ? { transform: `rotate(${rotation}deg)` } : {}}
            >
              {fullscreenId === video._id && (
                <div className="fullscreen-header">
                  <button 
                    className="youtube-btn back-from-fullscreen"
                    onClick={handleExitFullscreen}
                    title="Back to Video Section"
                  >
                    ← Back
                  </button>
                  <span className="video-title-fullscreen">{video.title}</span>
                </div>
              )}

              <div className="video-content">
                <iframe
                  src={video.type === "drive" 
                    ? `https://drive.google.com/file/d/${video.driveId}/preview`
                    : `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&modestbranding=1&fs=0&controls=1&showinfo=0`
                  }
                  title={video.title}
                  allow={video.type === "drive" ? "" : "encrypted-media"}
                ></iframe>
              </div>

              <div className="youtube-controls">
                {video.type === "drive" && (
                  <div className="quality-dropdown">
                    <select 
                      value={quality} 
                      onChange={(e) => setQuality(e.target.value)}
                      className="youtube-quality-select"
                      title="Video Quality"
                    >
                      <option value="auto">Auto</option>
                      <option value="360p">360p</option>
                      <option value="480p">480p</option>
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                    </select>
                  </div>
                )}
                
                {fullscreenId === video._id && (
                  <button 
                    className="youtube-btn rotate-btn"
                    onClick={handleRotate}
                    title="Rotate"
                  >
                    ↻
                  </button>
                )}
                
                <button 
                  className="youtube-btn fullscreen-control-btn"
                  onClick={() => handleFullscreen(video._id)}
                  title={fullscreenId === video._id ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {fullscreenId === video._id ? "⛶" : "⛶"}
                </button>
              </div>
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
