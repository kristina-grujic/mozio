import React, { useCallback, useMemo } from 'react';
import { Button, Box, Stack, styled, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '40px 60px',
  minWidth: '50vw',
  minHeight: '400px',
  width: 'fit-content'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
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
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  }
}));

export const BoldText = styled(Typography)`
  color: #7786d2;
  font-weight: bold;
  display: inline-block;
`;