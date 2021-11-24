//Upg7 ganska otydlig regExp på det sättet görs enklast i input fields pattern attribut det är html
//Hade varit bättre uppgift att söka eller ersätta något med regular expressions

/*
on load listner om jag vill skapa vissa element när sidan laddats :). 
window.addEventListener('load', (event) => {
    console.log("window loaded");
    //createLabel(form, "fullName", "Fel format:");
});
*/


function outPutCheck(field, check)
{
        if(check)
        {
            field.style.border = '1px solid green';
        }
        else
        {
            field.style.border = '1px solid red';
        }
}



function createLabel(form, input, text){
    let newlabel = document.createElement("Label");
    newlabel.setAttribute("for",input);
    newlabel.innerHTML = text;
    form.appendChild(newlabel);
}



//= value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();

function checkInput(regexp, inputselect){
    let check = regexp.test(inputselect.value);
    outPutCheck(inputselect, check);
    return check;
}


const inputFieldUser = {
    fname: document.querySelector("#Fname"),
    lname: document.querySelector("#familyName")

};

const regexpUser = {
    name: new RegExp(/^(\p{L}|\s){2,}$/iu)

};

const formUser = document.querySelector("#user_form");

function submitUser(event){
   

    
    const inPuts = formUser.querySelectorAll('input');
    //console.log(inPuts);
    for(inp of inPuts){

        if(inp.type != "submit")
        {
            document.querySelector("#userFormOut").textContent +=  inp.name + " : " + inp.value + "\n" ;
            //console.log(inp.value);
        }
    }

    event.preventDefault();
}




window.addEventListener('load', (event) => {
    
    

    //console.log("window loaded");
    //createLabel(form, "fullName", "Fel format:");

    formUser.addEventListener("submit", submitUser);   


});