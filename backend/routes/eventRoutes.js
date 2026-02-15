const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);

router.post("/", auth, createEvent);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
