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
    let a = 10
    console.log(a);
    for(let i =0;i <=10;i++){//Tar med mult med 0 Hör till ;) 
        
        for(n=1; n <=10;n++) //allt gånger 0 är ju noll xD
        {
            console.log(i+" * " + n + " = " + (i*n));

        }
    }
}

//Upg 3 gissa talet
//Prombt ger vialtion varning gör att det tar långt tid vid onclick. 
function guessTheNumber(){
    let answer = Math.floor(Math.random() * 100 + 1); //random generator 1-100  
    let maxGuess = 0; 
    let guessRight = false;
    let prombtText = "Gissa på ett tal mellan 1 - 100, du har 3 försök på dig"; 
    let guess;

    while(!guessRight && maxGuess < 3){
    
    guess=prompt(prombtText);
    ++maxGuess;    
    console.log( maxGuess);
    console.log( guess);


    console.log( answer + "   ");


    }
}

