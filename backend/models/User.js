const db = require("../db");

const User = {
  createTable: () => {
    db.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      )`,
      (err) => {
        if (err) throw err;
        console.log("Users table created");
      }
    );
  },
};

module.exports = User;