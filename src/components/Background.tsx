import React from 'react';
import backgroundImg from '../assets/background.png';
import { Box, styled } from '@mui/material';

const StyledContainer = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const BackgroundImage = styled('image')(({ src }: { src: string }) => ({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  zIndex: -1
}));

const Background = ({ children }: { children: React.ReactNode}) => {
  return (
    <StyledContainer>
      {children}
      <BackgroundImage src={backgroundImg} />
    </StyledContainer>
  )
}

export default Background;