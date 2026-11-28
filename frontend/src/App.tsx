import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ExploreEvents } from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import BookTicket from './pages/BookTicket';
import MyBookings from './pages/MyBookings';
import BookingConfirmation from './pages/BookingConfirmation';

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
          <Route 
          path="/book-ticket/:eventId"
          element={<BookTicket />} 
          />
          <Route path="/my-bookings"
           element={<MyBookings />} 
           />
           <Route path="/booking-confirmation" 
           element={<BookingConfirmation />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;