import React, { useCallback, useMemo } from 'react';
import { Button, Box, Stack, styled, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderRadius: '10px',
  margin: '20vh auto',
}));

export const StyledButton = styled(Button)(() => ({
  background: '#374151',
  color: 'white',
  textTransform: 'none',
  padding: '10px 20px',
  '&:hover': {
    background: 'black'
  },
  '&.Mui-disabled': {
    background: '#e6e7eb',
    color: 'white',
  }
}));

export const BoldText = styled(Typography)`
  color: #7786d2;
  font-weight: bold;
  display: inline-block;
`;