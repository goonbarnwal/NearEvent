const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({


    title: {

        type: String,

        required: true

    },


    description: {

        type: String,

        required: true

    },


    category: {

        type: String,

        required: true

    },


    image: {

        type: String,

        default: ""

    },


    startDate: {

        type: Date,

        required: true

    },


    endDate: {

        type: Date

    },


    time: {

        type: String,

        required: true

    },


    venue: {

        type: String,

        required: true

    },


    address: {

        type: String,

        required: true

    },


    city: {

        type: String,

        required: true

    },


    location: {

        latitude: {

            type: Number

        },


        longitude: {

            type: Number

        }

    },


    organizer: {

        name: {

            type: String

        },


        email: {

            type: String

        }

    },


    registrationLink: {

        type: String,

        default: ""

    },


    // Event source
    source: {

        type: String,

        enum: [

            "Organizer",

            "API",

            "Ticketmaster",

            "MLH",

            "Eventbrite",

            "Demo"

        ],

        default: "Organizer"

    },


    // External API unique ID
    externalId: {

        type: String,

        default: ""

    },


    status: {

        type: String,

        enum: [

            "pending",

            "approved"

        ],

        default: "approved"

    },


    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    }


}, {


    timestamps: true


});



module.exports = mongoose.model(
    "Event",
    eventSchema
);