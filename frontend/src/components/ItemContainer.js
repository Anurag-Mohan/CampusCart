import React from "react";
import "../styles/ItemContainer.css";

function ItemContainer({ item }) {
  return (
    <div className="item-container">
      <img src={item.photo} alt={item.name} className="item-image" />
      <h3 className="item-name">{item.name}</h3>
      <p className="item-type">{item.type}</p>
      <p className="item-description">{item.description}</p>
      <p className="item-price">₹{item.price}</p>
    </div>
  );
}

export default ItemContainer;
