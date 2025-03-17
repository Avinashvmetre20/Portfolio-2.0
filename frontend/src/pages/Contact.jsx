import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all messages (only if logged in)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/contact", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn]);

  // Handle sending a message
  const handleSendMessage = async () => {
    try {
      const response = await axios.post("/contact", { name, email, message });
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Error sending message: " + error.message);
    }
  };

  // Toggle contact details
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Handle deleting a message
  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`/contact/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Message deleted successfully!");
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      alert("Error deleting message: " + error.message);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Me</h2>

      {/* Contact Form */}
      <div className="contact-form">
        <h3>Send a Message</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>

      {/* Show My Details Button */}
      <button className="details-button" onClick={handleToggleDetails}>
        {showDetails ? "Hide My Details" : "Show My Details"}
      </button>

      {/* Display Personal Details */}
      {showDetails && (
        <div className="contact-details">
          <p>Email: Avinashvmetre20@gmail.com</p>
          <p>Phone: +91 6360639208</p>
        </div>
      )}

      {/* Display Messages (only when logged in) */}
      {isLoggedIn && (
        <div className="messages-list">
          <h3>Received Messages</h3>
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <button onClick={() => handleDeleteMessage(msg._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
