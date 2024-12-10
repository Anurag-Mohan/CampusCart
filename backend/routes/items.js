const express = require("express");
const multer = require("multer");
const fs = require("fs");
const db = require("../db");
const router = express.Router();


const upload = multer({ dest: "uploads/" });


router.post("/add", upload.single("photo"), async (req, res) => {
  const { name, type, description, price, userId } = req.body;

  if (!req.file || !name || !type || !description || !price || !userId) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
  
    const photoBuffer = fs.readFileSync(req.file.path);


    await db.query(
      "INSERT INTO items (name, type, description, price, photo, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, type, description, price, photoBuffer, userId]
    );


    fs.unlinkSync(req.file.path);

    res.status(200).json({ success: true, message: "Item added successfully!" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Error adding item." });
  }
});


router.get("/all", async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, type, description, price, photo, user_id FROM items");


    const itemsWithBase64Images = results.map((item) => ({
      ...item,
      photo: item.photo ? Buffer.from(item.photo).toString("base64") : null,
    }));

    res.status(200).json({ success: true, data: itemsWithBase64Images });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Error fetching items." });
  }
});


router.delete('/delete', async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ success: false, message: 'Item ID is required.' });
  }

  try {

    const result = await db.query('DELETE FROM items WHERE id = ?', [itemId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    res.status(200).json({ success: true, message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting item.' });
  }
});


router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "SELECT id, name, type, description, price, photo, user_id FROM items WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Item not found." });
    }


    const itemWithBase64Image = {
      ...result[0],
      photo: result[0].photo ? Buffer.from(result[0].photo).toString("base64") : null,
    };

    res.status(200).json({ success: true, data: itemWithBase64Image });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Error fetching item details." });
  }
});


module.exports = router;
