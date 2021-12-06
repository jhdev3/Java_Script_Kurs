//Testar import export :)
let express = require("express");

let router = express.Router(); //Alla routes lagras i router utgår detta fall från root:)
//Read and write file lite klurigt men nice när man fick det att fungera :)
const { ReadFile, WriteFile } = require("./modules/readAndWrite");

//BodyParser
let bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // support json encoded bodies

router.get("/", (req, res) => {
  //console.log(__dirname + "/gbook.html");
  res.sendFile(__dirname + "/gbook.html"); //Sänder html filen

  console.log("Iam on Startpage");
});

//Rendrar sidan sista jag gör

router.post("/api/rescension", (req, res) => {
  const write = new WriteFile();
  //console.log(req.body);
  //console.log(req.body.rating);
  //console.log(JSON.stringify(req.body));

  write.appendData(JSON.stringify(req.body), __dirname + "/db/postStorage.txt");
  res.status(200).send("succses");
});
//Test för att kontrollera json saker :)
router.get("/allposts", (req, res) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

module.exports = router;

//
//    <script src="javascript/gbook.js"></script>
