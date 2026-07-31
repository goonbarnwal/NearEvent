import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";


function EventDetails() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [event, setEvent] = useState(null);

  const [registered, setRegistered] = useState(false);



  const user = JSON.parse(
    localStorage.getItem("user")
  );




  useEffect(() => {

    fetchEvent();

  }, []);





  const fetchEvent = async()=>{

    try{

      const response =
      await API.get(`/events/${id}`);


      setEvent(response.data);


    }
    catch(error){

      console.log(error);

    }

  };







  const registerEvent = async()=>{


    if(!user){

      alert(
        "Please login first to register"
      );

      navigate("/login");

      return;

    }



    try{


      await API.post(
        `/registrations/${id}/register`
      );



      setRegistered(true);



      alert(
        "Event registered successfully"
      );


    }
    catch(error){


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );


    }


  };







  const deleteEvent = async()=>{


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



      alert(
        "Event deleted successfully"
      );


      navigate("/events");


    }
    catch(error){

      console.log(error);

    }


  };






  const editEvent = ()=>{


    navigate(
      `/edit-event/${id}`
    );


  };








  if(!event){


    return (

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







  const ownerId =

  event.createdBy?._id ||

  event.createdBy;



  const isOwner =

  user &&

  ownerId &&

  ownerId === user.id;







  return (


    <div className="event-details">


      <div className="event-details-card">



      {

        event.image &&

        (

          <img

          src={event.image}

          alt={event.title}

          style={{

            width:"100%",

            height:"280px",

            objectFit:"cover",

            borderRadius:"10px"

          }}

          />

        )

      }





      <h1>

        {event.title}

      </h1>




      <p>
        <b>Category:</b> {event.category}
      </p>




      <p>

        <b>Date:</b>{" "}

        {
          new Date(
            event.startDate
          ).toDateString()
        }

      </p>





      <p>

        <b>Time:</b> {event.time}

      </p>





      <p>

        <b>Venue:</b> {event.venue}

      </p>




      <p>

        <b>Address:</b> {event.address}

      </p>




      <p>

        <b>City:</b> {event.city}

      </p>





      <p>

        <b>Description:</b>

        <br/>

        {event.description}

      </p>





      {

        event.organizer &&

        (

          <p>

          <b>Organizer:</b>{" "}

          {event.organizer.name}

          </p>

        )

      }






      {

        event.source &&

        (

          <p>

          <b>Source:</b>{" "}

          {event.source}

          </p>

        )

      }






      <div
      style={{
        marginTop:"25px"
      }}
      >






      {


      isOwner && event.source==="Organizer"

      ?

      (

        <>


        <button
        onClick={editEvent}
        >

          Edit Event

        </button>





        <button

        onClick={deleteEvent}

        style={{

          marginLeft:"15px",

          background:"red",

          color:"white"

        }}

        >

          Delete Event

        </button>


        </>


      )

      :


      (

        event.registrationLink

        ?

        (

        <a

        href={event.registrationLink}

        target="_blank"

        rel="noreferrer"

        >

        <button>

          Register Now

        </button>


        </a>

        )


        :

        (

        <button

        onClick={registerEvent}

        disabled={registered}

        >

        {

          registered

          ?

          "Registered"

          :

          "Register Event"

        }


        </button>

        )


      )


      }



      </div>





      </div>


    </div>


  );


}


export default EventDetails;