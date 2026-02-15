import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <motion.div
      className="card shadow-sm"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={event.image || "https://via.placeholder.com/400x250"}
        className="card-img-top"
        alt={event.name}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text small">{event.location}</p>
        <p className="card-text small">
          {new Date(event.date).toLocaleDateString()}
        </p>

        <Link
          to={`/event/${event._id}`}
          className="btn btn-outline-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
