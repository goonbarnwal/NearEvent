import React, { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";


const MyEvents = () => {


    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);





    useEffect(()=>{

        fetchMyEvents();

    },[]);







    const fetchMyEvents = async()=>{


        try{


            const response =
            await API.get(
                "/events/my-events"
            );


            setEvents(response.data);


        }
        catch(error){


            console.log(error);


        }
        finally{


            setLoading(false);


        }


    };









    const handleDelete = async(id)=>{


        const confirmDelete =
        window.confirm(
            "Are you sure you want to delete this event?"
        );



        if(!confirmDelete)
            return;




        try{


            await API.delete(
                `/events/${id}`
            );



            setEvents(

                events.filter(

                    event=>event._id!==id

                )

            );


            alert(
                "Event deleted successfully"
            );


        }
        catch(error){


            console.log(error);


            alert(
                "Delete failed"
            );


        }


    };









    if(loading){


        return(

            <h2
            style={{
                textAlign:"center",
                marginTop:"50px"
            }}
            >

                Loading...

            </h2>

        );

    }








    return(


        <div className="container">


            <h1>

                My Events

            </h1>




            {

                events.length===0

                ?

                (

                    <h3>

                        No events created yet

                    </h3>

                )


                :


                (

                <div className="events-grid">


                {

                    events.map((event)=>(


                        <div key={event._id}>


                            <EventCard

                            event={event}

                            organizerView={true}

                            onDelete={handleDelete}

                            />



                            <p
                            style={{

                                marginTop:"10px",

                                fontWeight:"bold"

                            }}
                            >

                            Status:

                            {" "}

                            <span>

                            {event.status}

                            </span>


                            </p>



                        </div>


                    ))

                }


                </div>

                )


            }




        </div>


    );


};


export default MyEvents;