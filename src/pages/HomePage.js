import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pb: 10, 
        px: 2,
      }}
    >
      <img
        src="/images/Luffy.jpg"
        alt="Luffy"
        style={{
            width: 160,
            height: 160,
            objectFit: 'cover',        
            borderRadius: '50%',
            marginBottom: 24,
            border: '4px solid #CC213B',
        }}
    />

      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#E6B96F', mb: 4 }}>
        OneGuessr
      </Typography>

      <Stack spacing={3} sx={{ width: '100%', maxWidth: 300 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/game')}
          sx={{
            bgcolor: '#CC213B',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#a2182e',
            },
          }}
        >
          PLAY
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/stats')}
          sx={{
            bgcolor: '#CC213B',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#a2182e',
            },
          }}
        >
          Statistics
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/settings')}
          sx={{
            bgcolor: '#CC213B',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#a2182e',
            },
          }}
        >
          Settings
        </Button>
      </Stack>
      
    </Box>
  );
}
