//inlämning del två

//Upg 6 gissa talet

let guess = {
     answer:  0, 
     maxGuess: 0,
     guessRight: false,
     prombtText: "Gissa på ett tal mellan 1 - 100, du har 3 försök på dig", 
     guess: 0,
  };


  function test()
  {
    guess.answer = Math.floor(Math.random() * 100 + 1);
    guessTheNumber(guess);
  }
//Använda mig a jQuery
//Violation varningen fixas i upg 6 :) 
function guessTheNumber(obj){
    
    while(!obj.guessRight && obj.maxGuess < 3){
        obj.guess=prompt(obj.prombtText);

        if(obj.guess==obj.answer)
        {
            obj.guessRight = true;
        }
        else if(obj.guess > obj.answer )
        {
            obj.prombtText =  obj.guess + " gissa på ett mindre tal ;) Gissningar kvar: " + (2 - obj.maxGuess); 
            console.log( "mindre");

        } 
        else
        {
            prombtText =  guess + " gissa på ett större tal ;) Gissningar kvar:  " + (2 - obj.maxGuess); 
            console.log( "större");
        }
        ++obj.maxGuess;  
    }
    

    if(obj.guessRight)
        alert("Grattis du gissade rätt");
    else
        alert("Tyvärr försök igen talet var: " + obj.answer);
}
//Upg6 
//Rövarspråket -> använda mig av DOM:)
//-> Utveckling om man vill kolla pormptInput så det inte är en siffra just nu funkar det som en konsonant:) 
function rovarSprak(){

    let promptInput = "";
    promptInput = prompt("Skriv något du vill ha översatt till rövarspråket :)");
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

//Jquery 
//Körs bara när documentet dvs hemsidan har laddat klart :) Bonus att läga scripten längst ner i bodyn ;) 
$(document).ready(function(){




    //Fun tests 
    $("p").hover(function(){

        $(this).text("Hover test");
    
    }, function(){
        $(this).css("border", "5px solid black");
    });
  });





