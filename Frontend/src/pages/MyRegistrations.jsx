import React, { useEffect, useState } from "react";
import axios from "axios";


const MyRegistrations = () => {


    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(()=>{

        fetchRegistrations();

    },[]);





    const fetchRegistrations = async()=>{


        try{


            const token = localStorage.getItem("token");


            const response = await axios.get(

                "http://localhost:5000/api/registrations/my-events",

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            setRegistrations(response.data);



        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    };






    if(loading){

        return <h2 style={{textAlign:"center"}}>
            Loading...
        </h2>

    }





    return (

        <div className="container">


            <h1>
                My Registered Events
            </h1>




            {
                registrations.length === 0 ?

                (

                    <h3>
                        No registered events yet
                    </h3>

                )

                :

                (

                    registrations.map((registration)=>(


                        registration.eventId && (

                        <div 
                            className="event-card"
                            key={registration._id}
                        >


                            <h3>
                                {registration.eventId.title}
                            </h3>



                            <p>
                                <strong>
                                    Category:
                                </strong>{" "}
                                {registration.eventId.category}
                            </p>



                            <p>
                                <strong>
                                    Date:
                                </strong>{" "}
                                {
                                    registration.eventId.date
                                    ||
                                    new Date(
                                        registration.eventId.startDate
                                    )
                                    .toLocaleDateString()
                                }
                            </p>



                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {registration.eventId.city}
                            </p>



                            <p>
                                <strong>
                                    Venue:
                                </strong>{" "}
                                {registration.eventId.venue}
                            </p>



                            <p>
                                Status:
                                ✅ Registered
                            </p>



                        </div>

                        )

                    ))

                )

            }



        </div>

    );

};


export default MyRegistrations;