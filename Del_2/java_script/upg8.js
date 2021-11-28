//Lite kul med Jquery igen 
//bredd /höjd på valdo
let valdoW = 75;
let valdoH = 75;

function reloadPage(){
    window.location.reload();
}




$(document).ready(function(){

 $( "#jq-ani-2" ).toggle();
 $( "#jq-ani-3" ).toggle();
 
 console.log("TipsWaldo Måste trycka på Waldo ;)" );
 //Math borde göra lite mer beräkningar men det är finjusteringar   
let x = Math.floor(Math.random() * 1000 + valdoW);
console.log("Tips x led: "+ x );
let y = Math.floor(Math.random() * 700 + 1); //cont start runt 175 pixlar bot är 
let contPosistion = $("#jq-cont").position();
//console.log(contPosistion.left); 
//console.log(contPosistion.top);

while(contPosistion.top < y   && y > 200 ) // Hamnade utanför containern ibland främst y kord händer kanske fort ibland men mer sällan :) 
{
    y = Math.floor(Math.random() * 750 + 210);
}

console.log("Tips y led: "+ y);
//Blir lite fel då jag har andra objekt / divs i samma conteiner borde göra find valdo i egen konteiner och sida
$( "#jq-cont" ).append( `<div class="waldo" style="left: ${x}px; top: ${y}px;"></div>`); //Randomizera ut valdo
//$( "#jq-cont" ).append( `<div class="waldo" style="left: 950px; top: 667px;"></div>`); //Dålig på att hitta ? :)

/*
för att felsöka blir fel kanske 5%-10% av laddningarna :) men kör man i egen tom sida och absolut postion så blir allt enklare xD
Det är relative postion som gör allt krångligt ;)
let pos = $(".waldo").position();
console.log(pos.left); 
console.log(pos.top);
*/

$(".waldo").click(function () { 
    console.log("You found Waldo");
    $(".waldo").css("background-image", "url(images/waldo.png)");

    $(".waldo").animate({width:"150px", height: "200px", "top":"-=200px"},2000);   
             

});
   
    //Kollar x och y postion i JQ Containern xD
  $("#jq-cont").click(function (e) {       
     console.log("/x :" + e.clientX + "y: " + e.clientY);
    //console.log(typeof e.clientX);

   }); 

   //Drop down menu använder hover och slidedown samt upp :) Stop behövs för att stopa animation kön xD ifall något redan körsa vid snabb hover:) 
   $(".menu_mouse").hover(function(){
        $("#dropDownMenu", this ).stop().slideDown(200);
      }, function() {
        $("#dropDownMenu", this).stop().slideUp(200);
      }
    );
    



   //Boll Animation etc etc
    //Gäller att ha koll på () { } xD Men Kul att testa komplete step osv :) 
    $( "#jq-ani-1" ).click(function() {

        $( "#jq-ani-1" ).animate({          
            marginLeft: '75%'
            }, {
             duration: 3000,
             complete: function(){  
                $("#jq-ani-1").animate({width:'0%'},2000);                
                $("#jq-ani-2").fadeIn(3000, function() {
                    $('#jq-ani-2').animate({
                        "top": '-=250px',
                        left: '40%',
                        opacity: "toggle"
                    }, { 
                        duration: 5000,
                        complete: function(){
                            $("#jq-ani-3").fadeIn(2000);
                        }
                        }                    
                    );
                
                });  

            } //time etc +  
        });  
    });

});