import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import data from "./TemplateData.json"
import './css/Templates.css'
const Templates = () => {
  const [searchTerm,setSearchTerm]=useState("");
  const navigate = useNavigate();

  const handleTemplateClick = (image) => {
    navigate("/create", { state: { templateImage: image } });
  };
  return (
    <div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
        </div>
        <div className="template_Container">
          {
            data 
              .filter((val) => {
                if(searchTerm == ""){
                  return val;
                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
              })
              .map((val) => {
                return(
                  <div className="template" key={val.id} onClick={() => handleTemplateClick(val.image)}>
                      <img src={val.image} alt="" />
                  </div> 
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

export default Templates