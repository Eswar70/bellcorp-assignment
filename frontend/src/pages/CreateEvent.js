import React, { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [form, setForm] = useState({
    name: "",
    organizer: "",
    location: "",
    date: "",
    description: "",
    capacity: "",
    category: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", form);
      toast.success("Event created successfully!");
    } catch {
      toast.error("Error creating event");
    }
  };

  return (
    <div className={`container py-4`}>
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Create Event</h2>
        {Object.keys(form).map(key => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e)=>setForm({...form, [key]: e.target.value})}
            required
          />
        ))}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
