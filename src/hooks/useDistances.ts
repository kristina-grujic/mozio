import React, { useCallback, useState } from 'react';
import { fetchDistances } from '../api/endpoints';

type Distance = {
  from: string;
  to: string;
  distance: number;
}

const useDistances = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Distance[]>([]);
  const [error, setError] = useState(null);
  const getDistances = useCallback((cities: string[]) => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetchDistances(cities).then((response) => {
      setData(response);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    })
  }, [loading, setLoading, setError]);

  return {
    getDistances, loading, data, error
  }
}

export default useDistances;