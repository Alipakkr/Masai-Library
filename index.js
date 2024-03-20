const express = require("express");
const connection = require("./db");
const userRoutes = require("./controllers/routes/user.routes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("This is the home page");
});

// Use the routes under the '/api' prefix
app.use("/api", userRoutes.router);
app.use("/api/books", userRoutes.bookRoutes);
app.use("/api/orders", userRoutes.orderRoutes);


app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server is running at 8080");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
});
