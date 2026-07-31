const express = require("express");
const router = express.Router();

const verifyAuth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
    createEvent,
    getEvents,
    getEventById,
    searchEvents,
    getEventsByCategory,
    getEventsByCity,
    getCategories,
    getCities,
    updateEvent,
    deleteEvent,
    getNearbyEvents,
    getMyEvents
} = require("../controllers/eventController");




// Search Events
router.get(
    "/search",
    searchEvents
);




// Get All Categories
router.get(
    "/categories",
    getCategories
);




// Get All Cities
router.get(
    "/cities",
    getCities
);




// Get Nearby Events
router.get(
    "/nearby",
    getNearbyEvents
);




// Get Organizer My Events
router.get(
    "/my-events",
    verifyAuth,
    getMyEvents
);




// Get Events By Category
router.get(
    "/category/:category",
    getEventsByCategory
);




// Get Events By City
router.get(
    "/city/:city",
    getEventsByCity
);




// Get Single Event By ID
router.get(
    "/:id",
    getEventById
);




// Get All Events
router.get(
    "/",
    getEvents
);




// Create Event (Logged in user)
router.post(
    "/",
    verifyAuth,
    upload.single("image"),
    createEvent
);



// Update Event (Only Owner)
router.put(
    "/:id",
    verifyAuth,
    updateEvent
);




// Delete Event (Only Owner)
router.delete(
    "/:id",
    verifyAuth,
    deleteEvent
);



module.exports = router;