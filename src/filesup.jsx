import React, { useState } from "react";

const FileUpload = ({ onPathUpdate }) => {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("Uploading file...");
    setStatusType("info");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://optimize-route-backend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.path) {
        onPathUpdate(data.path, data.distance_km, data.type);
        setStatus("✅ Upload successful. Route calculated.");
        setStatusType("success");
      } else {
        setStatus("❌ " + (data.error || "Unknown error"));
        setStatusType("error");
      }
    } catch (err) {
      setStatus("❌ Upload failed. Check backend.");
      setStatusType("error");
    }
  };

  const statusColor = {
    info: "text-blue-400",
    success: "text-green-500",
    error: "text-red-500",
  }[statusType] || "";

  return (
      <div className="bg-[#6b21a8] border-1 border-[#ffff] rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-4">
        <h2 className="text-white text-xl font-semibold">
          Upload Delivery Route File
        </h2>

        <label
          htmlFor="file-upload"
          className="inline-block bg-gradient-to-br from-cyan-300 to-cyan-700 text-white py-2.5 px-6 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 hover:from-cyan-500 hover:to-cyan-900"
        >
          Choose CSV or JSON
          <input
            type="file"
            id="file-upload"
            accept=".csv,.json"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {fileName && (
          <p className="text-sm text-white break-words">
            📁 <span className="font-medium">{fileName}</span>
          </p>
        )}

        {status && (
          <p className={`font-medium text-sm ${statusColor}`}>
            {status}
          </p>
        )}

        <p className="text-xs text-white opacity-70">
          Accepted formats: <strong>.csv</strong>, <strong>.json</strong>
        </p>
      </div>
  );
};

export default FileUpload;
