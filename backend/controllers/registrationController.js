const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    if (event.registeredCount >= event.capacity)
      return res.status(400).json({ message: "Event full" });

    const registration = await Registration.create({
      user: req.user.id,
      event: event._id,
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: "Already registered" });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event");

    const valid = registrations.filter(r => r.event);

    res.json(valid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  const registration = await Registration.findOneAndDelete({
    user: req.user.id,
    event: req.params.eventId,
  });

  if (registration) {
    const event = await Event.findById(req.params.eventId);
    event.registeredCount -= 1;
    await event.save();
  }

  res.json({ message: "Registration cancelled" });
};
