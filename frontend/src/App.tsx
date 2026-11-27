import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ExploreEvents } from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/events"
            element={<ExploreEvents />}
          />

          <Route
            path="/event-details/:eventId"
            element={<EventDetails />}
          />
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;