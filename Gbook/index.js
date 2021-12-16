//Server Script
/*
const http = require("http");
const server = http.createServer(app);

*/
//Installed Pakackge express
//Installed ejs för templete engine
const express = require("express");
const app = express();
let port = process.env.PORT || 2000;


let routes = require("./routes");
app.use(express.static(__dirname + "/public"));

//View engine Defaoult letar views i view folder xD Great 
app.set("view engine", "ejs");

app.use("/", routes);

let server = app.listen(port); //port 2000
console.log("Live på localholst:2000");

//console.log(process.pid);
//process.kill(process.pid, "SIGINT") == //Windows ctrl+c
//Close webserver på ett snyggt sätt.
process.on("SIGINT", () => {
  console.debug("SIGTERM signal received: closing HTTP server gestbook");
  server.close(() => {
    console.debug("HTTP server gestbook closed");
  });
});

//server.use(express.static("mappnamn"));  //göra andra filer tillgänglig till servern.
//set DEBUG=express:* & node index.js; till envierment variabel om du vill se debug(messeges :)
