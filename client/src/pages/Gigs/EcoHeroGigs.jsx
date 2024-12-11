import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { apiurl } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { getDistance } from "geolib";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";

const EcoHeroGigs = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [gig, setGig] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchGigDetails = async () => {
      setLoading(true);
      try {
        // Fetch gig details
        const response = await fetch(`${apiurl}/api/gigs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setGig(data);
  
          // Fetch user's current location
          if (data.location?.coordinates) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const [gigLon, gigLat] = data.location.coordinates;
  
                const distanceInMeters = getDistance(
                  { latitude: gigLat, longitude: gigLon },
                  { latitude: userLat, longitude: userLon }
                );
  
                setDistance((distanceInMeters / 1000).toFixed(2)); // Convert to kilometers
              },
              (err) => {
                console.error("Error fetching user location:", err.message);
                toast.error("Unable to fetch your location.");
              }
            );
          }
        } else {
          setError("Failed to fetch gig details.");
        }
      } catch (error) {
        setError(error.message);
        toast.error("An error occurred while fetching the gig details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchGigDetails();
  }, [id]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{gig.title}</h1>
        <p className="text-gray-600 mb-2">{gig.description}</p>
        <p className="text-lg font-medium mb-4 text-gray-700">
          <span className="font-bold">Amount to be Received:</span> ₹{gig.finalBidAmt}
        </p>
        {distance >=0 && (
          <p className="text-lg font-medium mb-4 text-gray-700">
            <span className="font-bold">Distance:</span> {distance} km away
          </p>
        )}
      <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
  {gig.location?.coordinates ? (
    <MapContainer
      center={[gig.location.coordinates[1], gig.location.coordinates[0]]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      
      {/* Gig Location Marker */}
      <Marker
        position={[gig.location.coordinates[1], gig.location.coordinates[0]]}
      >
        <Popup>
          {gig.title} - {distance ? `${distance} km away` : "Location"}
        </Popup>
      </Marker>

      {/* User Location Marker */}
      {user?.location?.coordinates && (
        <>
          <Marker
            position={[user.location.coordinates[1], user.location.coordinates[0]]}
          >
            <Popup>Your current location</Popup>
          </Marker>

          {/* Line from User to Gig */}
          <Polyline
            positions={[
              [user.location.coordinates[1], user.location.coordinates[0]],
              [gig.location.coordinates[1], gig.location.coordinates[0]],
            ]}
            color="blue"
          />
        </>
      )}
    </MapContainer>
  ) : (
    <p className="text-gray-500">Location data is not available.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default EcoHeroGigs;
