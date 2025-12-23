import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import HardGamePage from './pages/HardGamePage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';


import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext'; 
import { MusicProvider } from './context/MusicContext';
import { SoundProvider } from './context/SoundContext';


import SettingsMenu from './components/SettingsMenu';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MusicProvider>
          <SoundProvider>
            <Router>
              
              <SettingsMenu />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/hard-game" element={<HardGamePage />} />
                <Route path="/stats" element={<StatsPage />} />
                {/*<Route path="/settings" element={<SettingsPage />} />*/}
              </Routes>
            </Router>
          </SoundProvider>
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;