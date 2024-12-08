import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import "../styles/OnAir.css";


function OnAirItems() {
  const { user } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {

    if (user) {
      axios
        .get(`http://localhost:5000/items/all`)
        .then((response) => {
          if (response.data.success) {
            setItems(response.data.data.filter(item => item.user_id === user.id));
          }
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [user]);

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete("http://localhost:5000/items/delete", {
        data: { itemId },
      });
  
      if (response.data.success) {
        alert("Item deleted successfully");

        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Error deleting item: " + err.message);
    }
  };
  
  

  return (
    <div className="on-air-items-container">
      <h2>Your On-Air Items</h2>
      {items.length === 0 ? (
        <p>No items uploaded yet.</p>
      ) : (
        <div className="i-grid">
          {items.map((item) => (
            <div key={item.id} className="i-container">
              <img
                src={item.photo ? `data:image/jpeg;base64,${item.photo}` : "/placeholder.jpg"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p><strong>Type:</strong> {item.type}</p>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OnAirItems;
