import { useEffect, useState } from "react";
import API from "../services/api";


function AdminDashboard() {


  const [pendingEvents, setPendingEvents] = useState([]);

  const [stats, setStats] = useState({});





  useEffect(()=>{

    fetchStats();

    fetchPendingEvents();

  },[]);







  const fetchStats = async()=>{


    try{


      const response = await API.get(
        "/admin/stats"
      );


      setStats(response.data);


    }
    catch(error){

      console.log(error);

    }


  };








  const fetchPendingEvents = async()=>{


    try{


      const response = await API.get(
        "/admin/pending-events"
      );


      setPendingEvents(response.data);


    }
    catch(error){

      console.log(error);

    }


  };








  const approveEvent = async(id)=>{


    try{


      await API.put(
        `/admin/approve/${id}`
      );


      alert("Event Approved");


      fetchPendingEvents();

      fetchStats();


    }
    catch(error){


      console.log(error);

    }


  };








  const rejectEvent = async(id)=>{


    const confirmDelete = window.confirm(
      "Reject this event?"
    );


    if(!confirmDelete)
      return;




    try{


      await API.delete(
        `/admin/reject/${id}`
      );


      alert("Event Rejected");


      fetchPendingEvents();

      fetchStats();


    }
    catch(error){


      console.log(error);

    }


  };









  return (


    <div
      style={{
        maxWidth:"1000px",
        margin:"40px auto",
        padding:"20px"
      }}
    >




      <h1 style={{textAlign:"center"}}>

        Admin Dashboard 📊

      </h1>






      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
          gap:"20px",
          marginTop:"30px"
        }}
      >




        <div className="event-card">

          <h2>
            👥 {stats.totalUsers || 0}
          </h2>

          <p>
            Total Users
          </p>

        </div>






        <div className="event-card">

          <h2>
            📅 {stats.totalEvents || 0}
          </h2>

          <p>
            Total Events
          </p>

        </div>







        <div className="event-card">

          <h2>
            🟡 {stats.pendingEvents || 0}
          </h2>

          <p>
            Pending Events
          </p>

        </div>








        <div className="event-card">

          <h2>
            🟢 {stats.approvedEvents || 0}
          </h2>

          <p>
            Approved Events
          </p>

        </div>








        <div className="event-card">

          <h2>
            🎟 {stats.totalRegistrations || 0}
          </h2>

          <p>
            Registrations
          </p>

        </div>





      </div>









      <h2 style={{marginTop:"40px"}}>

        Pending Events

      </h2>








      {

        pendingEvents.length === 0

        ?

        (

          <p>
            No Pending Events
          </p>

        )


        :


        pendingEvents.map((event)=>(



          <div
            className="event-card"
            key={event._id}
          >



            <h2>
              {event.title}
            </h2>





            <p>
              <strong>
                Category:
              </strong>{" "}
              {event.category}
            </p>





            <p>
              <strong>
                City:
              </strong>{" "}
              {event.city}
            </p>





            <p>
              <strong>
                Description:
              </strong>{" "}
              {event.description}
            </p>







            <button
              onClick={()=>
                approveEvent(event._id)
              }
            >

              Approve

            </button>







            <button
              onClick={()=>
                rejectEvent(event._id)
              }

              style={{
                marginLeft:"10px",
                background:"red",
                color:"white"
              }}
            >

              Reject

            </button>




          </div>



        ))

      }





    </div>


  );


}


export default AdminDashboard;