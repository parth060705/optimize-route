import React from "react";
import FileUpload from "./filesup";
import MapViewer from "./MapViewer";
import MultiAddressForm from "./address";

const HomePage = ({ uploadPath, geocodePath, info, onUploadComplete, onAddressGeocode }) => {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-8 space-y-6">
      <FileUpload onPathUpdate={onUploadComplete} />

      {info.distance_km && (
        <p className="text-lg font-medium text-[#000000]">
          Distance: {info.distance_km} km ({info.type})
        </p>
      )}

      {uploadPath.length > 0 && <MapViewer path={uploadPath} />}

      <MultiAddressForm onGeocodeComplete={onAddressGeocode} />

      {geocodePath.length > 0 && <MapViewer path={geocodePath} />}
    </main>
  );
};

export default HomePage;
