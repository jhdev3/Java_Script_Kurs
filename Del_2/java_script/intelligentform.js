/*Upg7 
Använder mig av JavaScript i så stor utsträckning som möjligt
En snyggare och bättre lössning är att kombinera CSS HTML OCH JAVASCRIPT
Tex använda input pattern attributet som RegularExpressions och sedan manipulera storlek text osv i script
*/

// som används för att validera varje input :) 
//Använder https://regexr.com/ för att testa osv
//email: kollar inte asb..asb@test.com :( 
//Testar de flesta emails några rätt/fel kan slippa förbi ;) 
//säkert något jag missar :) 
const patterns = {
   firstName : new RegExp(/^(\p{L}|\s){2,}$/iu),//Förnamn och efternamn tillåter dubbelnamn samt alla olika bokstäver för alla språk:) 
   familyName : new RegExp(/^(\p{L}|\s){2,}$/iu),
   userEmail : new RegExp(/^([^\.][a-z0-9!#$%&'*\+\-\/=?^_`{|}~.]{1,63})[^\.]@{1}([a-z]{1})([a-z0-9\.-]*)([^-])\.([a-z]){2,8}$/i),
   teleNummer : new RegExp(/^\d{7,11}$/),//riktnummer etc 2-3 +Abonnentnummerlängd i svergie 5-8 siffor
   userGAddress : new RegExp(/^[a-ö ]+\s\d{1,4}$/i),
   userPostnummer : new RegExp(/^\d{3}(\s?)\d{2}$/), //space om man vill eller inte för att vara snäll
   userStad : new RegExp(/^[a-ö -]{2,}$/i), //tror det räcker för svergie max-min längd går att ändra
};
const formUser = document.querySelector("#user_form"); //Save som time
const inPuts = formUser.querySelectorAll('input');


//Notiferar vid felinmattning :) 
function inFieldValidate(field)
{
        if(patterns[field.name].test(field.value))
        {
            field.style.border = '1px solid green';
        }
        else
        {
            field.style.border = '1px solid red';
        }
}

//= value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
//Tittar till UserInputs
function returnInput(inputselect){
    let setValue = "Wrong";
    let regexp = patterns[inputselect.name];
    let check = regexp.test(inputselect.value);
    if(check){
        setValue = inputselect.value; 
    }
    inFieldValidate(inputselect);
    return setValue;
}

//Validerar Hela User Formuläret xD
function validateUser(){
    const inputValues = [];
    //inPuts.pop();
    console.log(inPuts);
    for(let i = 0; i < 7; i++){ //kör inte submit
        inputValues.push(returnInput(inPuts[i]));
       console.log(inPuts[i].value);
    } 
    return inputValues;

}
//  document.querySelector("#userFormOut").textContent +=  inp.name + " : " + inp.value + "\n" ;

function submitUser(event){
   
    
        console.log(validateUser());
  

    event.preventDefault();
}


//För väldigt långsamma webbläsare ;) 
window.addEventListener('load', (event) => {
    
    formUser.addEventListener("submit", submitUser);
    
    for(infield of inPuts){

        if(infield.type != "submit"){
            console.log(infield);

            infield.addEventListener('onclick', (e)=> {
              console.log(e.target);
              console.log(infield);

                // inFieldValidate(c);
                
            });
        }

    }

});

















//Test remove later

function createLabel(form, input, text){
    let newlabel = document.createElement("Label");
    newlabel.setAttribute("for",input);
    newlabel.innerHTML = text;
    form.appendChild(newlabel);
}
