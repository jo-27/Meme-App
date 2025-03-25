
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";
import sidebarData from "../CreateAssets/sidebarItems.json";
import "./css/Create.css";

const Create = () => {
  const location = useLocation();
  const templateImage = location.state?.templateImage || null;
  const API_BASE_URL ="https://meme-app-1-kj6m.onrender.com";
  const [preview, setPreview] = useState(templateImage);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".share-menu") && !event.target.closest(".download-btn")) {
        setIsShareMenuOpen(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const saveMeme = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to save memes.");
      return;
    }
  
    const dataUrl = await generateMemeImage();
    if (!dataUrl) return;
  
    try {
      await axios.post(
        `${API_BASE_URL}/save-meme`,
        { imageUrl: dataUrl },
        { headers: { Authorization: token } }
      );
      alert("Meme saved successfully!");
    } catch (error) {
      console.error("Error saving meme", error);
      alert("Failed to save meme.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleItemClick = (item, type) => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), item, type, nodeRef: React.createRef() },
    ]);
  };

  const generateMemeImage = async () => {
    const memeElement = document.getElementById("meme-editor");
    if (!memeElement) return null;

    const canvas = await html2canvas(memeElement, { useCORS: true });
    return canvas.toDataURL("image/png");
  };

  const downloadMeme = async () => {
    const dataUrl = await generateMemeImage();
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "meme.png";
    link.click();
  };
  const shareMeme = async (platform) => {
    const dataUrl = await generateMemeImage();
    if (!dataUrl) return;
  
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "meme.png", { type: "image/png" });
  
    if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=Check%20out%20this%20meme!%20😂%20&url=${dataUrl}`;
      window.open(whatsappUrl, "_blank");
    } else if (platform === "twitter") {
      const tweetText = encodeURIComponent("Check out my meme! 😂 #Meme");
      const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(tweetUrl, "_blank");
    } else if (platform === "facebook") {
      alert("Facebook does not allow direct image sharing. Download the meme and upload it manually.");
      downloadMeme();
    }
  };

  return (
    <div className="create-container">
      <div className="sidebar">
        {sidebarData.sidebar.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)}>
            {category.name}
          </li>
        ))}
      </div>

      {selectedCategory && (
        <div className="sub-sidebar">
          <h3>{selectedCategory.name}</h3>
          <div className="sub-sidebar-content">
            {selectedCategory.items.map((item, idx) => (
              <div key={idx} onClick={() => handleItemClick(item, selectedCategory.type)}>
                {selectedCategory.type === "image" ? (
                  <img src={item} alt={`Sticker ${idx}`} className="sub-sidebar-image" />
                ) : (
                  <div className="sub-sidebar-text">{item}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="upload">
        <h1>
          <img src="/icons/Upload-Icon.png" alt="upload icon" className="image" />
          Upload image
        </h1>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        <div id="meme-editor" className="meme-editor">
          {preview && <img src={preview} alt="Preview" className="preview-image" />}

          {selectedItems.map(({ id, item, type, nodeRef }) => (
            <Draggable key={id} nodeRef={nodeRef}>
              <div ref={nodeRef} className="draggable-item">
                {type === "image" ? (
                  <img src={item} alt="Sticker" className="draggable-image" />
                ) : (
                  <div className="draggable-text">{item}</div>
                )}
              </div>
            </Draggable>
          ))}
        </div>

        <div className="buttons">
          <button className="download-btn" onClick={downloadMeme}>
            Download
          </button>
          <button className="download-btn" onClick={saveMeme}>
            Save
          </button>
          <button className="download-btn" onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}>
             Share
           </button>
           {isShareMenuOpen && (
            <div className="share-menu">
              <button onClick={() => shareMeme("whatsapp")} className="download-btn">WhatsApp</button>
              <button onClick={() => shareMeme("twitter")} className="download-btn">Twitter</button>
              <button onClick={() => shareMeme("facebook")} className="download-btn">Facebook</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
