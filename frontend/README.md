# Eventify - React Frontend Guide

This document explains the architecture of the **React + TypeScript + Vite** conversion of Eventify, designed so you and your team can easily understand, maintain, and extend the codebase.

---

## 🌟 Why We Converted to React
1. **Single Page Application (SPA):** Instant navigation between Home (`/`) and Explore Events (`/events`) without browser page reloads.
2. **Declarative State Management:** Instead of manual `document.querySelector` and `element.style.display = 'none'` DOM manipulation, filters, sorting, and search inputs are managed with React state hooks (`useState`, `useMemo`).
3. **Reusable Component Architecture:** Common UI elements (Navbar, Footer, Event Cards) are encapsulated into components rather than duplicating HTML across multiple files.
4. **Preserved 100% of the Original Styling:** All CSS classes, variables, animations, and dark-theme gradients designed in `style.css` and `events.css` remain untouched and active.
5. **Seamless Backend Connectivity:** Automatically attempts to fetch events from the Node.js/PostgreSQL backend (`http://localhost:5001/api/events`), falling back to mock events if the backend is offline.

---

## 📁 Project Architecture (`frontend/src/`)

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Responsive navigation bar with mobile toggle
│   │   ├── Footer.tsx        # Common footer
│   │   └── EventCard.tsx     # Reusable card component (supports Home & Explore variants)
│   ├── pages/
│   │   ├── Home.tsx          # Converted from index.html (Hero, Search, Categories, Featured)
│   │   └── ExploreEvents.tsx # Converted from events.html (Category tabs, price/sort toolbar, live search)
│   ├── styles/
│   │   ├── style.css         # Teammate's global dark theme & home page styles
│   │   └── events.css        # Teammate's explore page styles
│   ├── types/
│   │   └── event.ts          # TypeScript interfaces for Event data
│   ├── data/
│   │   └── mockEvents.ts     # Pre-seeded fallback events matching the UI
│   ├── App.tsx               # Route definitions (/ and /events)
│   └── main.tsx              # React DOM entry point wrapped in BrowserRouter
├── vite.config.ts            # Fast Vite dev server configuration
└── package.json
```

---

## 💡 How It Works (Explaining It to Your Teammate)

### 1. Reusable Components
- **`Navbar.tsx`**: Uses React Router's `<Link>` to navigate instantly. Manages mobile menu state (`menuOpen`) with `useState`, automatically switching between `☰` and `✕`.
- **`EventCard.tsx`**: Accepts an `event` prop. Dynamically handles formatting prices (`Free` vs `₹299`) and applies appropriate styling classes.

### 2. Live Filtering & Sorting (`ExploreEvents.tsx`)
In vanilla JS, `events.js` had multiple event listeners querying the DOM directly.
In React, we use `useMemo`:
```tsx
const filteredEvents = useMemo(() => {
  return events
    .filter(event => matchesSearch && matchesLocation && matchesCategory && matchesPrice)
    .sort((a, b) => handleSort(a, b));
}, [events, searchTerm, locationTerm, selectedCategory, priceFilter, sortOption]);
```
Whenever the user types or changes a dropdown, React automatically updates the cards and the counter (`{filteredEvents.length} events found`) without any manual DOM manipulation.

### 3. URL Synchronization
When a user clicks **"Music"** or **"Technology"** on the Home page, it navigates to `/events?category=music`.
`ExploreEvents.tsx` reads this parameter with `useSearchParams()` and pre-selects the corresponding category filter automatically.

---

## 🚀 Running the App

```bash
cd Event-Management-System/frontend

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev
```

Visit: **`http://localhost:5173`**
