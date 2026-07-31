const express = require("express");
const router = express.Router();

const verifyAuth = require("../middleware/auth");

const {
    registerEvent,
    getEventRegistrations,
    getMyRegisteredEvents
} = require("../controllers/registrationController");



// Register for Event
router.post(
    "/:eventId/register",
    verifyAuth,
    registerEvent
);



// Get Registered Users for Event (Owner)
router.get(
    "/:eventId/registrations",
    verifyAuth,
    getEventRegistrations
);



// Get My Registered Events (User Dashboard)
router.get(
    "/my-events",
    verifyAuth,
    getMyRegisteredEvents
);



module.exports = router;