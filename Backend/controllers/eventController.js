const Event = require("../models/Event");


// Create Event
exports.createEvent = async (req, res) => {

    try {

        const eventData = {

            ...req.body,

            createdBy: req.user.id,

            source: "Organizer",

            status: "pending"

        };


        
        if (req.file) {

            eventData.image = req.file.path;

        }


        const event = await Event.create(eventData);


        res.status(201).json({

            message: "Event submitted for approval",

            event

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get All Events
exports.getEvents = async (req, res) => {

    try {

        const events = await Event.find({

            status: "approved"

        }).sort({

            createdAt: -1

        });


        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// Search Events
exports.searchEvents = async (req,res)=>{

    try{


        const keyword = req.query.keyword;


        const events = await Event.find({

                status: "approved",


            $or:[

                {
                    title:{
                        $regex:keyword,
                        $options:"i"
                    }
                },

                {
                    category:{
                        $regex:keyword,
                        $options:"i"
                    }
                },

                {
                    city:{
                        $regex:keyword,
                        $options:"i"
                    }
                }

            ]

        });



        res.status(200).json(events);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// Get Events By Category
exports.getEventsByCategory = async (req, res) => {

    try {

        const events = await Event.find({

            status: "approved",

            category: req.params.category

        }).sort({

            createdAt: -1

        });

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// Get Events By City
exports.getEventsByCity = async (req, res) => {

    try {

        const events = await Event.find({

            status: "approved",

            city: req.params.city

        }).sort({

            createdAt: -1

        });

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};





// Get All Categories
exports.getCategories = async(req,res)=>{


    try{


        const categories = await Event.distinct(
            "category"
        );


        res.status(200).json(categories);



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


};





// Get All Cities
exports.getCities = async(req,res)=>{


    try{


        const cities = await Event.distinct(
            "city"
        );


        res.status(200).json(cities);



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


};






// Get Event By ID
exports.getEventById = async(req,res)=>{


    try{


        const event = await Event.findById(
            req.params.id
        );


        if(!event){

            return res.status(404).json({

                message:"Event not found"

            });

        }



        res.status(200).json(event);



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


};







// Update Event
exports.updateEvent = async(req,res)=>{

    try{


        const event = await Event.findById(
            req.params.id
        );


        if(!event){

            return res.status(404).json({

                message:"Event not found"

            });

        }



        // External API events cannot be edited
        if(event.source !== "Organizer"){

            return res.status(403).json({

                message:"External events cannot be modified"

            });

        }




        // Only owner can update

        if(
            event.createdBy &&
            event.createdBy.toString() !== req.user.id
        ){

            return res.status(403).json({

                message:"You can update only your own event"

            });

        }





        const updatedEvent =
        await Event.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.status(200).json({

            message:"Event updated successfully",

            event:updatedEvent

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};







// Delete Event
exports.deleteEvent = async(req,res)=>{


    try{


        const event = await Event.findById(
            req.params.id
        );



        if(!event){

            return res.status(404).json({

                message:"Event not found"

            });

        }




        // External API events cannot be deleted

        if(event.source !== "Organizer"){

            return res.status(403).json({

                message:"External events cannot be deleted"

            });

        }






        // Only owner can delete

        if(
            event.createdBy &&
            event.createdBy.toString() !== req.user.id
        ){

            return res.status(403).json({

                message:"You can delete only your own event"

            });

        }





        await Event.findByIdAndDelete(
            req.params.id
        );





        res.status(200).json({

            message:"Event deleted successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// ⭐ Get Nearby Events
exports.getNearbyEvents = async(req,res)=>{

    try{


        const {
            latitude,
            longitude
        } = req.query;



        if(
    latitude === undefined ||
    longitude === undefined
){

    return res.status(400).json({

        message:"Location required"

    });

}




        const events = await Event.find({

    status: "approved",

    "location.latitude": {
        $exists: true
    },

    "location.longitude": {
        $exists: true
    }

});






        const nearbyEvents = events.map(event=>{


            const distance = calculateDistance(

                Number(latitude),

                Number(longitude),

                event.location.latitude,

                event.location.longitude

            );



            return {

                ...event.toObject(),

                distance: distance.toFixed(2)

            };


        })

        .filter(event => event.distance <= 50)

        .sort((a,b)=> a.distance - b.distance);






        res.status(200).json(nearbyEvents);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};

// Get My Events
exports.getMyEvents = async(req,res)=>{


    try{


        const events = await Event.find({

            createdBy:req.user.id

        })
        .sort({

            createdAt:-1

        });



        res.status(200).json(events);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};





// Calculate distance between two locations
function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
){


    const R = 6371; // Earth radius KM


    const dLat =
    (lat2-lat1) *
    Math.PI / 180;


    const dLon =
    (lon2-lon1) *
    Math.PI / 180;



    const a =
    Math.sin(dLat/2) *
    Math.sin(dLat/2)

    +

    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *

    Math.sin(dLon/2) *
    Math.sin(dLon/2);



    const c =
    2 *
    Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1-a)
    );



    return R*c;


}