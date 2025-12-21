import React, { useEffect } from "react";

export default function Videos() {
  const videos = [
    { _id: 1, title: "College Function Video 1", videoId: "r8Fh-I3rMsA", description: "College event video" },
    { _id: 2, title: "College Function Video 2", videoId: "tLhfjt8sMoo", description: "College function highlights" },
  ];

  const behindTheScenes = [
    { _id: 3, title: "Behind The Scenes 1", videoId: "dQw4w9WgXcQ", description: "Behind the scenes content" },
    { _id: 4, title: "Behind The Scenes 2", videoId: "jNQXAC9IVRw", description: "More behind the scenes" },
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
      <h1>🎓 College Function Videos</h1>

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

      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>🎬 Behind The Scenes</h2>
      <div className="video-grid">
        {behindTheScenes.map((video) => (
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
    </div>
  );
}
