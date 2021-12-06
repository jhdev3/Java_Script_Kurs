let fileSystem = require("fs");

//Blir filen för stor är det bättre att använda Streams
//Dvs då kan chunks of data sändas i omgångar :)
//eller så byter man eller gör en ny textfil vill kanske vissa de nyaste posterna endå eller de med högst rating;)

//fs.readFileSync() read the full content of the file in memory before returning the data.
//Passar bra för deta enda mål
//Enda jag måste se till är att filen finns och existerar samt att jag har access:)

class ReadFile {
  constructor(file) {
    const data = fileSystem.readFileSync(file, "utf8");

    this.getJsonObj = function () {
      //Kolla EmptyDocument :)
      if (data == "") {
        console.log("emptyDocument");
        return "";
      } else {
        let jsonobj = data.substring(1); //Tar bort första ,
        return "[" + jsonobj + "]"; //Skapar jsonArrayen
      }
    };
  }
}

class WriteFile {
  constructor() {
    this.appendData = function (data, path) {
      const jsonobj = "," + data; //sätter komma först
      fileSystem.appendFile(path, jsonobj, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Appened Succesfully data");
      });
    };

    this.clearFileNewData = function (data, path) {
      const jsonobj = "," + data; //behöver komma innan för att läsa en json array från en jävla textfil
      fileSystem.writeFile(path, jsonobj, { flag: "w+" }, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Write Succesfully data");
      });
    };
  }
}

module.exports.ReadFile = ReadFile;
module.exports.WriteFile = WriteFile;

//console.log(a);
//console.log(JSON.parse(a));
//appendData(a);
//clearFileNewData(a);

/*
const h = new RwFile();
console.log(typeof h.getJsonObj());
console.log(h.getJsonObj());

let parse = JSON.parse(h.getJsonObj());
console.log(parse);
console.log(
  JSON.parse(
    '{"rating":"5","name":"Jacob Hedén","email":"enebyjacke@hotmail.com","review":"asd"}'
  )
);
*/

//console.log(JSON.stringify(h.getJsonObj()));
//console.log(typeof JSON.parse(h.getJsonObj()));
//let b = JSON.parse(h.getJsonObj());
//console.log(b);

//console.log(JSON.parse(h.data));

/*
  Kolla acces före read kan vara något att implementera :)
  fileSystem.access(file, fileSystem.constants.R_OK, (err) => {
    console.log("check read premission");
    if (err) {
      console.error("No read access");
    }

    console.log(" read access + readfromfile :)");
  }); 
*/

/* Intressanta saker som går att göra :): 

fs.watchFile(): start watching for changes on a file. Related: fs.watch()
dvs kan kolla om filen ändrats och sen göra en ny read efter det om man vill :)
*/
