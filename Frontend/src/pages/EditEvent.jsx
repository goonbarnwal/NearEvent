import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


function EditEvent(){


    const { id } = useParams();

    const navigate = useNavigate();



    const [eventData, setEventData] = useState({

        title:"",
        description:"",
        category:"",
        image:"",
        startDate:"",
        endDate:"",
        time:"",
        venue:"",
        address:"",
        city:"",
        latitude:"",
        longitude:"",
        organizerName:"",
        organizerEmail:"",
        registrationLink:""

    });



    useEffect(()=>{

        fetchEvent();

    },[]);



    const fetchEvent = async()=>{

        try{

            const response = await API.get(`/events/${id}`);


            const event = response.data;


            setEventData({

                title:event.title || "",
                description:event.description || "",
                category:event.category || "",
                image:event.image || "",

                startDate:event.startDate
                ? event.startDate.substring(0,10)
                : "",

                endDate:event.endDate
                ? event.endDate.substring(0,10)
                : "",

                time:event.time || "",
                venue:event.venue || "",
                address:event.address || "",
                city:event.city || "",

                latitude:event.location?.latitude || "",
                longitude:event.location?.longitude || "",


                organizerName:event.organizer?.name || "",

                organizerEmail:event.organizer?.email || "",


                registrationLink:event.registrationLink || ""

            });


        }
        catch(error){

            console.log(error);

        }

    };





    const handleChange=(e)=>{

        setEventData({

            ...eventData,

            [e.target.name]:e.target.value

        });

    };






    const handleSubmit=async(e)=>{


        e.preventDefault();


        try{


            await API.put(

                `/events/${id}`,

                {


                    title:eventData.title,

                    description:eventData.description,

                    category:eventData.category,

                    image:eventData.image,


                    startDate:eventData.startDate,

                    endDate:eventData.endDate,


                    time:eventData.time,

                    venue:eventData.venue,

                    address:eventData.address,

                    city:eventData.city,



                    location:{

                        latitude:Number(eventData.latitude),

                        longitude:Number(eventData.longitude)

                    },



                    organizer:{

                        name:eventData.organizerName,

                        email:eventData.organizerEmail

                    },



                    registrationLink:eventData.registrationLink


                }

            );



            alert("Event updated successfully");


            navigate(`/events/${id}`);


        }

        catch(error){

            console.log(error);

        }


    };





    return(


        <div className="form-container">


            <h1>Edit Event</h1>



            <form onSubmit={handleSubmit}>



                <input
                name="title"
                placeholder="Event Name"
                value={eventData.title}
                onChange={handleChange}
                />



                <input
                name="description"
                placeholder="Description"
                value={eventData.description}
                onChange={handleChange}
                />



                <input
                name="category"
                placeholder="Category"
                value={eventData.category}
                onChange={handleChange}
                />



                <input
                name="image"
                placeholder="Image URL"
                value={eventData.image}
                onChange={handleChange}
                />



                <label>Start Date</label>

                <input
                type="date"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                />



                <label>End Date</label>

                <input
                type="date"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                />



                <input
                name="time"
                placeholder="Time"
                value={eventData.time}
                onChange={handleChange}
                />



                <input
                name="venue"
                placeholder="Venue"
                value={eventData.venue}
                onChange={handleChange}
                />



                <input
                name="address"
                placeholder="Full Address"
                value={eventData.address}
                onChange={handleChange}
                />



                <input
                name="city"
                placeholder="City"
                value={eventData.city}
                onChange={handleChange}
                />



                <input
                type="number"
                name="latitude"
                placeholder="Latitude"
                value={eventData.latitude}
                onChange={handleChange}
                />



                <input
                type="number"
                name="longitude"
                placeholder="Longitude"
                value={eventData.longitude}
                onChange={handleChange}
                />



                <input
                name="organizerName"
                placeholder="Organizer Name"
                value={eventData.organizerName}
                onChange={handleChange}
                />



                <input
                name="organizerEmail"
                placeholder="Organizer Email"
                value={eventData.organizerEmail}
                onChange={handleChange}
                />



                <input
                name="registrationLink"
                placeholder="Registration Link"
                value={eventData.registrationLink}
                onChange={handleChange}
                />



                <button type="submit">

                    Update Event

                </button>



            </form>



        </div>


    );


}


export default EditEvent;