import React, { useState, useEffect } from 'react';

const CreateGig = ({ onGigCreated }) => {
  const [gigData, setGigData] = useState({
    title: '',
    description: '',
    priceRange: { min: '', max: '' },
    location: { lat: '', lon: '' },
  });
  const [error, setError] = useState(null);

  // Use geolocation to get the current location of the user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          
          setGigData((prev) => ({
            ...prev,
            location: { lat: latitude, lon: longitude },
          }));
        },
        (err) => {
          setError('Could not fetch location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields (priceRange and location)
    if (name.includes('.')) {
      const [field, key] = name.split('.');
      setGigData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [key]: value },
      }));
    } else {
      setGigData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gigData),
      });

      if (!response.ok) throw new Error('Failed to create gig');

      const createdGig = await response.json();
      setGigData({
        title: '',
        description: '',
        priceRange: { min: '', max: '' },
        location: { lat: '', lon: '' },
      }); // Reset form
      onGigCreated(); // Notify parent about the new gig
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Gig</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={gigData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={gigData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          ></textarea>
        </div>

        {/* Price Range */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Min Price</label>
            <input
              type="number"
              name="priceRange.min"
              value={gigData.priceRange.min}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Max Price</label>
            <input
              type="number"
              name="priceRange.max"
              value={gigData.priceRange.max}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Latitude</label>
            <input
              type="number"
              name="location.lat"
              value={gigData.location.lat}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Longitude</label>
            <input
              type="number"
              name="location.lon"
              value={gigData.location.lon}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Gig
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
