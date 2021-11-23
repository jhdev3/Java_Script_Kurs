//Upg6 
//Rövarspråket -> använda mig av DOM:)

function rovarSprak(input){
    let rovarText = "";
    const vokals = "aeiouyåäöAEIOUYÅÄÖ";
    for(let c of input)
    {
        if(vokals.search(c) != -1 || c == ' ')//returns -1 när den inte hittar :)
        {
            rovarText += c;
        }    
        else
        {
            rovarText += c+"o"+c;
        }
        //console.log(c);
        //console.log(rovarText);
    }
    console.log("Rövarspråket:");
    console.log(rovarText);
    return rovarText;
}


//Använda DOM 
function encodeRovar(event){
    let input = document.getElementById("encodeRovar").value;
    let output = document.getElementById("rovarOut");
    output.textContent +=  ` ${rovarSprak(input)}`;
    event.preventDefault();
}

const rovarForm = document.getElementById("rovarID123");
//console.log(rovarForm);
if(rovarForm != null){
    rovarForm.addEventListener("submit", encodeRovar);
}    


/* Document.querySelector() and Document.querySelectorAll() 
    istället för Element by ID etc :) 

*/