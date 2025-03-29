import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path) => {
    if (path.startsWith('/game')) return 1;
    if (path.startsWith('/stats')) return 2;
    return 0;
  };

  const [value, setValue] = React.useState(getValueFromPath(location.pathname));

  React.useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,zIndex: 1300 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate('/');
          if (newValue === 1) navigate('/game');
          if (newValue === 2) navigate('/stats');
        }}
        sx={{ bgcolor: 'black' }}
        showLabels
      >
        <BottomNavigationAction
          label="Accueil"
          icon={<HomeIcon />}
          sx={{
            color: '#E6B96F',
            '&.Mui-selected': {
              color: '#CC213B',
            },
          }}
        />
        <BottomNavigationAction
          label="Jeu"
          icon={<SportsEsportsIcon />}
          sx={{
            color: '#E6B96F',
            '&.Mui-selected': {
              color: '#CC213B',
            },
          }}
        />
        <BottomNavigationAction
          label="Stats"
          icon={<BarChartIcon />}
          sx={{
            color: '#E6B96F',
            '&.Mui-selected': {
              color: '#CC213B',
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}