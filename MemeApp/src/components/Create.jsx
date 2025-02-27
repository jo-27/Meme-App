// import React from "react";
// import { useState } from "react";
// import "./css/Create.css";
// const Create = () => {
//   const [preview, setPreview] = useState(null);

//   const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//               setPreview(reader.result);
//           };
//           reader.readAsDataURL(file);
//       }
//   };
//   return (
//     <div>
//       <div className="sidebar">
//         <li>Image templates</li>
//         <li>Elements</li>
//         <li>Add stickers</li>
//         <li>Add GIFs</li>
//         <li>Add texts</li>
//         <li>Text templates</li>
//       </div>
//       <div className="upload">
        
//         <h1><img src="/icons/Upload-Icon.png" alt="ui" className="image"/>Upload image</h1>
//         <input type="file" onChange={handleFileChange} accept="image/*"/>
//         {preview && <img src={preview} alt="Preview" className="preview-image" />}
//         <button className="download-btn">download</button>
//       </div>
//     </div>
//   );
// };

// export default Create;

import React, { useState } from "react";
import sidebarData from "../CreateAssets/sidebarItems.json";
import "./css/Create.css";

const Create = () => {
  const [preview, setPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    <div className="create-container">
      {/* Main Sidebar */}
      <div className="sidebar">
        {sidebarData.sidebar.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)}>
            {category.name}
          </li>
        ))}
      </div>

      {/* Sub-sidebar (visible only if a category is selected) */}
      {selectedCategory && (
        <div className="sub-sidebar">
          <h3>{selectedCategory.name}</h3>
          <div className="sub-sidebar-content">
            {selectedCategory.items.map((item, idx) =>
              selectedCategory.type === "image" ? (
                <img
                  key={idx}
                  src={item}
                  alt={`${selectedCategory.name} ${idx}`}
                  className="sub-sidebar-image"
                />
              ) : (
                <div key={idx} className="sub-sidebar-text">
                  {item}
                </div>
              )
            )}
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
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button className="download-btn">download</button>
      </div>
    </div>
  );
};

export default Create;
