const express = require("express");
const app = express();
const http = require("http")
const cors = require("cors")

const { Server } = require("socket.io")
const server = http.createServer(app);
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("socket connected with", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room", data)
  })

  socket.on("send_message", (data) => {
      console.log("message data", data)
    socket.to(data.room).emit("recieve_message", data)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
  })
} )

server.listen(8080 , () => {
  console.log('server running')
} )