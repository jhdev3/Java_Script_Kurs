const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + "/chat.html");
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets

//on connection middleware function :)

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  //console.log(username);
  if (!username) {
    console.log("error");
    return next(new Error("noUsername"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  //let handshake = socket.handshake; //Testa senare

  console.log("User: " + socket.username + " connected to the chat");
  //Castar till alla andra när någon connectar:)
  socket.broadcast.emit(
    "connection msg",
    "User: " + socket.username + " has connected to the chat"
  );

  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg); // Sickar till alla utom den som skrev :)
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit(
      "disconnected msg",
      "User with id: " + socket.id + " has disconnected"
    );
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
