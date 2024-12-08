import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

function Profile() {
  const { user, logout } = useUser();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/all");
        const data = await response.json();

        if (response.ok) {

          const userDetails = data.data.find((u) => u.id === user.id);
          setProfileUser(userDetails || null);
        } else {
          console.error(data.message);
          setError("Failed to fetch user details.");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Error connecting to the server.");
      }
      setLoading(false);
    };

    if (user) fetchUserDetails();
  }, [user]);

  if (loading) return <p style={styles.loadingText}>Loading user details...</p>;
  if (error) return <p style={styles.errorText}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      {profileUser ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome, {profileUser.username}!</h1>
          <p style={styles.detail}>
            <span style={styles.label}>Email:</span> {profileUser.email}
          </p>
          <p style={styles.detail}>
            <span style={styles.label}>User ID:</span> {profileUser.id}
          </p>
          <button
            style={styles.logoutButton}
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p style={styles.noDetailsText}>User details not found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    color: "#ffffff",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    maxWidth: "400px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
  },
  detail: {
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
  label: {
    fontWeight: "bold",
    color: "#00d1ff",
  },
  logoutButton: {
    marginTop: "1.5rem",
    padding: "0.7rem 1.5rem",
    background: "linear-gradient(90deg, #ff512f, #dd2476)",
    border: "none",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  logoutButtonHover: {
    transform: "scale(1.1)",
  },
  noDetailsText: {
    fontSize: "1.2rem",
    color: "#f00",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#ff0",
  },
  errorText: {
    fontSize: "1.2rem",
    color: "#f00",
  },
};

export default Profile;
