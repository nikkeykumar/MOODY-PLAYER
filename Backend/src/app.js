const express = require("express");
require("dotenv").config();
const cors = require("cors");
const songRouter = require("./routes/song.routes");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.FrontEnd_url,
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api", songRouter);
module.exports = app;
