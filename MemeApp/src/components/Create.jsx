import React from "react";
import { useState } from "react";
import "./css/Create.css";
const Create = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setPreview(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };
  return (
    <div>
      <div class="sidebar">
        <li>Image templates</li>
        <li>Elements</li>
        <li>Add stickers</li>
        <li>Add GIFs</li>
        <li>Add texts</li>
        <li>Text templates</li>
      </div>
      <div class="upload">
        
        <h1><img src="/icons/Upload-Icon.png" alt="ui" className="image"/>Upload image</h1>
        <input type="file" onChange={handleFileChange} accept="image/*"/>
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button className="download-btn">download</button>
      </div>
    </div>
  );
};

export default Create;
