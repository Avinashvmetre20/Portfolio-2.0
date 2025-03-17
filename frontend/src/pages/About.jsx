import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/About.css";

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchAbout = async () => {
      try {
        const response = await axios.get("/about");
        setAboutData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="about-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="about-content" data-aos="fade-up">
          <h2>About Me</h2>
          {aboutData.photo && (
            <div className="photo-container" data-aos="zoom-in">
              <img
                src={`http://localhost:8080/${aboutData.photo}`}
                alt="Profile"
                className="about-photo"
              />
            </div>
          )}
          <h3 data-aos="fade-right">{aboutData.name}</h3>
          <h4 data-aos="fade-left">{aboutData.title}</h4>
          <p data-aos="fade-up">{aboutData.description}</p>
        </div>
      )}
    </div>
  );
};

export default About;
