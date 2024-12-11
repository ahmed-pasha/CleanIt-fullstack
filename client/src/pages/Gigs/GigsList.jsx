import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GigItem from "../../components/GigItem";
import { getDistance } from "geolib";
import { toast } from "react-toastify";

// Fix default icon issues in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const GigsList = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([12.9073152, 77.5847936]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGigs = async () => {
    if (!location.lat || !location.lon) {
      setError("Location is required to fetch gigs.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await fetch(
        `http://localhost:5000/api/gigs?lat=${location.lat}&lon=${location.lon}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format: Expected an array.");
      }
      setGigs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lon: longitude };
          setUserLocation(userLoc);
          setLocation(userLoc);
          console.log(userLoc);
          
          setMapCenter([latitude, longitude]);
        },
        (err) => {
          console.error("Error fetching user location:", err.message);
          toast.error("Unable to fetch your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Automatically fetch user location on mount
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchGigs();
      setMapCenter([location.lat, location.lat])
      console.log(mapCenter);
      
    }
  }, [location]);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
    setMapCenter([location.lat, location.lon]); // Update map center manually
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Nearby Gigs</h1>

      <div className="flex gap-4 mt-4">
        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          value={location.lat}
          onChange={handleLocationChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
        />
        <input
          type="number"
          name="lon"
          placeholder="Longitude"
          value={location.lon}
          onChange={handleLocationChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
        />
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-6">
        <MapContainer
          center={mapCenter}
          // center={[location.lon,location.lat]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lon]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {gigs.map((gig) => (
            <Marker
              key={gig._id}
              position={[
                gig.location.coordinates[1],
                gig.location.coordinates[0],
              ]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{gig.title}</h3>
                  <p>{gig.description}</p>
                  {userLocation && (
                    <p>
                      Distance: {" "}
                      {(
                        getDistance(
                          {
                            latitude: gig.location.coordinates[1],
                            longitude: gig.location.coordinates[0],
                          },
                          {
                            latitude: userLocation.lat,
                            longitude: userLocation.lon,
                          }
                        ) / 1000
                      ).toFixed(2)} km
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Gigs List</h2>
        {gigs.length > 0 ? (
          gigs.map((gig) => <GigItem key={gig._id} gig={gig} />)
        ) : (
          <p className="text-center">No gigs found.</p>
        )}
      </div>
    </div>
  );
};

export default GigsList;