const { fetchTicketmasterEvents } = require("./providers/ticketmasterService");
const { fetchEventbriteEvents } = require("./providers/eventbriteService");


// Fetch events from all providers
const fetchExternalEvents = async () => {

    try {


        const ticketmasterEvents =
            await fetchTicketmasterEvents();



        const eventbriteEvents =
            await fetchEventbriteEvents();



        const allEvents = [

            ...ticketmasterEvents,
            ...eventbriteEvents

        ];



        console.log(
            `Total external events fetched: ${allEvents.length}`
        );


        return allEvents;


    }

    catch(error){


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