import React, { useState } from "react";

function ImgUploader() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    // Reset error and image
    setError("");
    setImage(null);

    if (!file) return;

    // Validate file type
    if (!validTypes.includes(file.type)) {
      setError("Only PNG, JPEG, and WEBP formats are allowed.");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError("File size must be less than 1MB.");
      return;
    }

    // Read and preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button>
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          Upload Image
        </label>
      </button>
      <input
        type="file"
        id="image-upload"
        accept="image/png, image/jpeg, image/webp"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}

export default ImgUploader;
