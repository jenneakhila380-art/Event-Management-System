import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/booking.css';

interface Booking {
  bookingId: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketPrice: number;
  quantity: number;
  totalPrice: number;
  attendeeName: string;
  attendeeEmail: string;
  bookingDate: string;
}

function MyBookings() {
  const navigate = useNavigate();

  const bookings: Booking[] = JSON.parse(
    localStorage.getItem('myBookings') || '[]'
  );

  return (
    <div className="my-bookings-container">
      <div className="my-bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your event tickets in one place.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <h2>No Bookings Yet</h2>
          <p>
            You haven't booked any events yet.
            Start exploring and find your next experience!
          </p>

          <button onClick={() => navigate('/events')}>
            Explore Events
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking.bookingId}
            >
              <div className="booking-card-header">
                <h2>{booking.eventTitle}</h2>
                <span className="booking-status">
                  Confirmed
                </span>
              </div>

              <p>
                <strong>Date:</strong> {booking.eventDate}
              </p>

              <p>
                <strong>Location:</strong> {booking.eventLocation}
              </p>

              <p>
                <strong>Tickets:</strong> {booking.quantity}
              </p>

              <p>
                <strong>Price per ticket:</strong> ₹
                {booking.ticketPrice}
              </p>

              <div className="booking-card-footer">
                <span>Total Amount</span>
                <strong>₹{booking.totalPrice}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-to-events-btn"
        onClick={() => navigate('/events')}
      >
        Explore More Events
      </button>
    </div>
  );
}

export default MyBookings;