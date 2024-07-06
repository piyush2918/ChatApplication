let socket = io();
let where;
$(() => {
  $(".signup").show();
  $(".chatbox").hide();
  /*    PUBLIC JOINING                               */
  $("#joinroom").click(() => {
    where = $("#room").val();
    socket.emit("signinroom", {
      username: $("#username").val(),
      room: $("#room").val(),
    });
  });

  socket.on("signedin", (msg) => {
    $("#name").text(msg.username);
    if (msg.info) {
      $("#way").text(msg.info);
    } else {
      $("#way").text(`Room : ${msg.room}`);
    }
    $(".signup").hide();
    $(".chatbox").show();
  });

  /*      JOIN PUBLIC BUTTON              */

  $("#joinpublic").click(() => {
    $("#room").val("Public");
    where = "Public";

    socket.emit("signedinpublic", {
      info: where,
      username: $("#username").val(),
    });
  });

  $("#btnsend").click(() => {
    socket.emit("msg_send", {
      to: where,
      msg: $("#message").val(),
    });
    $("#message").val("");
  });
  socket.on("msg_rcvd", (data) => {
    $("#ul").append($("<li>").text(` ${data.from} : ${data.msg}`));
  });

  socket.on("login_failed", () => {
    window.alert("Incorrect username or password ");
  });
});
