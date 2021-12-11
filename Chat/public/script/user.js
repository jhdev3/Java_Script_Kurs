let socket = io({
  autoConnect: false, //login med username :)
});
//socket.connect(); //kalla på socket.connect:)

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let loginForm = document.querySelector("#login");
let loginInput = document.getElementById("userName");

/* 
//Skriver ut alla events som servern sickar se bra för felsökning :) 
socket.onAny((event, ...args) => {
  console.log(event, args);
});
*/
window.onload = (event) => {
  document.getElementById("chatWindow").style.visibility = "hidden";
};
/*Login */

//connection error :)

socket.on("connect_error", (error) => {
  console.log(error.message);
  if (error.message === "noUsername") {
    loginInput.validity.valid = false;
    loginInput.setCustomValidity("noUsername");
    loginInput.style.border = "1px solid red";
    connect = false;
  }
});

socket.on("connect", () => {
  /* Unit test 
  console.log("Connected = true");
  console.log(socket.id + " " + socket.username);
*/
  document.getElementById("chatWindow").style.visibility = "visible";
  document.getElementById("loginCont").style.visibility = "hidden";
});
//Ändrar validity etc på fältet xD Så att om man gör fel kan göra rätt utan att ladda om sidan;)
loginInput.addEventListener("focus", function (event) {
  loginInput.validity.valid = true;
  loginInput.setCustomValidity("");
  loginInput.style.border = "1px solid black";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = loginInput.value;
  socket.auth = { username };
  console.log(socket.auth);
  socket.connect();
});
/*---Chat--- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    createChatMsg(input.value, "myMsg");
    input.value = "";
  }
});

/* User is typing */
input.addEventListener("keydown", (event) => {
  //console.log(input.value.length);
  //Någon limit korta snabba svar är väll inget att broadcasta;)
  if (event.target.value.length > 4) {
    socket.emit("user typing");
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

let typing = false; //För att det inte ska blinka osv om man skriver mycket eller flera användare skriver samtidgit
//Den som kommer först syns i 3 sek blir ingen kö utan fortsätter man eller någon annan skriver så vissas den
socket.on("user typing", (msg) => {
  if (!typing) {
    document.querySelector("#user_writes").textContent = msg;
    typing = true;
    setTimeout(() => {
      document.querySelector("#user_writes").textContent = "";
      typing = false;
    }, 3000);
  }
});
