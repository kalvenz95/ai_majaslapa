import React, { useState } from 'react';
import HomeScreen from '../app/HomeScreen';
import AppLayout from '../components/AppLayout';

export default function App() {
  const [view, setView] = useState('landing');
  const [initialPanel, setInitialPanel] = useState('home');

  function openApp(panel = 'home') {
    setInitialPanel(panel);
    setView('app');
  }

  if (view === 'app') {
    return <AppLayout onBack={() => setView('landing')} initialPanel={initialPanel} />;
  }
  return <HomeScreen onOpenApp={openApp} />;
}
