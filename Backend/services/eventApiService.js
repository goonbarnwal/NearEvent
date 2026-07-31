const { fetchTicketmasterEvents } = require("./providers/ticketmasterService");
const { fetchMLHEvents } = require("./providers/mlhService");
const { fetchDemoEvents } = require("./providers/demoEventService");


// Fetch events from all providers
const fetchExternalEvents = async () => {

    try {


        const [
            ticketmasterEvents,
            mlhEvents,
            demoEvents

        ] = await Promise.all([


            fetchTicketmasterEvents(),


            fetchMLHEvents(),


            fetchDemoEvents()


        ]);



        const allEvents = [


            ...ticketmasterEvents,


            ...mlhEvents,


            ...demoEvents


        ];



        console.log("--------------------------------");


        console.log(
            `Ticketmaster : ${ticketmasterEvents.length}`
        );


        console.log(
            `MLH          : ${mlhEvents.length}`
        );


        console.log(
            `Demo Events  : ${demoEvents.length}`
        );


        console.log(
            `Total Events : ${allEvents.length}`
        );


        console.log("--------------------------------");



        return allEvents;



    } catch(error){


        console.log(
            "External Event Service Error:",
            error.message
        );


        return [];

    }

};



module.exports = {

    fetchExternalEvents

};