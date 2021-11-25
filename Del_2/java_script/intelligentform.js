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
const reseBooking = document.querySelector("#bookTravel");

//Notiferar vid felinmattning :) 
function inFieldValidate(field)
{
        field.setCustomValidity("");//Måste rensa för uppdatering
     if(patterns[field.name].test(field.value))
        {
            console.log(field.value);

            field.style.border = '1px solid green';
            field.validity.valid = true;
            //field.setAttribute("isvalid", "true");
        }
        else
        {
            field.validity.valid = false;
            field.setCustomValidity("Fel format din idiot ;)");
            //field.setAttribute("isvalid", "false");
            field.style.border = '1px solid red';
        }
}
//Skapar User data när formuläret är validerat xD
function createUserData(){ 
    for(let i = 0; i < 7; i++){ //kör inte submit
        createPara(inPuts[i].value);
    } 
    formUser.style.display = "none";
    reseBooking.style.display = "block";
}
//  document.querySelector("#userFormOut").textContent +=  inp.name + " : " + inp.value + "\n" ;
//skriver ut skiten
function createPara(value){
    let para = document.createElement("P");
    para.innerHTML = value;
    document.querySelector("#userFormOut").appendChild(para);
}
//Behöver submita the formulär of HELL
function submitUser(event){
    let fieldsRequired = true;
    for(infield of inPuts){
        if(infield.type != "submit")
            inFieldValidate(infield);
        if(infield.value ==="")
        {
            fieldsRequired = false;
        }
    }
        //console.log(validateUser());
            if(fieldsRequired != false)
                createUserData();

       
       // formUser.hide();
    event.preventDefault();
}


//För väldigt långsamma webbläsare ;) 
window.addEventListener('load', (event) => {
    
    formUser.addEventListener("submit", submitUser);
    
    for(infield of inPuts){
        if(infield.type != "submit"){
           // console.log(infield);         
             infield.addEventListener('blur', (event)=> {
             event.target.style.background = '';
             event.target.style.height = "2rem";
             inFieldValidate(event.target);
              //console.log(event.target);               
            });
            infield.addEventListener('focus', function(event){
                event.target.style.background = 'pink';
                event.target.style.height = "3rem";       
            });
        }
    }

});

















//Test remove later


