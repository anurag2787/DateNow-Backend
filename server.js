const express= require('express');
const http=require('http');
const app=new express();
const server=http.createServer(app);
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Note: credentials cannot be used with wildcard origin
}));
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
  const emailjs = require("./routes/email");
  app.use('/sendemail',emailjs);

  mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))