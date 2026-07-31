import { useState } from "react";
import API from "../services/api";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const [message, setMessage] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/auth/signup", formData);

      setMessage(response.data.message);

    } 
    catch(error) {

      setMessage(
        error.response?.data?.message || "Signup failed"
      );

    }

  };


  return (

    <div className="form-container">

      <h1>Signup</h1>


      <form onSubmit={handleSubmit}>


        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />


        <button type="submit">
          Signup
        </button>


      </form>


      <p>{message}</p>


    </div>

  );
}


export default Signup;