const express = require("express");
const router = express.Router();


const verifyAuth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");


const {
    getPendingEvents,
    approveEvent,
    rejectEvent,
    getAdminStats
} = require("../controllers/adminController");





// Admin Dashboard Statistics
router.get(
    "/stats",
    verifyAuth,
    adminAuth,
    getAdminStats
);





// Get Pending Organizer Events
router.get(
    "/pending-events",
    verifyAuth,
    adminAuth,
    getPendingEvents
);





// Approve Event
router.put(
    "/approve/:id",
    verifyAuth,
    adminAuth,
    approveEvent
);





// Reject Event
router.delete(
    "/reject/:id",
    verifyAuth,
    adminAuth,
    rejectEvent
);





module.exports = router;