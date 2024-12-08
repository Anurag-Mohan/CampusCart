import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

function Homepage() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    fetch("http://localhost:5000/items/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
        } else {
          console.error("Failed to fetch items:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const moveLeft = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const moveRight = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {

    const interval = setInterval(() => {
      moveRight();
    }, 1500);


    return () => clearInterval(interval);
  }, [currentIndex, items.length]); 

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h1>Campus Marketplace</h1>
        <div>
          <Link to="/sell">Sell Item</Link>
          <Link to="/on-air">On-Air Items</Link>
          <Link to="/">Form Group</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>


      <div className="recent-items-container">
        <button className="arrow-button left" onClick={moveLeft}>&lt;</button>
        <div className="recent-items">
          {items.length > 0 && (
            <>
              <img
                src={items[currentIndex].photo ? `data:image/jpeg;base64,${items[currentIndex].photo}` : "/placeholder.jpg"}
                alt={items[currentIndex].name}
              />
              <div className="item-info">
                <h3>{items[currentIndex].name}</h3>
                <p><strong>Type:</strong> {items[currentIndex].type}</p>
                <p>{items[currentIndex].description}</p>
              </div>
              <button className="buy-now-button">Buy Now</button>
            </>
          )}
        </div>
        <button className="arrow-button right" onClick={moveRight}>&gt;</button>
      </div>


      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-container">
            <img
              src={item.photo ? `data:image/jpeg;base64,${item.photo}` : "/placeholder.jpg"}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
            <button className="buy-now-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;