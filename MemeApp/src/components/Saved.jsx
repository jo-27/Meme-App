import React, { useEffect, useState } from "react";
import axios from "axios";

const Saved = ({ userEmail }) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/my-memes/${userEmail}`)
      .then(response => setMemes(response.data))
      .catch(error => console.error("Error fetching memes:", error));
  }, [userEmail]);

  return (
    <div className="my-memes-container">
      <h2>My Saved Memes</h2>
      <div className="meme-grid">
        {memes.map((meme, index) => (
          <img key={index} src={meme.imageUrl} alt="Saved Meme" className="saved-meme" />
        ))}
      </div>
    </div>
  );
};

export default Saved;

