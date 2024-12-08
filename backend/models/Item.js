const db = require("../db");

const Item = {
  createTable: () => {
    db.query(
      `CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        type VARCHAR(255),
        description TEXT,
        price DECIMAL(10, 2),
        photo TEXT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,
      (err) => {
        if (err) throw err;
        console.log("Items table created");
      }
    );
  },
};

module.exports = Item;
