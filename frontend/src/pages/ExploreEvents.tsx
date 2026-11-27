import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { INITIAL_EVENTS } from '../data/mockEvents';
import { EventItem } from '../types/event';

const CATEGORIES = ['all', 'technology', 'music', 'education', 'arts', 'business'] as const;

export const ExploreEvents: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [locationTerm, setLocationTerm] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Sync state if URL query params change (e.g. from Home category clicks)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat as any)) {
      setSelectedCategory(cat);
    }
    const search = searchParams.get('search');
    if (search) setSearchTerm(search);
    const loc = searchParams.get('location');
    if (loc) setLocationTerm(loc);
  }, [searchParams]);

  // Optional: Try fetching from live PostgreSQL backend if available, fallback to mock
  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data.events && Array.isArray(data.events) && data.events.length > 0) {
          // Merge API data with images
          const merged = data.events.map((e: any, index: number) => ({
            ...e,
            imageClass: INITIAL_EVENTS[index % INITIAL_EVENTS.length]?.imageClass || 'event-image-one'
          }));
          setEvents(merged);
        }
      })
      .catch(() => {
        // Fallback gracefully to INITIAL_EVENTS
        setEvents(INITIAL_EVENTS);
      });
  }, []);

  // Filter and Sort in clean declarative React
  const filteredEvents = useMemo(() => {
    const sTerm = searchTerm.toLowerCase().trim();
    const lTerm = locationTerm.toLowerCase().trim();

    return events
      .filter((event) => {
        const eventTitle = (event.title || '').toLowerCase();
        const eventCategory = (event.category || '').toLowerCase();
        const eventDesc = (event.description || '').toLowerCase();
        const eventLocation = (event.location || '').toLowerCase();

        // Match search across title, category, or description (handles "music", "tech", "summit", etc.)
        const matchesSearch =
          !sTerm ||
          eventTitle.includes(sTerm) ||
          eventCategory.includes(sTerm) ||
          eventDesc.includes(sTerm);

        // Match city / location loosely (e.g. "Hyderabad", "India", "Pune")
        const matchesLocation = !lTerm || eventLocation.includes(lTerm);

        // Match category tab
        const matchesCategory =
          selectedCategory === 'all' || eventCategory === selectedCategory.toLowerCase();

        // Match price
        const numPrice = Number(event.price);
        let matchesPrice = true;
        if (priceFilter === 'free') matchesPrice = numPrice === 0;
        if (priceFilter === 'paid') matchesPrice = numPrice > 0;

        return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') return Number(a.price) - Number(b.price);
        if (sortOption === 'price-high') return Number(b.price) - Number(a.price);
        if (sortOption === 'name') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [events, searchTerm, locationTerm, selectedCategory, priceFilter, sortOption]);

  const handleSearchClick = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (locationTerm.trim()) params.set('location', locationTerm.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchTerm('');
      setLocationTerm('');
      setPriceFilter('all');
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <>
      {/* Explore Hero */}
      <section className="explore-hero">
        <div className="explore-hero-content">
          <span className="section-label">FIND YOUR NEXT EXPERIENCE</span>
          <h1>
            Explore Amazing <span>Events</span>
          </h1>
          <p>
            Discover concerts, workshops, conferences, and unforgettable experiences happening around you.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="explore-search-section">
        <form className="explore-search-box" onSubmit={handleSearchClick}>
          <div className="search-field">
            <label htmlFor="eventSearch">Search Events</label>
            <input
              type="text"
              id="eventSearch"
              placeholder="Search event name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label htmlFor="eventLocation">Location</label>
            <input
              type="text"
              id="eventLocation"
              placeholder="Enter city..."
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="explore-search-btn"
            id="searchBtn"
          >
            Search Events
          </button>
        </form>
      </section>

      {/* Main Events Section */}
      <section className="explore-section">
        <div className="explore-heading">
          <div>
            <span className="section-label">DISCOVER</span>
            <h2>Upcoming Events</h2>
            <p>Find the perfect event for your interests.</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters" id="categoryFilters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              data-category={cat}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat === 'all' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters and Sort Toolbar */}
        <div className="events-toolbar">
          <div className="results-count">
            <span id="eventCount">{filteredEvents.length}</span> events found
          </div>

          <div className="toolbar-controls">
            <select
              id="priceFilter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="free">Free Events</option>
              <option value="paid">Paid Events</option>
            </select>

            <select
              id="sortEvents"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Event Name</option>
            </select>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="explore-event-grid" id="eventGrid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="explore" />
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="no-events" id="noEvents" style={{ display: 'block' }}>
            <h3>No Events Found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </section>
    </>
  );
};
