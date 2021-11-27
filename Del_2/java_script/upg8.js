//Lite kul med Jquery igen 


$(document).ready(function(){
   $( "#jq-ani-2" ).toggle();
   $( "#jq-ani-3" ).toggle();

    //Kollar x och y postion i JQ Containern xD
   $("#jq-cont").click(function (e) {       
    let pos = $("#jq-cont").position();
    console.log("Left/x :" + e.clientX + "Top/y: " + e.clientY);
   });
    
    $( "#jq-ani-1" ).click(function() {


        $( "#jq-ani-1" ).animate({          
            marginLeft: '70%'
            }, {
             duration: 3000,
             complete: function(){  
                $("#jq-ani-1").fadeOut(2000);                 
                $("#jq-ani-2").fadeIn("slow", function() {
                    $('#jq-ani-2').animate({
                        top: '0%',
                        left: '30%',
                        opacity: "toggle"
                    }, { 
                        duration: 5000,
                        complete: function(){
                            $("#jq-ani-3").fadeIn();
                        }
                        }
                    
                    );
                
                });  

            } //time etc +  
        });  
    });

});