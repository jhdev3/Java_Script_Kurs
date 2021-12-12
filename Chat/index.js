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
  // console.log(sockets[0].username);
  //console.log(username);
  /* Check same username ? add feature latter*/
  //const socketss = io.of("/").sockets; // En map där index är id
  //console.log(socketss);

  if (!username) {
    console.log("error");
    return next(new Error("noUsername"));
  }
  socket.username = username;

  next();
});

io.on("connection", (socket) => {
  //let handshake = socket.handshake; //Testa senare
  console.log(
    "User: " + socket.username + " connected to the chat " + socket.id
  );
  //const sockets = io.of("/").sockets; // En map där index är id

  /* Unit test connect  checking the map :) 
  console.log(sockets);
  console.log(sockets.get(socket.id).id);
  console.log(sockets.get(socket.id).username);
    console.log(sockets.get("hej"));

*/

  const sockets = io.of("/").sockets; // En map där index är id

  let users = [];
  for ([id, socket] of sockets) {
    //Map där id i mapen och socket själva Socket objectet
    /* Unit Test 
    console.log(id);
    console.log(socket.username);
    */
    users.push({ userID: id, username: socket.username });
  }

  //console.log(users);
  socket.emit("userArray", users);

  //console.log(socket.id + " : " + socket.username);

  //Castar till alla andra när någon connectar:)
  socket.broadcast.emit("connection msg", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg); // Sickar till alla utom den som skrev :)
  });

  socket.on("user typing", () => {
    socket.broadcast.emit("user typing", socket.username + " is typing");
  });
  //Gör en sista koll på serversidan
  socket.on("private msg", ({ sendTo, msg }) => {
    if (io.of("/").sockets.get(sendTo)) {
      console.log(sendTo + " : " + msg);
      socket.to(sendTo).emit("private msg", {
        msg: msg,
        from: socket.username,
      });
    } else {
      socket.emit("private error", "User dont exist");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected with socked id: " + socket.id);
    socket.broadcast.emit("disconnected msg", {
      userID: socket.id,
      username: socket.username,
    });
    /* Unit test disconnect 
    console.log(sockets);
    console.log(socket.id + " : " + socket.username);
    console.log(sockets.get(socket.id));
    */
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
