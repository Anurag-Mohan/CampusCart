import React, { useState, useEffect } from "react";
import "../styles/SellItem.css";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { useUser } from "../context/UserContext";

function SellItem() {
  const initialFormData = {
    name: "",
    type: "",
    description: "",
    price: "",
    photo: null,
  };

  const { user } = useUser();
  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("photo", formData.photo);
    data.append("userId", formData.userId);

    try {
      const response = await axios.post("http://localhost:5000/items/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);

      setFormData(initialFormData);
    } catch (err) {
      alert("Error adding item: " + err.message);
    }
  };

  return (
    <div className="sell-container">
      <h2>Sell Your Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          required
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          required
          onChange={handleChange}
        />


        <label htmlFor="photo" className="custom-file-upload">
          <i className="fa fa-upload"></i> Choose File
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          required
          onChange={handleChange}
        />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SellItem;
