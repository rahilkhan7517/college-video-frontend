import React, { useEffect, useState } from "react";
import API from "../api";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    // Fetch videos from backend
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(res.data.videos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        // Fallback to demo videos if API fails
        setVideos([
          { _id: 1, title: "Video 1", videoId: "YOUR_VIDEO_ID_1" },
          { _id: 2, title: "Video 2", videoId: "YOUR_VIDEO_ID_2" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="video-wrapper"><h2>Loading videos...</h2></div>;
  }

  return (
    <div className="video-wrapper">
      <h1>🎓 College Function Videos</h1>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="video-item">
              <h3>{video.title}</h3>
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                allowFullScreen
              ></iframe>
              {video.description && <p>{video.description}</p>}
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
}
