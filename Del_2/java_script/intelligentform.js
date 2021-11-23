




/*
class TravelUser{
    
    constructor(){
        this.fullName = "";
        this.userEmail ="";
        this.userPhoneNr="";
        this.userAddres="";
    }
}
*/

/*
on load listner om jag vill ändra vissa element :). 
window.addEventListener('load', (event) => {
    console.log("window loaded");
    //createLabel(form, "fullName", "Fel format:");
});*/

//createLabel(form, "fullName", "Fel format:");


class User{ 

    constructor(){
        this.firstName = "";
        this.familyName = "";
        this.userEmail ="";
        this.userPhoneNr=0;
        this.userAddres={street: "", pnumer: 0, city: ""};
    }
    setfName(value)
    {
       // console.log(typeof value);
        let regex = new RegExp(/^(\p{L}){2,}$/iu); //unicode L=Alla Letters +namn och inga initialer + kollar dubbel namn.
        //Finns en bugg med mellanslag före eller efter bör hanteras om man ska söka i databaser etc.
        
        //console.log(regex.test(value));
        if(regex.test(value)){
            this.firstName = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
            //console.log(value);
            return true;
        }
        else
        {
            return false;
        }
    }
    setFamilyName(value)
    {
        console.log(typeof value);
        let regex = new RegExp(/^(\p{L}|\s){2,}$/iu); //unicode L=Alla Letters +namn och inga initialer + kollar inte dubbel namn.
            //Finns en bugg med mellanslag före eller efter bör hanteras om man ska söka i databaser etc.            
           // console.log(this.firstName.search(value));
            if(regex.test(value) & this.firstName.search(value) == -1)
            {
                this.familyName = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
                console.log(this.familyName );
                return true;
            }
            else
            {
                return false;
            }
    }   
}


function formatNames(name){
    let tempName;


}


function utPutCheck(field, check)
    {
        if(check)
        {
            field.style.border = '1px solid green';
            return true;
        }
        else
        {
            field.style.border = '1px solid red';
            return false;
        }
    }



function createLabel(form, input, text){
    let newlabel = document.createElement("Label");
    newlabel.setAttribute("for",input);
    newlabel.innerHTML = text;
    form.appendChild(newlabel);
}



let tuser = new User();

const form = document.querySelector("#rese_form");

const inputField = {
    fname: document.querySelector("#Fname"),
    lname: document.querySelector("#familyName")

};


const buttomUser = document.querySelector("#userDetailsButton");
buttomUser.onclick = function(){
    let userCheckArray =[];
    userCheckArray.push(utPutCheck(inputField.fname, tuser.setfName(inputField.fname.value)));
    //console.log(tuser.fullName);
    userCheckArray.push(utPutCheck(inputField.lname, tuser.setFamilyName(inputField.lname.value)));
    console.log(userCheckArray);

}


