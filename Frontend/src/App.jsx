import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import EditEvent from "./pages/EditEvent";
import AdminDashboard from "./pages/AdminDashboard";
import MyEvents from "./pages/MyEvents";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/create-event" element={<CreateEvent />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-event/:id" element={<EditEvent />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/my-events"element={<MyEvents />}/>

        <Route path="/my-registrations"element={<MyRegistrations />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;