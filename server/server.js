const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const Db = require("./config/db");

dotenv.config();
Db();
const app = express();
app.use(express.json(), cors(), helmet());

const authRoutes = require("./controllers/User");
const pollRoutes = require("./controllers/Poll");

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.set("io", io); 

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
});
