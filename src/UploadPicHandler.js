import React, { useState } from "react";


function UploadPicHandler() {
    const [selectedFile, setSelectedFile] = useState(null);
//   const [fileData, setFileData] = useState(null);
  
  function handleUpload() {
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((response) => response.json()).then((result) => {
        localStorage.setItem("fileData", JSON.stringify(result.data));
      }).catch((error) => {
        console.error(error);
      });
  }
  
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function getFileDataFromLocalStorage() {
    const fileData = localStorage.getItem("fileData");
    return fileData ? JSON.parse(fileData) : null;
  }
  
  const fileData = getFileDataFromLocalStorage();
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileData && (
        <div>
          <h2>File data:</h2>
          <p>{fileData.name}</p>
          <p>{fileData.size} bytes</p>
          <p>{fileData.type}</p>
        </div>
      )}
    </div>
  );}
  
  
  export default UploadPicHandler;