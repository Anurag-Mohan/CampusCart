import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepages";
import SellItem from "./components/SellItem";
import Profile from "./components/Profile";
import OnAirItems from "./components/OnAirItems"; 
import PaymentPage from "./components/PaymentPage"; 
import ItemDetailPage from "./components/ItemDetailPage";
import Admin from "./components/Admin";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/sell" element={<SellItem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/on-air" element={<OnAirItems />} /> 
          <Route path="/payment/:id" element={<PaymentPage />} /> 
          <Route path="/item/:id" element={<ItemDetailPage />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
