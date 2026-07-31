const axios = require("axios");


const fetchLumaEvents = async () => {

    try {

        const response = await axios.get(
            "https://api.lu.ma/discover/get-events"
        );


        const events = response.data.entries || [];


        console.log(
            `Luma Events: ${events.length}`
        );


        return events.map(event => ({

            externalId: event.api_id,

            title: event.event.name,

            description:
            event.event.description || "",

            category:
            "Tech Event",

            date:
            event.event.start_at,

            location:
            event.event.location?.name || "Online",

            source:
            "Luma"

        }));


    } catch(error) {


        console.log(
            "Luma Provider Error:",
            error.message
        );


        return [];

    }

};


module.exports = {
    fetchLumaEvents
};