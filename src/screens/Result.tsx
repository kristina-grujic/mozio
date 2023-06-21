import React, { useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDistances from '../hooks/useDistances';
import { CircularProgress, Typography, styled, Box } from '@mui/material';
import { StyledButton, Container, BoldText } from '../components/common';
import { LocationOnOutlined, PanoramaFishEyeOutlined } from '@mui/icons-material';

const COMMON_SX = Object.freeze({
  m: 0.5
});


const StyledCity = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 10px;
  margin-right: 50px;
`;

const StyledIcon = styled(Box)(() => ({
  position: 'relative',
  '&:before': {
    content: '"• • •"',
    position: 'absolute',
    top: '40px',
    left: '-3px',
    transform: 'rotate(90deg)',
    display: 'inline-block',
    fontSize: 20,
  }
}))

const Distance = styled(Box)`
  color: #7786d2;
  border: 1px solid #7786d2;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 20px;
  transform: translateX(-100%);
  width: fit-content;
`;

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
      <Container>
        <CircularProgress size={30}/>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography>Oops! Something went wrong!</Typography>
        <StyledButton onClick={goBack}>Back</StyledButton>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ml: 20}}>
      {
        data.map((item, index) => {
          return (
          <Box key={index} >
            <StyledCity>
              <StyledIcon><PanoramaFishEyeOutlined sx={{ mr: 5 }}/></StyledIcon>
              <Typography>{item.from}</Typography>
            </StyledCity>
              <Distance>{item.distance} km</Distance>
              {
                index === data.length - 1 ? (
                  <StyledCity>
                    <LocationOnOutlined sx={{color: 'red', mr: 5, fontSize: 30}} />
                    <Typography>{item.to}</Typography>
                  </StyledCity>
                ) : null
              }
          </Box>
        )
      })
      }
      </Box>
      <Typography sx={COMMON_SX}>
        <BoldText>{totalDistance} km</BoldText> is total distance
      </Typography>
      <Typography sx={COMMON_SX}>
        <BoldText>{searchParams.get('passengers')}</BoldText> passengers
      </Typography>
      <BoldText sx={COMMON_SX}>
        {dayjs(searchParams.get('date')).format('MMM DD, YYYY')}
      </BoldText>
      <StyledButton sx={{mt: 5}} onClick={goBack}>Back</StyledButton>
    </Container>
  );
}

export default Result;
