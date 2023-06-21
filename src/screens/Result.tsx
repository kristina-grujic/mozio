import React, { useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDistances from '../hooks/useDistances';
import { CircularProgress, Typography } from '@mui/material';
import { Button } from '@mui/base';

function Result() {
  const { getDistances, data, loading, error } = useDistances();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const cities = (searchParams.get('cities') || '').split(',').filter((item) => !!item);
    if (!cities.length) {
      navigate('/');
      return;
    }
    getDistances(cities);
  }, []);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [])

  const totalDistance = useMemo(() => {
    const total = data.reduce((previous, current) => (previous + current.distance), 0);
    return Math.round(total*100) / 100;
  }, [data]);

  if (loading) {
    return (
      <Box>
        <CircularProgress size={30}/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography>Oops! Something went wrong!</Typography>
        <Button onClick={goBack}>Back</Button>
      </Box>
    )
  }

  return (
    <Box>
      {
        data.map((item, index) => (
          <Box key={index}>
            <Typography>{index === 0 && item.from}</Typography>
            <Typography variant="body2">{item.distance} km</Typography>
            <Typography>{item.to}</Typography>
          </Box>
        ))
      }
      <Typography>
        <strong>{totalDistance} km</strong> is total distance
      </Typography>
      <Typography>
        <strong>{searchParams.get('passengers')}</strong> passengers
      </Typography>
      <Typography>
        <strong>{dayjs(searchParams.get('date')).format('MMM DD, YYYY')}</strong>
      </Typography>
      <Button onClick={goBack}>Back</Button>
    </Box>
  );
}

export default Result;
