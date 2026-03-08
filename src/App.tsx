import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import VoiceAssistant from './pages/VoiceAssistant';
import WebDesign from './pages/WebDesign';
import Ticketing from './pages/Ticketing';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/project/web-design" element={<WebDesign />} />
        <Route path="/project/ticketing" element={<Ticketing />} />
      </Routes>
    </Router>
  );
}

export default App;
