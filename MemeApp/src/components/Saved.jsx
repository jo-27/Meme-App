import React, { useEffect, useState } from "react";
import axios from "axios";

const Saved = () => {
  const [memes, setMemes] = useState([]);
  const API_BASE_URL = "https://meme-app-1-kj6m.onrender.com";

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

  return (
    <div>
      <h2>My Saved Memes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {memes.length > 0 ? (
          memes.map((meme, index) => (
            <img key={index} src={meme.imageUrl} alt="Meme" style={{ width: "200px" }} />
          ))
        ) : (
          <p>No memes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
