require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { loadAppRoutes } = require("./src/routes");
const { initializeDatabase } = require("./src/database/db");
initializeDatabase();
const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://stonecore.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
// server running check
app.get("/", ( res) => {
  res.send("Test successful!");
});

loadAppRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
