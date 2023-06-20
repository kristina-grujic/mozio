import React, { useCallback, useState } from 'react';
import { fetchCities } from '../api/endpoints';

const useCities = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const getCities = useCallback((keyword: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetchCities(keyword).then((response) => {
      setData(response);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    })
  }, [loading, setLoading, setError]);

  return {
    getCities, loading, data, error
  }
}

export default useCities;