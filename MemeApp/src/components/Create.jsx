
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import axios from "axios"; // Import axios
import sidebarData from "../CreateAssets/sidebarItems.json";
import "./css/Create.css";

const Create = ({ userEmail }) => {
  const [preview, setPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  

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

  // Generate meme image
  const generateMemeImage = async () => {
    const memeElement = document.getElementById("meme-editor");
    if (!memeElement) return null;

    const canvas = await html2canvas(memeElement, { useCORS: true });
    return canvas.toDataURL("image/png");
  };

  // Function to save meme
  const saveMeme = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("You need to log in to save memes.");
      return;
    }
  
    const dataUrl = await generateMemeImage();
    if (!dataUrl) return;
  
    try {
      const response = await axios.post("http://localhost:3001/save-meme", {
        email: userEmail,
        imageUrl: dataUrl,
      });
  
      alert("Meme saved successfully!");
      
      // Update local storage with new meme
      const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
      savedMemes.push({ imageUrl: dataUrl });
      localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
    } catch (error) {
      console.error("Error saving meme:", error);
    }
  };

  // Function to download the meme
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

    if (platform === "whatsapp") {
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], "meme.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "Check out my meme!",
          text: "I created this meme, check it out!",
        });
      } else {
        alert("Sharing is not supported on this browser. Try downloading the image and sharing manually.");
      }
    } else if (platform === "twitter") {
      const tweetText = encodeURIComponent("Check out my meme! 😂 #Meme");
      const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(tweetUrl, "_blank");
    } else if (platform === "facebook") {
      alert("Facebook does not allow direct image sharing. Download the meme and upload it manually.");
      downloadMeme(); // Download the meme first
    }
  };

  return (
    <div className="create-container">
      {/* Sidebar */}
      <div className="sidebar">
        {sidebarData.sidebar.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)}>
            {category.name}
          </li>
        ))}
      </div>

      {/* Sub-sidebar */}
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

      {/* Upload Section */}
      <div className="upload">
        <h1>
          <img src="/icons/Upload-Icon.png" alt="upload icon" className="image" />
          Upload image
        </h1>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        {/* Meme Editor */}
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

        {/* Buttons Section */}
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
