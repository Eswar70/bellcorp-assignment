const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    image: { type: String },
    registeredCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

eventSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Event", eventSchema);
