/*
    Smartaste sättet att göra birthdat är new Date(bdate) har massa inbygdae funktioner för year etc
    men gör så här för att öva på att göra en class samt gör bara det attributet till person + en till construktor


*/
console.log("Upgift 5 hoppas det räcker :)");
class Person {
    constructor(namn, bdate) {
        let divide = bdate.split('-');
        this.name = namn;
        this.bdate = {year : Number(divide[0]), month : Number(divide[1]), day : Number( divide[2])};
    }
    get birthYear(){ return this.bdate.year;}
    get birthMonth(){ return this.bdate.month;}
    get birthDay(){ return this.bdate.day;}
    get birthDate(){//Bara för att :) få tillbaka en sträng kan skapa ett Date objekt från den om man vill   
        let day ="";
        let month ="";
        if(this.bdate.day < 10)
            day = "0"+this.bdate.day;
        else
            day = this.bdate.day;
        if(this.bdate.month < 10)
            month = "0"+ this.bdate.month;
        else
            month = this.bdate.month;

        return this.bdate.year + "-" + month + "-" + day;    
     }
     //Month integer 0-11 Kul xD
     //Sätter age som en metod istället xD
      age(){
        let todayDate = new Date();
       // console.dir( todayDate); Kolla lite egenskaper xD
       // console.log(todayDate.getMonth() + "Day " + todayDate.getUTCDate());
        if(this.birthMonth > (todayDate.getMonth() +1)){
            return  todayDate.getFullYear() - this.birthYear -1;
        }
        else if(this.birthMonth == (todayDate.getMonth()+1) && this.birthDay > todayDate.getUTCDate())
         {     
        return  todayDate.getFullYear() - this.birthYear -1;
        }
        else{
            return todayDate.getFullYear() - this.birthYear; 
        }
     }


}
//Skapar den roliga studen klassen som "typ ärver en person xD" = Derived class :)
class Student extends Person {  // "subklassen" Student ärver "superklassen" Person
    
    constructor(personName, personBdate, skola) { //Nackdelen med den här construktorn är att vi måste skapa en person före en student. Går inte bara lägga in name som på föreläsningen men det är logiskt
        // när vi skapar en Student så skapar vi en Person, eftersom varje Student också är en Person
        super(personName, personBdate);    // anropar superklassens konstruktor med nyckelordet super
        this.school = skola;
        let emptyArray = [];
        this.courseArray = emptyArray;
    }
    studera = function() {
        console.log(this.name + " sitter och pluggar.");
    }
    course(kurs, betyg){
        this.courseArray.push({course : kurs, grade : betyg}); // Skapar ett kurs objekt måste räknas som 3 variabler i upgiften + arrayen
    }
    courses(){
        return this.courseArray;
    }
    findCourse(c){
        if(this.courseArray.length == 0)
            return "Har inte läst någon kurs dags att sätta igång om du ska vara en student ???";

        const result = this.courseArray.find( ({course}) => course === c); //Samma typ vilket retunerar true och ger då tbx det elementet find metoden för array.
            
        if (result === undefined){
            return "Nix" + this.name + " har inte läst den kursen ";
        }

        return "ja den kursen: " + result.course + " har " + this.name + " läst med betyget " + result.grade;
    }
}

// anropar konstruktorn med nyckelordet new plus namnet på klasse
let h = new Person("Elsa", "2019-12-30");
let a = new Person("Jacob","1989-03-13");
let t = new Person("Testa Ålder func :)","1989-11-27"); //ändra dag/månad för att testa age funktionen KUL JUL
console.log(h); // Person {namn: "Holger"}
console.log(a);
console.log(a.name +"  " + a.bdate.day);
console.log(h.name + " födelse år" + h.bdate.year);
console.log(a.name + " Födelse med get: " + a.birthYear); //Skillnaden på get sparar lite space ;)
console.log(a.name + " " + a.birthDate);
console.log(a.name +" Ålder" +a.age());
console.log(h.name + " Ålder "+ h.age());
console.log(t.name +" " +t.age());


 h = new Student(h.name, h.birthDate, "SolRosens Skola För Super Begåvade Barn"); // nu är elsa en person och en student :) 
console.log(h);
console.log(h.age() + " Födelseår " + h.birthDate); // kan använda sig av SuperKlassens funktioner metoder etc:) 

h.course("Måla Katter", "VG");
console.log(h.courses()); //Lista av alla kurser
console.log(h.courses()[0]); //Tog första elementet jag skapade :)
console.log(h.courses()[0].grade); //Tog betyget etc etc xD
//Skapar några stycken saker 
h.course("Måla Mös", "G");
h.course("Bamsegympa", "VG");
h.course("Klättra träd", "VG");
h.course("Bada", "VG"); 

console.log("Har Elsa läst kursen Bamsegympa? " );
console.log(h.findCourse("Bamsegympa"));
console.log("Har " + h.name + " läst kursen FiskdamAvancerad? " );
console.log(h.findCourse("FiskdamAvancerad"));

console.log(h instanceof Person);   // true - h är en Student och följaktligen en Person
console.log(h instanceof Student);  // true - h är en Student
console.log(a instanceof Student);  // false - a är inte en Student


let gustav = new Student ("gustav", "1988-02-03", "TUC");
//Nu blir gustav både en person och en Student Coolt han levde under radarn innan han blev en student ;) 
console.log(gustav instanceof Student);  // true - h är en Student
console.log(gustav instanceof Person);   // true - h är en Student och följaktligen en Person


console.log("Upgift 5 Slut klasser i Javascript är kul och kan skrivas på så många olika sätt men allt i javascript känns som objekt ;) ");