import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import SkeletonCard from "../components/SkeletonCard";
import toast from "react-hot-toast";
import "./Dashboard.css";

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/registrations/user");

      // Remove invalid registrations (event deleted cases)
      const valid = res.data.filter((r) => r.event && r.event.date);
      setRegistrations(valid);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (eventId) => {
    try {
      await api.delete(`/registrations/${eventId}`);
      toast.success("Registration cancelled");
      fetchRegistrations();
    } catch (err) {
      toast.error("Failed to cancel registration");
    }
  };

  const now = new Date();

  const sortedRegistrations = useMemo(() => {
    const sorted = [...registrations].sort((a, b) => {
      const dateA = new Date(a.event.date);
      const dateB = new Date(b.event.date);
      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
    return sorted;
  }, [registrations, sortOrder]);

  const upcoming = sortedRegistrations.filter(
    (r) => new Date(r.event.date) > now
  );

  const past = sortedRegistrations.filter(
    (r) => new Date(r.event.date) <= now
  );

  const totalEvents = registrations.length;
  const upcomingCount = upcoming.length;

  if (loading) {
    return (
      <div className="container py-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* HEADER + MINI STATS */}
      <div className="dashboard-header">
        <h2>My Dashboard</h2>

        <div className="mini-stats">
          <div className="mini-stat">
            <span className="mini-number">{totalEvents}</span>
            <small>Total</small>
          </div>

          <div className="mini-stat">
            <span className="mini-number">{upcomingCount}</span>
            <small>Upcoming</small>
          </div>
        </div>
      </div>

      {/* SORT DROPDOWN */}
      <div className="d-flex justify-content-end mb-4">
        <select
          className="form-select sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* UPCOMING EVENTS */}
      <h4 className="mb-3">Upcoming Events</h4>

      <div className="dashboard-grid">
        {upcoming.length > 0 ? (
          upcoming.map((r) => (
            <div key={r._id} className="dashboard-card">
              <img
                src={r.event.image || "https://via.placeholder.com/400x250"}
                alt={r.event.name}
              />

              <div className="card-content">
                <h5>{r.event.name}</h5>
                <p>{new Date(r.event.date).toLocaleString()}</p>

                <div className="card-actions">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/event/${r.event._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleCancel(r.event._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {/* PAST EVENTS */}
      <h4 className="mt-5 mb-3">Past Events</h4>

      <div className="dashboard-grid">
        {past.length > 0 ? (
          past.map((r) => (
            <div key={r._id} className="dashboard-card past-event">
              <img
                src={r.event.image || "https://via.placeholder.com/400x250"}
                alt={r.event.name}
              />

              <div className="card-content">
                <h5>{r.event.name}</h5>
                <p>{new Date(r.event.date).toLocaleString()}</p>

                <div className="card-actions">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate(`/event/${r.event._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No past events.</p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
