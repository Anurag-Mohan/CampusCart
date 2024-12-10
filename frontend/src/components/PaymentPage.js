import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/PaymentPage.css";

function PaymentPage() {
  const [isPaid, setIsPaid] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {

    if (location.state) {
      setAmount(location.state.price); 
    }
  }, [location.state]);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv) {
      setIsLoading(true);

      setTimeout(() => {
        setIsPaid(true);
        setIsLoading(false); 
      }, 2000);
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div style={{ backgroundColor: "#5f6a6a ", minHeight: "100vh" }} >
    <div className="payment-container">
      <h2>Payment Gateway</h2>
      {isPaid ? (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Your payment of ₹{amount} has been processed.</p>
        </div>
      ) : (
        <div className="payment-form">
          <p><strong>Amount:</strong> ₹{amount}</p>
          <input
            type="text"
            placeholder="Enter Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="MM/YY Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <button
            className={`pay-button ${isLoading ? "loading" : ""}`}
            onClick={handlePayment}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default PaymentPage;
