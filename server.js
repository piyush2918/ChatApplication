const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const port = process.env.PORT || 5757;
const { join } = require("path");
const app = express();
const server = http.createServer(app);
let users = {
  arnav: "ajkjdxk",
};
let socketmap = {};
const io = socketio(server);

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
io.on("connection", (socket) => {
  console.log("connecction establishes", socket.id);

  socket.on("signinroom", (data) => {
    socketmap[socket.id] = data.username;

    socket.join(data.room);

    socket.emit("signedin", data);
  });
  socket.on("signedinpublic", (data) => {
    socket.join("Public");

    socketmap[socket.id] = data.username;
    console.log(socketmap);

    socket.emit("signedin", data);
  });

  /* BTNSEND LOGIC  */
  socket.on("msg_send", (data) => {
    data.from = socketmap[socket.id];
    console.log(data.to);
    if (data.to == "Public") {
      console.log("Apple");
      io.to(data.to).emit("msg_rcvd", data);
    } else {
      console.log("mango");
      io.to(data.to).emit("msg_rcvd", data);
    }
  });
});

app.get("/room", (req, res) => {
  res.render("room");
});

app.get("/", (req, res) => {
  res.render("room");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/chatbox", (req, res) => {
  res.render("chatbox");
});

server.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
