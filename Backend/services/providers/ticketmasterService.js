const axios = require("axios");


const fetchTicketmasterEvents = async () => {

    try {


        const cities = [

            "Pune",
            "Mumbai",
            "Bengaluru",
            "Hyderabad",
            "Delhi"

        ];



        let allEvents = [];




        for (const city of cities) {



            const response = await axios.get(

                "https://app.ticketmaster.com/discovery/v2/events.json",

                {

                    params: {

                        apikey:
                        process.env.TICKETMASTER_API_KEY,


                        countryCode:"IN",


                        city,


                        size:50,


                        sort:"date,asc"

                    }

                }

            );





            const cityEvents =
            response.data._embedded?.events || [];



            console.log(

                `Ticketmaster ${city}: ${cityEvents.length} events`

            );





            allEvents.push(

                ...cityEvents

            );



        }






        console.log(

            `Ticketmaster Raw Events Total: ${allEvents.length}`

        );



        return allEvents;



    }

    catch(error){


        console.log(

            "Ticketmaster Provider Error:",

            error.response?.data || error.message

        );


        return [];


    }


};



module.exports = {

    fetchTicketmasterEvents

};