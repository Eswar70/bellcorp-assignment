const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  registerEvent,
  cancelRegistration,
  getUserRegistrations,
} = require("../controllers/registrationController");

router.post("/:eventId", auth, registerEvent);
router.delete("/:eventId", auth, cancelRegistration);
router.get("/user", auth, getUserRegistrations);

module.exports = router;
