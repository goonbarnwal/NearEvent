import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function CreateEvent() {


  const navigate = useNavigate();


  const [eventData, setEventData] = useState({

    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    time: "",
    venue: "",
    address: "",
    city: "",

    latitude: "",
    longitude: "",

    organizerName: "",
    organizerEmail: "",

    registrationLink: ""

  });



  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");





  const handleChange = (e) => {


    setEventData({

      ...eventData,

      [e.target.name]: e.target.value

    });


  };






  const handleSubmit = async (e) => {


    e.preventDefault();



    try {


      const formData = new FormData();



      formData.append(
        "title",
        eventData.title
      );


      formData.append(
        "description",
        eventData.description
      );


      formData.append(
        "category",
        eventData.category
      );


      formData.append(
        "startDate",
        eventData.startDate
      );


      formData.append(
        "endDate",
        eventData.endDate
      );


      formData.append(
        "time",
        eventData.time
      );


      formData.append(
        "venue",
        eventData.venue
      );


      formData.append(
        "address",
        eventData.address
      );


      formData.append(
        "city",
        eventData.city
      );



      formData.append(

        "location",

        JSON.stringify({

          latitude:Number(eventData.latitude),

          longitude:Number(eventData.longitude)

        })

      );



      formData.append(

        "organizer",

        JSON.stringify({

          name:eventData.organizerName,

          email:eventData.organizerEmail

        })

      );



      formData.append(

        "registrationLink",

        eventData.registrationLink

      );




      if(image){

        formData.append(
          "image",
          image
        );

      }






      const response = await API.post(

        "/events",

        formData,

        {

          headers:{

            "Content-Type":"multipart/form-data"

          }

        }

      );





      setMessage(
        response.data.message
      );



      alert(
        "Event Created Successfully!"
      );



      navigate("/events");



    }
    catch(error){


      console.log(error);


      setMessage(

        error.response?.data?.message ||

        "Event creation failed"

      );


    }


  };







  return (


    <div className="form-container">


      <h1>Create Event</h1>




      <form onSubmit={handleSubmit}>



        <input
          type="text"
          name="title"
          placeholder="Event Name"
          value={eventData.title}
          onChange={handleChange}
        />



        <input
          type="text"
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleChange}
        />



        <input
          type="text"
          name="category"
          placeholder="Category"
          value={eventData.category}
          onChange={handleChange}
        />



        <label>
          Upload Event Image
        </label>


        <input

          type="file"

          accept="image/*"

          onChange={(e)=>
            setImage(e.target.files[0])
          }

        />



        <label>
          Start Date
        </label>


        <input
          type="date"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
        />



        <label>
          End Date
        </label>


        <input
          type="date"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
        />



        <input
          type="text"
          name="time"
          placeholder="Event Time"
          value={eventData.time}
          onChange={handleChange}
        />



        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={eventData.venue}
          onChange={handleChange}
        />



        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={eventData.address}
          onChange={handleChange}
        />



        <input
          type="text"
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
          type="text"
          name="organizerName"
          placeholder="Organizer Name"
          value={eventData.organizerName}
          onChange={handleChange}
        />



        <input
          type="email"
          name="organizerEmail"
          placeholder="Organizer Email"
          value={eventData.organizerEmail}
          onChange={handleChange}
        />



        <input
          type="text"
          name="registrationLink"
          placeholder="Registration Link"
          value={eventData.registrationLink}
          onChange={handleChange}
        />



        <button type="submit">
          Create Event
        </button>



      </form>



      <p>
        {message}
      </p>



    </div>


  );

}


export default CreateEvent;