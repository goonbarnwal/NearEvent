import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { 
    FaUser,
    FaEnvelope,
    FaCalendarCheck,
    FaMapMarkerAlt
} from "react-icons/fa";


function Profile() {


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const [registeredEvents, setRegisteredEvents] = useState([]);





  useEffect(()=>{

    fetchRegisteredEvents();

  },[]);








  const fetchRegisteredEvents = async()=>{


    try{


      const response = await API.get(
        "/registrations/my-events"
      );


      setRegisteredEvents(response.data);


    }
    catch(error){

      console.log(error);

    }


  };









  return (


    <div className="profile-container">





      <h1>
        My Profile
      </h1>






      <div className="profile-card">



        <h2>
          👤 User Information
        </h2>




        <p>

          <FaUser />{" "}

          <strong>Name:</strong>{" "}
          {user?.name}

        </p>





        <p>

          <FaEnvelope />{" "}

          <strong>Email:</strong>{" "}
          {user?.email}

        </p>






        <p>

          <FaCalendarCheck />{" "}

          <strong>
            Registered Events:
          </strong>{" "}

          {registeredEvents.length}

        </p>




      </div>








      <h2 style={{marginTop:"30px"}}>

        My Registered Events

      </h2>








      {

        registeredEvents.length > 0


        ?

        (

          <div className="events-grid">



          {

            registeredEvents.map((item)=>(


              <div 
                className="event-card"
                key={item._id}
              >



                <h3>
                  {item.eventId?.title}
                </h3>





                <p>

                  🏷

                  <strong>
                    Category:
                  </strong>{" "}

                  {item.eventId?.category}

                </p>





                <p>

                  <FaMapMarkerAlt />{" "}

                  <strong>
                    City:
                  </strong>{" "}

                  {item.eventId?.city}

                </p>






                <p>

                  📅

                  <strong>
                    Date:
                  </strong>{" "}

                  {
                    item.eventId?.startDate
                    ?

                    new Date(
                      item.eventId.startDate
                    ).toLocaleDateString()

                    :

                    item.eventId?.date

                  }

                </p>






                <Link
                  to={`/events/${item.eventId?._id}`}
                >

                  <button>
                    View Event
                  </button>


                </Link>




              </div>


            ))

          }


          </div>


        )


        :


        (

          <p>
            You have not registered for any events yet.
          </p>

        )


      }






    </div>


  );


}


export default Profile;