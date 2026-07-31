import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  FaLaptopCode,
  FaTrophy,
  FaGraduationCap,
  FaRocket
} from "react-icons/fa";

function Home() {

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {

    if (keyword.trim() !== "") {

      navigate(`/events?search=${keyword}`);

    } else {

      navigate("/events");

    }

  };

  return (

    <div className="home">

      <h1>
        Discover Tech Events Near You 📍
      </h1>

      <p>
        Discover hackathons, AI workshops, developer meetups,
        startup networking events and tech conferences happening near your location.
      </p>

      <div className="home-search">

        <input
          type="text"
          placeholder="Search Hackathons, AI Workshops, Meetups..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSearch();

            }

          }}
        />

        <button onClick={handleSearch}>
          Search Tech Events
        </button>

      </div>

      <h2>
        Explore Tech Categories
      </h2>

      <div className="category-section">

        <div className="category-card">

          <FaLaptopCode size={40} />

          <h3>Developer Meetups</h3>

          <p>
            Meet developers, share ideas and grow your network.
          </p>

        </div>

        <div className="category-card">

          <FaTrophy size={40} />

          <h3>Hackathons</h3>

          <p>
            Participate in coding competitions and innovation challenges.
          </p>

        </div>

        <div className="category-card">

          <FaGraduationCap size={40} />

          <h3>AI Workshops</h3>

          <p>
            Learn Artificial Intelligence, Machine Learning and Data Science.
          </p>

        </div>

        <div className="category-card">

          <FaRocket size={40} />

          <h3>Startup Networking</h3>

          <p>
            Connect with founders, investors and startup communities.
          </p>

        </div>

      </div>

    </div>

  );

}

export default Home;