import React, { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";
import toast from "react-hot-toast";
import "./Events.css";

const categories = ["Conference", "Workshop", "Meetup", "Webinar"];

const defaultFilters = {
  search: "",
  location: "",
  category: "",
  dateFrom: "",
  dateTo: ""
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [filters, setFilters] = useState(() => {
    const saved = sessionStorage.getItem("filters");
    return saved ? JSON.parse(saved) : defaultFilters;
  });

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/events", { params: filters });

      setEvents(res.data);

      if (filters.search) {
        setSuggestions(
          res.data
            .filter((e) =>
              e.name.toLowerCase().includes(filters.search.toLowerCase())
            )
            .slice(0, 5)
        );
      } else {
        setSuggestions([]);
      }

    } catch (err) {
      setError("Failed to fetch events");
      toast.error("Error fetching events");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
    fetchEvents();
  }, [filters, fetchEvents]);

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    sessionStorage.removeItem("filters");
  };

  return (
    <div className="container py-4">

      {/* HERO */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Inspiring Events</h1>
          <p>Explore conferences, workshops & experiences worldwide.</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters">

        {/* SEARCH WITH SUGGESTIONS */}
        <div className="position-relative filter-item">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />

          {filters.search && suggestions.length > 0 && (
            <div className="suggestions-box">
              {suggestions.map((s) => (
                <div
                  key={s._id}
                  className="suggestion-item"
                  onClick={() =>
                    setFilters({ ...filters, search: s.name })
                  }
                >
                  {s.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOCATION */}
        <input
          type="text"
          className="form-control filter-item"
          placeholder="Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />

        {/* CATEGORY */}
        <select
          className="form-select filter-item"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* DATE FROM */}
        <input
          type="date"
          className="form-control filter-item"
          value={filters.dateFrom}
          onChange={(e) =>
            setFilters({ ...filters, dateFrom: e.target.value })
          }
        />

        {/* DATE TO */}
        <input
          type="date"
          className="form-control filter-item"
          value={filters.dateTo}
          onChange={(e) =>
            setFilters({ ...filters, dateTo: e.target.value })
          }
        />

        {/* CLEAR BUTTON */}
        <button
          className="btn btn-outline-danger filter-item"
          onClick={handleClearFilters}
        >
          Clear All
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="event-grid">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* EVENTS */}
      {!loading && (
        <div className="event-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
