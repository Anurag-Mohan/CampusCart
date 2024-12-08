import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser(); 
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");


    if (!email || !password) {
      return setError("Both email and password are required.");
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {

        setUser({ id: data.id, username: data.username });


        navigate("/home");
      } else {

        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Error connecting to the server:", err);
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Campus Marketplace</h2>


        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>
          New here? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;