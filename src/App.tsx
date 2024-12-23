import { useState } from 'react';
import AppContent from './components/AppContent';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <LoadingScreen />
      {showApp ? (
        <AppContent onReturnHome={() => setShowApp(false)} />
      ) : (
        <Home onEnterApp={() => setShowApp(true)} />
      )}
    </>
  );
}

export default App;