import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapViewer({ path }) {
  if (!path || path.length === 0) {
    return <p className="text-center text-white mt-4">No route to display</p>;
  }

  const center = path[0];

  return (
    <div className="w-[1200px] max-w-4xl h-[400px] mx-auto mt-6">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} color="#6b21a8" weight={4} />
        {path.map(([lat, lon], i) => (
          <Marker
            key={i}
            position={[lat, lon]}
            icon={L.divIcon({
              className: "leaflet-div-icon custom-icon",
              html: `
                <div style="background: #ffff; color: black; border: 3px solid black; border-radius: 5px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 15px;">
                  ${i + 1}
                </div>`,
            })}
          >
            <Popup>{i === 0 ? "Start" : i === path.length - 1 ? "End" : `Point ${i + 1}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapViewer;
