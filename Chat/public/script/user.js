let socket = io({
  autoConnect: false, //login med username :)
});
//socket.connect(); //kalla på socket.connect:)

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let loginForm = document.querySelector("#login");
let loginInput = document.getElementById("userName");

const privateMsgSelect = document.querySelector("#privateMsg");

let users = [];

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
//private error msg
socket.on("private error", (err) => {
  createChatMsg(err, "erroMsg");
});

socket.on("connect", () => {
  /* Unit test 
  console.log("Connected = true");
  console.log(socket.id + " " + socket.username);
*/
  //console.log(socket.id);
  document.getElementById("chatWindow").style.visibility = "visible";
  document.getElementById("loginCont").style.visibility = "hidden";
});

/* Hämtar och skriver ut Users i select box*/
socket.on("userArray", (getUsers) => {
  users = getUsers;
  //console.log(users);
  for (u of users) {
    // console.log(u);
    //Så att jag inte ser mig själv och sickar til mig själv etc
    //gör inte så mycket att mit eget id finns med i arrayen
    //Det var trevligt när man felsökte etc det viktiga är att inte sicka till sig själv och se sig själv
    if (u.userID !== socket.id) {
      createOption(u);
    }
  }
});

function createOption(data) {
  let option = document.createElement("OPTION");
  option.value = data.userID;
  option.text = data.username;
  privateMsgSelect.appendChild(option);
}

//Ändrar validity etc på fältet xD Så att om man gör fel kan göra rätt utan att ladda om sidan;)
loginInput.addEventListener("focus", function (event) {
  loginInput.validity.valid = true;
  loginInput.setCustomValidity("");
  loginInput.style.border = "1px solid black";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = loginInput.value;
  socket.auth = { username }; //läger det som ett object i socket.auth och accesar det senare på server sidan enkelt
  //console.log(socket.auth);
  socket.connect();
});
/*---Chat--- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let privateMsg = privateMsgSelect.options[privateMsgSelect.selectedIndex];
  // console.log(privateMsg);
  // console.log(privateMsg.value);

  //Kollar tom sträng
  if (input.value && privateMsg.value === "allChat") {
    socket.emit("chat message", input.value);
    createChatMsg({ username: "", text: input.value }, "myMsg");
    input.value = "";
  }
  //kollar private msg
  if (input.value && privateMsg.value !== "allChat") {
    socket.emit("private msg", {
      sendTo: privateMsg.value,
      msg: input.value,
    });
    createChatMsg({ username: "", text: input.value }, "privateMsg");
    input.value = "";
  }
});

/* User is typing */
input.addEventListener("keydown", (event) => {
  //console.log(input.value.length);
  //Någon limit korta snabba svar är väll inget att broadcasta;)
  let privateMsg = privateMsgSelect.options[privateMsgSelect.selectedIndex];

  /* Kan lägga till en user writing to men det blir mest copy paste ;) */
  if (privateMsg.value === "allChat") {
    if (event.target.value.length > 4) {
      socket.emit("user typing");
    }
  }
});
//Template outPutChat
function createChatMsg(userMsg, type) {
  let item = document.createElement("li");
  let divCont = document.createElement("div");
  divCont.setAttribute("class", type);

  let divSplit = document.createElement("div");
  divSplit.setAttribute("class", "split");

  let name = document.createElement("div");
  name.textContent = userMsg.username;
  divSplit.appendChild(name);
  let timeDiv = document.createElement("div");
  let time = new Date();
  timeDiv.textContent = time.toTimeString().substring(0, 5);
  divSplit.appendChild(timeDiv);
  divCont.appendChild(divSplit);

  // time.toTimeString();
  let text = document.createElement("p");
  text.textContent = userMsg.text;
  let divText = document.createElement("div");
  divText.setAttribute("class", "textDiv");
  divText.appendChild(text);
  divCont.appendChild(divText);

  item.appendChild(divCont);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
//template disconnect connect
//Vore nice att lägga till en icon här
function createConDiscon(userEvent, type) {
  let text = document.createElement("p");
  text.setAttribute("class", type);
  let time = new Date();

  text.textContent = userEvent + "  " + time.toTimeString().substring(0, 5);
  let item = document.createElement("li");
  item.appendChild(text);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

socket.on("chat message", function (chat_msg) {
  createChatMsg(chat_msg, "reciveMsg");
});

socket.on("private msg", (objMsg) => {
  //console.log(objMsg);
  //console.log(objMsg.from + " " + objMsg.msg);
  createChatMsg({ username: objMsg.from, text: objMsg.msg }, "privateMsgRec");
});

socket.on("connection msg", (user) => {
  users.push(user);
  //console.log(users);
  createOption(user);
  createConDiscon(user.username + " has connect to the chat", "connected");
});

socket.on("disconnected msg", (user) => {
  /*Delet user :) */

  deleteUser(user.userID);
  deletOptionUser(user.userID);
  createConDiscon(
    user.username + " has disconnected from the chat",
    "disconnected"
  );
});
//Funkar :);)
function deletOptionUser(id) {
  /*
  Allternativ lösning ta bort option som matchar value;)
  let allOptions = document.querySelectorAll("option");
  console.log(allOptions);
  eller något sådant men funkar inte riktigt

  Det där kan fungera om jag lägger till ett id på option när jag skapar
  option för varje user ;)
   let option = document.querySelector("#" + user.userID);
  console.log(option);
  option.remove();
  
  */
  let index = 0;
  //o är option sen index är det som tas bort;)
  //Går säkert att
  for (o of privateMsgSelect) {
    //console.log(pplSelect[i]);
    //  console.log(o.value);
    if (o.value === id) {
      privateMsgSelect.remove(index);
    }
    ++index;
    // privateMsgSelect.remove(i);
  }
}

function deleteUser(id) {
  // console.log(id);
  users = users.filter((u) => {
    //  console.log(u.userID);
    return u.userID !== id;
  });

  // console.log(users);
}

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
