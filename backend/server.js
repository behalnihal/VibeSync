const express = require("express");
const { chats } = require("./data/data");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
dotenv.config();

app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("api is running on port 5000 sucessfuly");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is listening on port ${PORT}`));
