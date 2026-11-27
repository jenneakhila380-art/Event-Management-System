import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { INITIAL_EVENTS } from '../data/mockEvents';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredEvents, setFeaturedEvents] = useState<any[]>(INITIAL_EVENTS.slice(0, 3));

  // Sync featured events if backend is running
  React.useEffect(() => {
    fetch('http://localhost:5001/api/events?featured=true')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.events?.length) {
          setFeaturedEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    navigate(`/events?${params.toString()}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-label">YOUR NEXT EXPERIENCE STARTS HERE</span>
          <h1>
            Discover Events.<br />
            <span>Create Memories.</span>
          </h1>
          <p>
            Find exciting events, connect with people, and make every moment unforgettable.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events →
            </Link>
            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-card">
            <div className="image-overlay">
              <span>UPCOMING EXPERIENCE</span>
              <h3>Something Amazing<br />Is Waiting For You</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <form className="search-box" onSubmit={handleHeroSearch}>
          <div className="search-item">
            <label>What are you looking for?</label>
            <input
              type="text"
              placeholder="Search events..."
              id="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-item">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter city"
              id="locationInput"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="search-btn" id="searchBtn">
            Search Events
          </button>
        </form>
      </section>

      {/* Categories Section */}
      <section className="categories section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Browse by Category</h2>
          </div>
          <Link to="/events" className="view-all">
            View All →
          </Link>
        </div>

        <div className="category-grid">
          <Link to="/events?category=music" className="category-card">
            <div className="category-icon">🎵</div>
            <h3>Music</h3>
            <p>Concerts & festivals</p>
          </Link>

          <Link to="/events?category=technology" className="category-card">
            <div className="category-icon">💻</div>
            <h3>Technology</h3>
            <p>Tech talks & workshops</p>
          </Link>

          <Link to="/events?category=arts" className="category-card">
            <div className="category-icon">🎨</div>
            <h3>Arts</h3>
            <p>Creative experiences</p>
          </Link>

          <Link to="/events?category=education" className="category-card">
            <div className="category-icon">🎓</div>
            <h3>Education</h3>
            <p>Learning & seminars</p>
          </Link>
        </div>
      </section>

      {/* Featured Events */}
      <section className="events section" id="events">
        <div className="section-heading">
          <div>
            <span className="section-label">DON'T MISS OUT</span>
            <h2>Featured Events</h2>
          </div>
          <Link to="/events" className="view-all">
            Explore All →
          </Link>
        </div>

        <div className="event-grid">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="home" />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section" id="about">
        <div className="about-content">
          <span className="section-label">ABOUT EVENTIFY</span>
          <h2>
            Your Gateway to<br />
            <span>Unforgettable Experiences</span>
          </h2>
          <p>
            Eventify makes discovering, organizing, and attending events simple. From exciting concerts
            to educational workshops, everything you need is in one place.
          </p>
          <Link to="/events" className="primary-btn">
            Start Exploring →
          </Link>
        </div>
      </section>
    </>
  );
};
