const express= require('express');
const http=require('http');
const app=new express();
const server=http.createServer(app);
const cors = require("cors");

app.use(cors());

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Allow React frontend
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
