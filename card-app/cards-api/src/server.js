const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/cards");
const index = require("./models/index");
const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(generalLimiter); // Apply ratelimiting to all routes

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
