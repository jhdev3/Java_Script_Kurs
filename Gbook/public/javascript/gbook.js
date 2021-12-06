console.log("Test Javascript");

/*
    <link rel="stylesheet" href="public/css/style.css" />

    action="/api/rescension"
     method="post"
*/

const form = document.querySelector("#post_recension");
//preventar bara defualt sen gör jag submit på knapp tryck
form.addEventListener("submit", (event) => {
  //Låser min submit knapp :) för att det inte ska gå att sicka flera samtidigt
  document.querySelector(".btn-submit").disabled = true;
  //Hämtar formData från formuläret
  let data = new FormData(event.target);
  //Gör de till object för inputs dvs input:name : input:value :)
  const value = Object.fromEntries(data.entries());
  //console.log(typeof value);
  //Sedan omvandlar vi till en json string som går att sicka :)
  let sendData = JSON.stringify(value);
  //console.log(JSON.parse(sendData));
  //console.log(typeof sendData);
  subMitForm(sendData);

  //Vidare hantering av inputs om felaktig data sickades tex?

  event.preventDefault();
});

function subMitForm(data) {
  let postRequest = new XMLHttpRequest();

  postRequest.open("POST", "/api/rescension", true);

  //Fungerade inte utan  "application/json", det där blev helt fel "application/x-www-form-urlencoded"

  postRequest.setRequestHeader("Content-Type", "application/json");

  postRequest.onload = function (e) {
    if (postRequest.readyState === 4) {
      if (postRequest.status === 200) {
        console.log(postRequest.responseText);
      } else {
        console.error(postRequest.statusText);
      }
    }
  };
  postRequest.onerror = function (e) {
    console.error(postRequest.statusText);
  };
  console.log("'" + data + "'");
  postRequest.send(data);
}

/*
    Tips till get requests :) 
let queryString = new URLSearchParams(data).toString();
  console.log(queryString);
  // Get all field data from the for
  console.log(form); */
