import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Admin.css'; 

function Admin() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsersAndItems = async () => {
      setLoading(true);
      try {
        const [usersResponse, itemsResponse] = await Promise.all([
          axios.get("http://localhost:5000/auth/all"),
          axios.get("http://localhost:5000/items/all"),
        ]);

        setUsers(usersResponse.data.data);
        setItems(itemsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchUsersAndItems();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete("http://localhost:5000/auth/delete", { data: { userId } });
      if (response.data.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete("http://localhost:5000/items/delete", { data: { itemId } });
      if (response.data.success) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="ac">
      <h1 className="tt">Admin Panel</h1>

      {loading && <p className="lp">Loading data...</p>}

      {!loading && (
        <div className="dt">
          <section className="ct">
            <h2 className="ht">Users</h2>
            <table className="tb">
              <thead>
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Username</th>
                  <th className="th">Email</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="td">{user.id}</td>
                      <td className="td">{user.username}</td>
                      <td className="td">{user.email}</td>
                      <td className="td">
                        <button className="btn" onClick={() => deleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="td">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="ct">
            <h2 className="ht">Items</h2>
            <table className="tb">
              <thead>
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Name</th>
                  <th className="th">Type</th>
                  <th className="th">Description</th>
                  <th className="th">Price</th>
                  <th className="th">User ID</th>
                  <th className="th">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="td">{item.id}</td>
                      <td className="td">{item.name}</td>
                      <td className="td">{item.type}</td>
                      <td className="td">{item.description}</td>
                      <td className="td">{item.price}</td>
                      <td className="td">{item.user_id}</td>
                      <td className="td">
                        <button className="btn" onClick={() => deleteItem(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="td">No items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
}

export default Admin;
