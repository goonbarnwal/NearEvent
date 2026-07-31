const axios = require("axios");


const fetchMLHEvents = async () => {

    try {


        const response = await axios.get(
            "https://mlh.io/seasons/2026/events"
        );


        console.log("MLH HTML received");



        const html = response.data;



        // Extract JSON data from MLH page
        const match = html.match(
            /<script data-page="app" type="application\/json">(.*?)<\/script>/
        );



        if (!match) {

            console.log("MLH JSON not found");

            return [];

        }



        const jsonData = JSON.parse(
            match[1]
        );



        const props = jsonData.props;



        console.log(
            "MLH JSON Loaded"
        );


        console.log(
            Object.keys(props)
        );



        const events =
            props.upcomingEvents || [];

            console.log(
    "Upcoming Events Data:",
    JSON.stringify(props.upcomingEvents, null, 2)
);



        console.log(
            "MLH Events Count:",
            events.length
        );



        if(events.length > 0){

            console.log(
                JSON.stringify(events[0], null, 2)
            );

        }



        const formattedEvents = events.map(
            (event, index) => {


                return {


                    title:
                    event.name ||
                    "MLH Hackathon",



                    description:
                    "Major League Hacking Event",



                    category:
                    "Hackathon",



                    startDate:
                    event.start_date ||
                    new Date(),



                    endDate:
                    event.end_date ||
                    event.start_date ||
                    new Date(),



                    time:
                    "10:00 AM",



                    venue:
                    event.location ||
                    "Online",



                    address:
                    event.location ||
                    "Online",



                    city:
                    "Online",



                    registrationLink:
                    event.url ||
                    "https://mlh.io",



                    source:
                    "API",



                    externalId:
                    `mlh-${index}-${event.name || "event"}`


                };


            }
        );



        console.log(
            `MLH Formatted Events: ${formattedEvents.length}`
        );



        return formattedEvents;



    }
    catch(error){


        console.log(
            "MLH Provider Error:",
            error.message
        );


        return [];

    }


};



module.exports = {

    fetchMLHEvents

};