let socket = io();

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    createChatMsg(input.value, "myMsg");
    input.value = "";
  }
});

function createChatMsg(msg, type) {
  let item = document.createElement("li");
  let text = document.createElement("p");
  text.setAttribute("class", type);
  text.textContent = msg;
  item.appendChild(text);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

socket.on("chat message", function (chat_msg) {
  createChatMsg(chat_msg, "reciveMsg");
});

socket.on("connection msg", (connect_msg) => {
  createChatMsg(connect_msg, "connected");
});

socket.on("disconnected msg", (connect_msg) => {
  createChatMsg(connect_msg, "disconnected");
});
