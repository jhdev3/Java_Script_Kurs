//inlämning del två

//Upg 6 gissa talet

const guessObj = {
     answer:  Math.floor(Math.random() * 100 + 1), 
     right: false,
     text: "Gissa på ett tal mellan 1 - 100", 
     numberOfattempts: 0,
     reset(){
        this.answer =Math.floor(Math.random() * 100 + 1);
        this.right= false;
        this.text="Gissa på ett tal mellan 1 - 100";
        this.numberOfattempts="0";
     },
     guessNumber: function(guess){
        if(guess==guessObj.answer)
        {
            guessObj.right = true;
            guessObj.text = "Grattis du gissade rätt";
        }
        else if(guess > guessObj.answer )
        {
            guessObj.text = "Gissa på ett mindre tal";
            console.log( "mindre");
        } 
        else
        {
            guessObj.text = "Gissa på ett större tal";
            console.log( "större");
        }
        ++guessObj.numberOfattempts;  
     }
  };


//Upg6 
//Rövarspråket -> använda mig av DOM:)
//-> Utveckling om man vill kolla pormptInput så det inte är en siffra just nu funkar det som en konsonant:) 
function rovarSprak(input){

    let rovarText = "";//typ bestämmer variabeln till en sträng. 
    const vokals = "aeiouyåäöAEIOUYÅÄÖ"; //Går att lägga mellanslag här också om man vill så behvös det inte i if satsen
    console.log(promptInput);

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
}

//Jquery 
//Körs bara när documentet dvs hemsidan har laddat klart :) Bonus att läga scripten längst ner i bodyn ;) 
$(document).ready(function(){

    
    $("#guessID123").submit(function (e) {  //e = event 

        if(!guessObj.right)  
            guessObj.guessNumber($("#guessNumber").val());
       console.log( guessObj.answer);
       // console.log(guessObj.right);
       $("#attempts").text(`Försök: ${guessObj.numberOfattempts}`).show();
       $("#tips").text(guessObj.text).show();
      
       if(!guessObj.right)
          $("#tips").css("background-color", "rgba(230, 49, 49, 0.514)"); //röd
        else
        {
           $("#tips").css("background-color", "rgb(77, 207, 77)"); //grön
           $( "#reset_guess" ).toggle();        
        }
      e.preventDefault();//Så att inte form event triggas normalt sickas form till en annan sida

    }); 
    
    $("#reset_guess").click(function() {
        guessObj.reset();
        $("#attempts").text(`Försök: ${guessObj.numberOfattempts}`).show();
        $("#tips").text(guessObj.text).show();
        $("#tips").css("background-color", "white"); 
        $( "#reset_guess" ).toggle();        
    });
  });





  //Fun tests 
    /*
    $("p").hover(function(){

        $(this).text("Hover test");
    
    }, function(){
        $(this).css("border", "5px solid black");
    });*/ 