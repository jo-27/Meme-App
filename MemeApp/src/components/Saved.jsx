
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import './css/Saved.css'

const Saved = () => {
  const [memes, setMemes] = useState([]);
  const API_BASE_URL = "https://meme-app-1-kj6m.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Please log in.");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/my-memes`, {
          headers: { Authorization: token },
        });

        if (res.data.success) {
          setMemes(res.data.memes);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
        alert("Failed to load memes.");
      }
    };

    fetchMemes();
  }, []);

  // Function to download meme
  const downloadMeme = (imageUrl, index) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `meme_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to navigate to Create page and set preview image
  const handleTemplateClick = (image) => {
    navigate("/create", { state: { templateImage: image } });
  };

  return (
    <div className="saved-container">
      <div className="meme-grid">
        {memes.length > 0 ? (
          memes.map((meme, index) => (
            <div key={index} className="meme-item">
              <img src={meme.imageUrl} alt="Meme" />
              <div className="button-group">
                <button onClick={() => downloadMeme(meme.imageUrl, index)}>
                  Download
                </button>
                <button onClick={() => handleTemplateClick(meme.imageUrl)}>
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No memes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
