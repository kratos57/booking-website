// ImageViewerDialog.js

import React from "react";
import "./ImageViewerDialog.css"; // Importez votre fichier CSS

const ImageViewerDialog = ({ photos, onClose }) => {
  return (
    <div className="imageViewerDialog">
      <button onClick={onClose} className="closeButton">
        Close
      </button>
      <div className="imageGallery">
        {/* Render each photo in the gallery */}
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageViewerDialog;
