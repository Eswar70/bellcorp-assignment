import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkRegistration = useCallback(async () => {
    try {
      const res = await api.get("/registrations/user");
      const exists = res.data.find(r => r.event._id === id);
      setRegistered(!!exists);
    } catch {}
  }, [id]);

  useEffect(() => {
    fetchEvent();
    if (token) checkRegistration();
  }, [fetchEvent, checkRegistration, token]);

  const handleRegister = async () => {
    try {
      await api.post(`/registrations/${id}`);
      toast.success("Registered successfully!");
      setRegistered(true);
      fetchEvent();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error registering");
    }
  };

  const handleCancel = async () => {
    try {
      await api.delete(`/registrations/${id}`);
      toast.success("Registration cancelled");
      setRegistered(false);
      fetchEvent();
    } catch {
      toast.error("Error cancelling registration");
    }
  };

  if (loading) return <Loader />;
  if (!event) return null;

  return (
    <div className="container">
      <div className="details-card">
        <img src={event.image} alt={event.name} className="event-image" />
        <h2>{event.name}</h2>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p>{event.description}</p>

        <p>Seats: {event.capacity - event.registeredCount} / {event.capacity}</p>

        {token && (
          registered ? (
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel Registration
            </button>
          ) : (
            <button className="register-btn" onClick={handleRegister}>
              Register
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EventDetails;
