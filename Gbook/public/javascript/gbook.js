const form = document.querySelector("#post_recension");
//preventar bara defualt sen gör jag submit på knapp tryck
form.addEventListener("submit", (event) => {
  //Låser min submit knapp :) för att det inte ska gå att sicka flera samtidigt

  //document.querySelector(".btn-submit").disabled = true;
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
        outPutTemplate(data); //så lägger vi tilldata och hoppas det fungerar :)
        console.log(postRequest.responseText);
      } else if (postRequest.status === 406) {
        errorMsg(postRequest.responseText);
      } else {
        console.error(postRequest.statusText);
      }
    }
  };
  //Skriver ut error meddelandet super nice :)
  postRequest.onerror = function (e) {
    console.error(postRequest.statusText);
  };

  postRequest.send(data);
}

/* "stor template" den följer samma principer som gbook.ejs så att man slipper ladda om sidan   */

function outPutTemplate(data) {
  const c = JSON.parse(data);
  let li = document.createElement("li");
  li.setAttribute("class", "listItem");
  /* Rating template*/
  let div = document.createElement("div");
  div.setAttribute("class", "ratingDiv");
  let strong = document.createElement("strong");
  strong.textContent = c.rating;
  div.appendChild(strong);
  li.appendChild(div);
  /*Done with rating */
  /* Name + email*/
  div = document.createElement("div");
  div.setAttribute("class", "name-email");
  let divName = document.createElement("div");
  divName.setAttribute("class", "center-top");
  let p1 = document.createElement("p");
  p1.textContent = c.name;
  divName.appendChild(p1);
  div.appendChild(divName);
  let divEmail = document.createElement("div");
  divEmail.setAttribute("class", "right-top");
  let p2 = document.createElement("p");
  p2.textContent = c.email;
  divEmail.appendChild(p2);
  div.appendChild(divEmail);
  li.appendChild(div);
  /* End of that shit */
  let p3 = document.createElement("p");
  p3.setAttribute("class", "text");
  p3.textContent = c.review;
  li.appendChild(p3);
  //Unit testconsole.log(li);
  let output = document.querySelector("#outPosts");
  output.appendChild(li);
}

//Den blev snygg använder bra namn på saker så blir det så här :):)
//Går att sätta border samt +  field.validity.valid = false; som jag gjorde i intelligent form i del2 om man vill med :)

function errorMsg(errorArray) {
  console.log(JSON.parse(errorArray));
  const jsonArray = JSON.parse(errorArray);

  for (item of jsonArray) {
    let split = `${Object.keys(item)}`.split(","); //Gör det till string sen splitar :)
    /*
   Unit test :)
    console.log(split[1]);
    console.log(`${Object.keys(item)}`);
    */
    if (item.validate) {
      document.querySelector(`#${split[1]}Error`).textContent = " ";
    } else {
      document.querySelector(`#${split[1]}Error`).textContent = item[split[1]];
      document.querySelector(".btn-submit").disabled = false;
    }
  }
}
/*
    Tips till get requests :) 
let queryString = new URLSearchParams(data).toString();
  console.log(queryString);
  // Get all field data from the for
  console.log(form); */
