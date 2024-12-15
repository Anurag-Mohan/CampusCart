import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ItemDetailPage.css";

function ItemDetailPage() {
  const { id } = useParams();
  const [i, setI] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/items/detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setI(data.data);
        } else {
          console.error("Failed to fetch item:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching item:", error));
  }, [id]);

  const handlePaymentClick = () => {
    navigate(`/payment/${id}`, {
      state: { price: i.price, name: i.name },
    });
  };

  return (
    <div className="a">
      {i ? (
        <>
          <img
            src={i.photo ? `data:image/jpeg;base64,${i.photo}` : "/placeholder.jpg"}
            alt={i.name}
            className="b"
          />
          <div className="c">
            <h2>{i.name}</h2>
            <p><strong>Type:</strong> {i.type}</p>
            <p><strong>Description:</strong> {i.description}</p>
            <p><strong>Price:</strong> ₹<span className="d">{i.price}</span></p>
            <button className="e" onClick={handlePaymentClick}>Proceed to Payment</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetailPage;
