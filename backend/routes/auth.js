const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db"); 
const router = express.Router();


router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  console.log("Received signup request:", req.body); 

  try {
    
    const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email is already in use" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const [results] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return res.status(201).json({ message: "User created successfully" }); 
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Error creating user: " + err.message }); 
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    res.send({ id: user.id, username: user.username });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/all", async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, username, email FROM users");
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});


module.exports = router;