const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
