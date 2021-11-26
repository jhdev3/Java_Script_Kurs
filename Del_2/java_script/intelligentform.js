/*Upg7 
Använder mig av JavaScript i så stor utsträckning som möjligt
En snyggare och bättre lössning är att kombinera CSS HTML OCH JAVASCRIPT
Tex använda input pattern attributet som RegularExpressions och sedan manipulera storlek text osv i script
*/

// som används för att validera varje input :) 
//Använder https://regexr.com/ för att testa osv
//email: kollar inte asb..asb@test.com  fick det inte riktigt att funkar tests: https://regexr.com/6ac2i :(
//+är lite hård på domän namn några som är korrekta släpps inte igenom.     
//Testar de flesta emails några rätt/fel kan slippa förbi ;) 
//säkert något jag missar :) 
//Använde inte password men kan enkelet göra RexEXp men varför ^^
//kan göra något sådant /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
const patterns = {
   firstName : new RegExp(/^(\p{L}|\s){2,}$/iu),//Förnamn och efternamn tillåter dubbelnamn samt alla olika bokstäver för alla språk:) 
   familyName : new RegExp(/^(\p{L}|\s){2,}$/iu),
   userEmail : new RegExp(/^([^\.][a-z0-9!#$%&'*\+\-\/=?^_`{|}~.]{1,63})[^\.]@{1}([a-z]{1})([a-z0-9\.-]*)([^-])\.([a-z]){2,8}$/i),
   teleNummer : new RegExp(/^\d{7,11}$/),//riktnummer etc 2-3 +Abonnentnummerlängd i svergie 5-8 siffor
   userGAddress : new RegExp(/^[a-ö ]+\s\d{1,4}$/i),
   userPostnummer : new RegExp(/^\d{3}(\s?)\d{2}$/), //space om man vill eller inte för att vara snäll
   city : new RegExp(/^[a-ö -]{2,}$/i), //tror det räcker för svergie max-min längd går att ändra
   date : new RegExp(/(\d{4})-(\d{2})-(\d{2})/), 
};

const formUser = document.querySelector("#user_form"); //Save som time
const inPuts = formUser.querySelectorAll('input');
const reseBooking = document.querySelector("#bookTravel");
const travelForm = document.querySelector("#bookTravel");
const homeInput = document.querySelector("#hemReseDatum");
const awayInput = document.querySelector("#avReseDatum");
const travelCity = document.querySelector("#resOrt");

//Notiferar vid felinmattning :) 
//Kan lägga Formatet i input Class eller titel för varje input och seden sätta det som Custom texten men inte lika kul
function inFieldValidate(field)
{
    field.setCustomValidity("");//Måste rensa för uppdatering
     if(patterns[field.name].test(field.value))
        {
          //  console.log(field.value);

            field.style.border = '1px solid green';
            field.validity.valid = true;
        }
        else
        {
            field.validity.valid = false;
            field.setCustomValidity("Fel format din idiot ;)");
            field.style.border = '1px solid red';
        }
}
//console.log(inPuts); //Grymt att se vad InputFieldsen har för saker att erbjuda :) 

// submita the formulär of HELL när jag validerar fälten sätter jag valid använder mig av att fromulär har egenskapen att kolla vid det vid submit;)
function submitUser(event){
    let fieldsRequired = true;
    for(infield of inPuts){
        if(infield.type != "submit"){
            inFieldValidate(infield);
            if(infield.value =="")
            {
                infield.setCustomValidity("Får inte vara tomt");
                infield.validity.value = false;
                fieldsRequired = false;
            }
        }
    }       
    if(fieldsRequired != false){
                formUser.style.display = "none";
                reseBooking.style.display = "block";
            }
       // formUser.hide();
    event.preventDefault();
}

//ReseBokningen --- To were ever you wanna go :) 
//Sista Kontrollen för att Resan ska kunna Genomföras xD :) 
//Typ empty form osv och kollar för Åsnor

function validateDonkeyCheck(){
    let homeDate = homeInput.value;
    let awayDate = awayInput.value;
    let arrayHome = homeDate.match(patterns.date);
    let arrayAway = awayDate.match(patterns.date);
    //console.log(arrayHome + " + " + arrayAway);
    if(arrayAway == null)
        return false;
    if(arrayHome == null){
       // createPara("Enkel biljett");
        return true;
    }
    for(let i = 1; i < arrayAway.length; i++)
    {
            if(Number(arrayHome[i]) < Number(arrayAway[i]))
                return false;
    }
  //  console.log(arrayHome + " + " + arrayAway);

    return true;   
}

function homeOut(){
    if(homeInput.value === "" ) 
      return "Enkel biljett"
    else
        return homeInput.id + ":=" + homeInput.value; 
}
//Skapar User data när formuläret är validerat xD
function createUserData(){ 
    let textOut = "";       
    textOut = travelCity.id + ":=" + travelCity.value; 
    createPara(textOut);
    textOut = awayInput.id + ":=" + awayInput.value; 
    createPara(textOut);
    //console.log(homeOut());
    createPara(homeOut());
    for(let i = 0; i < 7; i++){ //kör inte submit
        textOut = inPuts[i].id + ":=" + inPuts[i].value; 
        createPara(textOut);
    }     
    document.querySelector("#userFormOut").style.display = "block";
}
//  document.querySelector("#userFormOut").textContent +=  inp.name + " : " + inp.value + "\n" ;
//skriver ut skiten
function createPara(text){
    let para = document.createElement("P");
    para.innerHTML = text;
    document.querySelector("#userFormOut").appendChild(para);
}


function submitTravel(event){
  
    if(validateDonkeyCheck() && patterns[travelCity.name].test(travelCity.value)){
        reseBooking.style.display = "none";    
        createUserData();
    }
    else{
        console.log("Nice Job trying to submit empty form or doing some donkey shit");
        alert("Glömt något? ");
    }
    event.preventDefault();
}

function getTodaysDate(){
    let today = new Date(); //Setting som boundries xD
    let fullDateISO = today.toISOString();
    //console.log(fullDateISO.substr(0, fullDateISO.search("T")));
    return fullDateISO.substr(0, fullDateISO.search("T"));
}
//För väldigt långsamma webbläsare ;) 
window.addEventListener('load', (event) => {
    
    
    awayInput.min = getTodaysDate();  


    formUser.addEventListener("submit", submitUser);
    //Sätter upp eventListners UserForm:)    
    for(infield of inPuts){
        if(infield.type != "submit"){                 
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
    travelForm.addEventListener("submit",submitTravel );
    //sätter lite kontroller men måste endå kontrollera 
    travelCity.addEventListener('blur', (e) => {

        inFieldValidate(e.target);
    });


   awayInput.addEventListener('blur', (e) => {
        //console.log(awayInput.value + " Test");
        homeInput.min = awayInput.value;
        inFieldValidate(awayInput);
        //Går fortfarande att ändra datum "manuellet" så vi får kolla en till om det kommer någon dum Åsna som försöker använda formuläret till Evil things 
        if(e.target.validity.valid == false){
            e.target.setCustomValidity("Vad försöker du göra din Åsna ? ;)");
            e.target.style.border = '1px solid red';
        }
   });
    homeInput.addEventListener('blur', (e) => {
        //Kollar först sin input så den matchar
        //För att kolla attributsen console.log(homeInput.validity);
        if(validateDonkeyCheck()){
            e.target.setCustomValidity("");
            e.target.validity.valid = true;

            e.target.style.border = '1px solid green';
        }
        else{
            e.target.validity.valid = false;
            e.target.setCustomValidity("Kan inte resa hem innan du rest ;)");
            e.target.style.border = '1px solid red';

        }

    });    
});

