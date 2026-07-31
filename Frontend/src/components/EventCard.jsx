import { Link } from "react-router-dom";
import "./EventCard.css";

import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaUser,
    FaTag
} from "react-icons/fa";


function EventCard({ event, organizerView = false, onDelete }) {


    return (

        <div className="event-card">


            {
                event.image && (

                    <img
                        src={event.image}
                        alt={event.title}
                        className="event-image"
                    />

                )
            }



            <div className="event-content">


                <h3>
                    {event.title}
                </h3>



                <span className="category-badge">

                    <FaTag />

                    {event.category}

                </span>





                <p>

                    <FaCalendarAlt />

                    <strong>Date:</strong>

                    {" "}

                    {
                        event.date ||
                        new Date(event.startDate)
                        .toLocaleDateString("en-GB")
                    }

                </p>





                <p>

                    <FaClock />

                    <strong>Time:</strong>

                    {" "}

                    {event.time}

                </p>





                <p>

                    <FaMapMarkerAlt />

                    <strong>Venue:</strong>

                    {" "}

                    {event.venue}

                </p>





                <p>

                    <FaMapMarkerAlt />

                    <strong>City:</strong>

                    {" "}

                    {event.city}

                </p>






                {
                    event.distance && (

                        <p>

                            📍

                            <strong>
                                Distance:
                            </strong>

                            {" "}

                            {event.distance} km

                        </p>

                    )
                }







                <p className="description">


                    {
                        event.description.length > 100
                        ?
                        event.description.substring(0,100)+"..."
                        :
                        event.description
                    }


                </p>







                {
                    event.organizer && (

                        <p>

                            <FaUser />

                            <strong>
                                Organizer:
                            </strong>

                            {" "}

                            {event.organizer.name}


                        </p>

                    )
                }








                {
                    event.source && (

                        <p>

                            <strong>
                                Source:
                            </strong>

                            {" "}

                            {event.source}

                        </p>

                    )
                }







                {
                    organizerView && (

                        <div className="organizer-actions">


                            <p>

                                <strong>
                                    Status:
                                </strong>


                                {" "}


                                {
                                    event.status === "approved"
                                    ?
                                    "🟢 Approved"
                                    :
                                    "🟡 Pending Approval"
                                }


                            </p>





                            <Link to={`/edit-event/${event._id}`}>

                                <button>
                                    Edit Event
                                </button>

                            </Link>





                            <button
                                onClick={() => onDelete(event._id)}
                            >

                                Delete Event

                            </button>


                        </div>

                    )
                }







                <Link to={`/events/${event._id}`}>

                    <button className="details-btn">

                        View Details

                    </button>


                </Link>



            </div>



        </div>

    );

}


export default EventCard;