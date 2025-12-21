import React, { useEffect, useState } from "react";
import API from "../api";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    // Fetch videos from backend
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await API.get("/videos");
        console.log("Videos fetched:", res.data);
        setVideos(res.data.videos || []);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setError("Failed to load videos. Showing demo content.");
        // Fallback to demo videos if API fails
        setVideos([
          { _id: 1, title: "College Function Video 1", videoId: "r8Fh-I3rMsA", description: "College event video" },
          { _id: 2, title: "College Function Video 2", videoId: "tLhfjt8sMoo", description: "College function highlights" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="video-wrapper">
        <h1>🎓 College Function Videos</h1>
        <h2>Loading videos...</h2>
      </div>
    );
  }

  return (
    <div className="video-wrapper">
      <h1>🎓 College Function Videos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="video-grid">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="video-item">
              <h3>{video.title || "Untitled Video"}</h3>
              {video.videoId && (
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  allowFullScreen
                  title={video.title}
                ></iframe>
              )}
              {video.description && <p>{video.description}</p>}
            </div>
          ))
        ) : (
          <p>No videos available. Please add videos to the database.</p>
        )}
      </div>
    </div>
  );
}
