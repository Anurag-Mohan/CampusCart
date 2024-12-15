import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaStore, FaRegListAlt, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/Homepage.css";


function Homepage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/items/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
          setFilteredItems(data.data);
        } else {
          console.error("Failed to fetch items:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [filteredItems]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );
    setFilteredItems(results);
    setCurrentIndex(0); 
  };

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

  const moveLeft = () => {
    setCurrentIndex(currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1);
  };

  const moveRight = () => {
    setCurrentIndex(currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="homepage-container">
    <nav className="navbar">
      <img src={logo} alt="Campus Marketplace Logo" className="logo" />
      <h1>Campus Marketplace</h1>
      <div className={`search-bar ${searchExpanded ? "expanded" : ""}`}>
        <button
          className="search-icon-button"
          onClick={toggleSearch}
          aria-label="Search"
        >
          <FaSearch size={20} />
        </button>
        {searchExpanded && (
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search Items"
          />
        )}
      </div>
      <div className="nav-links">
        <Link to="/sell" aria-label="Sell Item">
          <FaStore size={24} />
        </Link>
        <Link to="/on-air" aria-label="On-Air Items">
          <FaRegListAlt size={24} />
        </Link>
        <Link to="/profile" aria-label="Profile">
          <FaUser size={24} />
        </Link>
      </div>
      
    </nav>


      <div className="recent-items-container">
        <button className="arrow-button left" onClick={moveLeft}>
          &lt;
        </button>
        <div className="recent-items">
          {filteredItems.length > 0 && (
            <>
              <img
                src={filteredItems[currentIndex].photo ? `data:image/jpeg;base64,${filteredItems[currentIndex].photo}` : "/placeholder.jpg"}
                alt={filteredItems[currentIndex].name}
              />
              <div className="item-info">
                <h3>{filteredItems[currentIndex].name}</h3>
                <p>
                  <strong>Type:</strong> {filteredItems[currentIndex].type}
                </p>
                <p>{filteredItems[currentIndex].description}</p>
              </div>
              <Link to={`/item/${filteredItems[currentIndex].id}`}>
                <button className="buy-now-button">Buy Now</button>
              </Link>
            </>
          )}
        </div>
        <button className="arrow-button right" onClick={moveRight}>
          &gt;
        </button>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-container">
            <img
              src={item.photo ? `data:image/jpeg;base64,${item.photo}` : "/placeholder.jpg"}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <p>{item.description}</p>
            <p>
              <strong>Price:</strong> <span style={{ color: "lime" }}> ₹{item.price}</span>
            </p>
            <Link to={`/item/${item.id}`}>
              <button className="buy-now-button">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
