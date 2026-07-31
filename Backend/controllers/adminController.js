const Event = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");




// Get Pending Events

exports.getPendingEvents = async(req,res)=>{


    try{


        const events = await Event.find({

            status:"pending"

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









// Approve Event

exports.approveEvent = async(req,res)=>{


    try{


        const event = await Event.findById(
            req.params.id
        );



        if(!event){

            return res.status(404).json({

                message:"Event not found"

            });

        }




        event.status = "approved";


        await event.save();




        res.status(200).json({

            message:"Event approved successfully",

            event

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};











// Reject Event

exports.rejectEvent = async(req,res)=>{


    try{


        const event = await Event.findById(
            req.params.id
        );



        if(!event){

            return res.status(404).json({

                message:"Event not found"

            });

        }





        await Event.findByIdAndDelete(
            req.params.id
        );






        res.status(200).json({

            message:"Event rejected successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};












// Admin Dashboard Stats

exports.getAdminStats = async(req,res)=>{


    try{


        const totalUsers =
        await User.countDocuments();




        const totalEvents =
        await Event.countDocuments();




        const pendingEvents =
        await Event.countDocuments({

            status:"pending"

        });




        const approvedEvents =
        await Event.countDocuments({

            status:"approved"

        });




        const totalRegistrations =
        await Registration.countDocuments();





        res.status(200).json({


            totalUsers,


            totalEvents,


            pendingEvents,


            approvedEvents,


            totalRegistrations



        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};