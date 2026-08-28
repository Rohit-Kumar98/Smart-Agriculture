import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const roverIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function LocationMap({ observation }) {
    const latitude = Number(observation?.latitude || 12.9716);
    const longitude = Number(observation?.longitude || 77.5946);

    return (
        <div className="h-64 overflow-hidden rounded-lg">
            <MapContainer
                center={[latitude, longitude]}
                zoom={16}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[latitude, longitude]}
                    icon={roverIcon}
                >
                    <Popup>
                        <strong>Rover Payload</strong>
                        <br />
                        Lat: {latitude}, Long: {longitude}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default LocationMap;
