const express= require('express');
const http=require('http');
const app=new express();
const server=http.createServer(app);
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, 
      methods: ["GET", "POST"],
    },
  });
server.listen(9000, () => console.log("Server Started"));

io.on("connection", socket =>{
    console.log("A user connected");
    socket.on("user-message",message =>{
        io.emit("m",message);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
})

app.get("/", (req, res) => {
    res.send("🚀 Server is up and running! Are you a developer? 😏 I bet you didn’t even check before panicking. Relax, it's all good! 🎉😂");
  });

  const talkRoutes = require("./routes/talkroutes");
  app.use("/api", talkRoutes);

  mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));