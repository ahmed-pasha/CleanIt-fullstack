import { useState, useEffect } from 'react';
import axios from 'axios';

const useGigs = (lat, lon) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/gigs?lat='+lat+'lon='+lon);
        console.log(response);
        
        setGigs(response.data);
      } catch (err) {
        setError('Failed to fetch gigs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchGigs();
    }
  }, [lat, lon]); // Refetch gigs when lat/lon changes

  return { gigs, loading, error };
};

export default useGigs;

