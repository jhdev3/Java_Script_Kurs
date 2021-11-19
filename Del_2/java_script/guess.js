//inlämning del två
//Upg 6 gissa talet
//guessObj objekt med lite olika typer av funktioner tex reset factorial osv. 

//borde göra det som en class med konstruktor men går att göra det på andra sätt med
//Javascript är dynamiskt

//object litural inte så bra praxis eftersom jag har flera funktioner Alla varibeler är synliga hela tiden, not good ;) 

//göra det till ett "objekt" utan class lägger jag det i en funktion
//Med stor bokstav blir det "en konstruktor"
/*
function GuessObj(){
    sedan variabler
    +funktioner. etc
    och använda this."name" = funktion eller variabel osv.
}*/
//Skapa sedan objektet genom let obj = new GuessObj();   :) 

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


//Jquery 
//Körs bara när documentet dvs hemsidan har laddat klart :) Bonus att läga scripten längst ner i bodyn ;) 
//Dock behövs det inte då skripten körs vid "onklick events" dvs form och input type måste laddas in för ett ens kunna trycka på knapparna.
$(document).ready(function(){


    $("#guessID123").submit(function (e) {  //e = event 

        if(!guessObj.right)  
            guessObj.guessNumber($("#guessNumber").val());
       //console.log( guessObj.answer);
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




