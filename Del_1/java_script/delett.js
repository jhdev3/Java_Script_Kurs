//inlämning delett

//Upg 1
function firstTenSquare(){
    for(let i=1; i <=10;i++){
        //onödig typ omvandling eftersom for loopen redan vet att det är ett number ;) kvar to prove a point ;) 
        console.log(i+ " * " + i +" = " + Number(i)* Number(i));  

    }
}
//Upg 2 nästlade loop 0 - 10 multiplikationstabell; 
function multiplicationTable(){ //Kan välja vilken mult tabell ;) för utveckling 
   
    for(let i =0;i <=10;i++){//Tar med mult med 0 Hör till ;) 
        
        for(n=1; n <=10;n++) //allt gånger 0 är ju noll xD
        {
            console.log(i+" * " + n + " = " + (i*n));

        }
    }
}

//Upg 3 gissa talet
//Prombt ger vialtion varning gör att det tar långt tid vid onclick på grund av prombt. 
//Violation varningen fixas i upg 6 :) 
function guessTheNumber(){
    let answer = Math.floor(Math.random() * 100 + 1); //random generator 1-100  
    let maxGuess = 0; 
    let guessRight = false;
    let prombtText = "Gissa på ett tal mellan 1 - 100, du har 3 försök på dig"; 
    let guess;
    while(!guessRight && maxGuess < 3){
        
        guess=prompt(prombtText);

        if(guess==answer)
        {
            guessRight = true;
        }
        else if(guess > answer )
        {
            prombtText =  guess + " gissa på ett mindre tal ;) Gissningar kvar: " + (2 - maxGuess); 
            console.log( "mindre");

        } 
        else
        {
            prombtText =  guess + " gissa på ett större tal ;) Gissningar kvar:  " + (2 - maxGuess); 
            console.log( "större");
        }
        ++maxGuess;  
    }
    

    if(guessRight)
        alert("Grattis du gissade rätt");
    else
        alert("Tyvärr försök igen talet var: " + answer);
}

//Upg4 
//Rövarspråket

function rovarSprak(){

    let promptInput = prompt("Skriv något du vill ha översatt till rövarspråket :)");
    let rovarText = "";//typ bestämmer variabeln till en sträng. 
    const vokals = "aeiouyåäöAEIOUYÅÄÖ"; //Går att lägga mellanslag här också om man vill så behvös det inte i if satsen
    console.log(promptInput);

    for(let c of promptInput)
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
    alert(rovarText);
}