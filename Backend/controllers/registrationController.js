const Registration = require("../models/Registration");


// Register for Event
exports.registerEvent = async (req, res) => {

    try {

        const { eventId } = req.params;


        const alreadyRegistered = await Registration.findOne({

            userId: req.user.id,
            eventId: eventId

        });


        if (alreadyRegistered) {

            return res.status(400).json({
                message: "Already registered for this event"
            });

        }


        const registration = await Registration.create({

            userId: req.user.id,
            eventId: eventId

        });


        res.status(201).json({

            message: "Event registered successfully",
            registration

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// Get Event Registrations (Owner)
exports.getEventRegistrations = async (req, res) => {

    try {

        const registrations = await Registration.find({

            eventId: req.params.eventId

        }).populate("userId", "name email");


        res.status(200).json(registrations);


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// Get My Registered Events
exports.getMyRegisteredEvents = async (req, res) => {

    try {

        const registrations = await Registration.find({
            userId: req.user.id
        })
        .populate("eventId");


        res.status(200).json(registrations);


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};