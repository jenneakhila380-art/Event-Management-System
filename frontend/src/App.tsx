import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ExploreEvents } from './pages/ExploreEvents';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<ExploreEvents />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
