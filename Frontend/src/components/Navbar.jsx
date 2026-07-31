import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {


  const navigate = useNavigate();



  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );



  const user = JSON.parse(
    localStorage.getItem("user")
  );






  const handleLogout = () => {


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    setLoggedIn(false);


    navigate("/login");


  };







  return (


    <nav className="navbar">



      <h2>
        NearEvent
      </h2>





      <div className="nav-links">



        <Link to="/">
          Home
        </Link>





        <Link to="/events">
          Events
        </Link>

        {
   loggedIn && user?.role === "admin" && (
    <Link to="/admin">
        Admin Dashboard
    </Link>
  )
}



        {
          loggedIn && (

            <>

              <Link to="/create-event">
                Create Event
              </Link>



              <Link to="/my-events">
                My Events
              </Link>



              <Link to="/my-registrations">
                My Registrations
              </Link>


            </>

          )
        }







        {
          loggedIn ?


          (

            <>


              <span>
                Welcome, {user?.name}
              </span>





              <Link to="/profile">
                Profile
              </Link>





              <button onClick={handleLogout}>

                Logout

              </button>




            </>


          )



          :



          (

            <>


              <Link to="/login">
                Login
              </Link>





              <Link to="/signup">
                Signup
              </Link>



            </>


          )


        }




      </div>



    </nav>


  );

}


export default Navbar;