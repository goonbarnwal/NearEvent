import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../services/api";

import EventCard from "../components/EventCard";
import EventMap from "../components/EventMap";

import "./Events.css";

function Events() {


  const [events, setEvents] = useState([]);

  const [categories, setCategories] = useState([]);

  const [cities, setCities] = useState([]);


  const [keyword, setKeyword] = useState("");

  const [category, setCategory] = useState("");

  const [city, setCity] = useState("");


  const [nearbyMode, setNearbyMode] = useState(false);

  const [locationLoading, setLocationLoading] = useState(false);


  const [userLocation, setUserLocation] = useState(null);



  const [searchParams] = useSearchParams();




  useEffect(()=>{

    loadInitialData();

  },[]);





  const loadInitialData = async()=>{


    try{


      const search = searchParams.get("search");



      const [
        eventsRes,
        categoriesRes,
        citiesRes

      ] = await Promise.all([



        search

        ?

        API.get(`/events/search?keyword=${search}`)

        :

        API.get("/events"),



        API.get("/events/categories"),



        API.get("/events/cities")



      ]);




      setEvents(eventsRes.data);

      setCategories(categoriesRes.data);

      setCities(citiesRes.data);



      if(search){

        setKeyword(search);

      }


    }

    catch(error){

      console.log(error);

    }


  };









  const findNearbyEvents = ()=>{


    if(!navigator.geolocation){


      alert(
        "Geolocation not supported"
      );


      return;


    }




    setLocationLoading(true);




    navigator.geolocation.getCurrentPosition(


      async(position)=>{



        const latitude =
        position.coords.latitude;



        const longitude =
        position.coords.longitude;



        setUserLocation({

          latitude,

          longitude

        });




        try{


          const response =
          await API.get(

            `/events/nearby?latitude=${latitude}&longitude=${longitude}`

          );



          setEvents(response.data);


          setNearbyMode(true);



        }

        catch(error){


          console.log(error);


          alert(
            "Unable to find nearby events"
          );


        }


        finally{


          setLocationLoading(false);


        }



      },



      ()=>{


        setLocationLoading(false);


        alert(
          "Please allow location access"
        );


      }



    );



  };









  const searchEvents = async(value)=>{


    setKeyword(value);

    setNearbyMode(false);



    try{


      if(value.trim()===""){



        const response =
        await API.get("/events");


        setEvents(response.data);



      }

      else{


        const response =
        await API.get(

          `/events/search?keyword=${value}`

        );


        setEvents(response.data);



      }



    }

    catch(error){

      console.log(error);

    }


  };









  const filterCategory = async(value)=>{


    setCategory(value);

    setNearbyMode(false);



    try{


      if(value===""){


        const response =
        await API.get("/events");


        setEvents(response.data);


      }

      else{


        const response =
        await API.get(

          `/events/category/${value}`

        );


        setEvents(response.data);


      }



    }

    catch(error){

      console.log(error);

    }



  };









  const filterCity = async(value)=>{


    setCity(value);

    setNearbyMode(false);



    try{


      if(value===""){


        const response =
        await API.get("/events");


        setEvents(response.data);


      }

      else{


        const response =
        await API.get(

          `/events/city/${value}`

        );


        setEvents(response.data);


      }



    }

    catch(error){

      console.log(error);

    }



  };









  return (

    <div className="events-container">


      <h1>
        Explore Tech Events
      </h1>



      <p
        style={{
          textAlign:"center",
          marginBottom:"20px"
        }}
      >

        Discover hackathons, AI workshops,
        developer meetups, startup networking
        events and conferences near you.

      </p>





      <button
        onClick={findNearbyEvents}
      >


        {

          locationLoading

          ?

          "Finding Nearby Tech Events..."

          :

          "📍 Find Nearby Tech Events"

        }


      </button>





      {
        nearbyMode &&

        <p
          style={{

            marginTop:"15px",

            fontWeight:"bold",

            color:"#2563eb"

          }}
        >

          📍 Showing nearby tech events

        </p>

      }







      <EventMap

        events={events}

        userLocation={userLocation}

      />









      <input

        className="search-box"

        type="text"

        placeholder="Search Hackathons, AI Workshops, Meetups..."

        value={keyword}


        onChange={(e)=>

          searchEvents(e.target.value)

        }


      />







      <div
        style={{

          display:"flex",

          justifyContent:"center",

          gap:"15px",

          margin:"20px 0",

          flexWrap:"wrap"

        }}
      >



        <select

          value={category}

          onChange={(e)=>

            filterCategory(e.target.value)

          }

        >

          <option value="">
            All Categories
          </option>


          {

            categories.map((item)=>(


              <option
                key={item}
                value={item}
              >

                {item}

              </option>


            ))

          }


        </select>





        <select

          value={city}

          onChange={(e)=>

            filterCity(e.target.value)

          }

        >

          <option value="">
            All Cities
          </option>



          {

            cities.map((item)=>(


              <option
                key={item}
                value={item}
              >

                {item}

              </option>


            ))

          }


        </select>



      </div>







      <div className="events-grid">


        {


          events.length > 0


          ?


          events.map((event)=>(


            <div key={event._id}>


              <EventCard event={event}/>




              {

                event.distance &&


                <p

                  style={{

                    fontWeight:"bold",

                    color:"#16a34a",

                    marginTop:"8px"

                  }}

                >

                  📍 {event.distance} km away


                </p>

              }



            </div>


          ))



          :


          <h3
            style={{
              textAlign:"center"
            }}
          >

            No tech events found.

          </h3>


        }


      </div>



    </div>

  );


}


export default Events;