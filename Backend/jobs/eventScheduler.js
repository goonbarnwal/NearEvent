const cron = require("node-cron");

const Event = require("../models/Event");

const { fetchExternalEvents } = require("../services/eventApiService");


console.log("Event Scheduler Started");



async function syncEvents() {


    console.log("Fetching latest events...");


    try {


        const events = await fetchExternalEvents();



        // Allowed cities for NearEvent
        const allowedCities = [

            "Pune",
            "Mumbai",
            "Bengaluru",
            "Hyderabad",
            "Delhi"

        ];



        // Filter only relevant city events
        const filteredEvents = events.filter(event =>

            allowedCities.includes(event.city)

        );



        let added = 0;

        let updated = 0;



        for (const eventData of filteredEvents) {



            const existingEvent = await Event.findOne({

                externalId: eventData.externalId

            });



            if (existingEvent) {



                await Event.findByIdAndUpdate(

                    existingEvent._id,

                    {

                        ...eventData,

                        status: "approved"

                    }

                );


                updated++;


            }

            else {



                await Event.create({

                    ...eventData,

                    status: "approved"

                });


                added++;


            }


        }



        console.log("--------------------------------");


        console.log(
            `New Events Added : ${added}`
        );


        console.log(
            `Events Updated   : ${updated}`
        );


        console.log(
            `Total Processed  : ${filteredEvents.length}`
        );


        console.log(
            "Event sync completed"
        );


        console.log("--------------------------------");



    }

    catch(error) {



        console.log(

            "Scheduler Error:",

            error.message

        );


    }


}




syncEvents();




cron.schedule(

    "0 */6 * * *",

    syncEvents

);