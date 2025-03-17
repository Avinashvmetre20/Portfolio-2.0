import React, { useState } from "react";
import axios from "../api/axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { username, password });

      // Save the token to local storage
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      setMessage("Invalid credentials or server error!");
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p className="message">{message}</p>}
      <div className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;
