const axios = require("axios");


const fetchEventbriteEvents = async () => {

    try {


        const response = await axios.get(

            "https://www.eventbriteapi.com/v3/organizations/",

            {
                headers: {

                    Authorization:
                    `Bearer ${process.env.EVENTBRITE_API_TOKEN}`

                }
            }

        );


        console.log("Eventbrite API Connected");


        return [];


    }
    catch(error){


        console.log(

            "Eventbrite Error:",
            error.response?.data ||
            error.message

        );


        return [];

    }

};



module.exports = {
    fetchEventbriteEvents
};