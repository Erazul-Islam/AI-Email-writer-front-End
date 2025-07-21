"use client"

import React, { useState } from "react";
import axios from "axios";

function ImageCaptionUploader() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setCaption("");
    setError("");

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError("");
    setCaption("");

    console.log(formData)

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_CAPTION_API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response)

      if (response.data.success) {
        setCaption(response.data.data);
      } else {
        setError(response.data.message || "Failed to get caption");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 12,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#222" }}>
        🖼️ Upload Image for Caption
      </h2>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <input
          type="file"
          accept="image/*"
          className="text-black"
          onChange={handleFileChange}
          style={{ marginBottom: 16, cursor: "pointer" }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#999" : "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            fontWeight: "600",
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>
      </form>

      {previewUrl && (
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
          }}
        >
          <h4 style={{ marginBottom: 8, color: "#555" }}>Preview:</h4>
          <img
            src={previewUrl}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: 240,
              borderRadius: 10,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      )}

      {caption && (
        <div
          style={{
            marginTop: 30,
            backgroundColor: "#f0f8ff",
            padding: 16,
            borderRadius: 8,
            boxShadow: "inset 0 0 8px #007BFF33",
            fontSize: 18,
            color: "#003366",
            fontWeight: "600",
          }}
        >
          <strong>Caption:</strong> {caption}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: 20,
            color: "#d32f2f",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default ImageCaptionUploader;
