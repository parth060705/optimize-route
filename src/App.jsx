import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Loginpage from "./Loginpage";
import Register from "./register";

function App() {
  const [uploadPath, setUploadPath] = useState([]);
  const [geocodePath, setGeocodePath] = useState([]);
  const [info, setInfo] = useState({ distance_km: null, type: "" });

  const handleUploadComplete = (path, distance, type) => {
    setUploadPath(path);
    setInfo({ distance_km: distance, type });
  };

  const handleAddressGeocode = (geocodedPath) => {
    setGeocodePath(geocodedPath);
    setInfo({ distance_km: null, type: "From Addresses" });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <Home
                uploadPath={uploadPath}
                geocodePath={geocodePath}
                info={info}
                onUploadComplete={handleUploadComplete}
                onAddressGeocode={handleAddressGeocode}
              />
            }
          />
        </Route>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
