//Testar import export :)
let express = require("express");

let router = express.Router(); //Alla routes lagras i router utgår detta fall från root:)
//Read and write file lite klurigt men nice när man fick det att fungera :)
const { ReadFile, WriteFile } = require("./modules/readAndWrite");
const { Validate } = require("./modules/validateInputs");
//BodyParser
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // support json encoded bodies

router.get("/", (req, res) => {
  //console.log(__dirname + "/gbook.html");
  let jsonArray;
  const read = new ReadFile(__dirname + "/db/postStorage.txt");
  //console.log(read.getJsonObj());

  if (read.getJsonObj() != "") {
    jsonArray = JSON.parse(read.getJsonObj());
  } else {
    jsonArray = [];
  }
  /* Unit testting
  const objTest = {
    rating: "5",
    name: "Jacob Hedén",
    email: "enebyjacke@hotmail.com",
    review: "asd",
  };
  //console.log(jsonArray);
  //console.log(jsonArray.length);
  // {jsonArray: jsonArray}
*/
  res.render("gbook", { jsonArray: jsonArray }); //Sänder html filen

  console.log("Someone visited the page :)");
});

//Rendrar sidan sista jag gör

router.post("/api/rescension", (req, res) => {
  const write = new WriteFile();
  const validate = new Validate(
    req.body.rating,
    req.body.name,
    req.body.email,
    req.body.review
  );
  const validateArray = validate.validateArray();

  //-- Unit testing :)
  //console.log(req.body);
  //console.log(req.body.rating);
  //console.log(JSON.stringify(req.body));
  //console.log(req.body.review);
  // console.log(validateArray.every((element) => element.validate));
  //console.log(Object.keys(req.body).length);
  //console.log(req.body.rating); //Blir undefiend om inte checked ;) men det kollas också :)

  //Sista check eftersom post api/rescension är öppen för alla på nätverket ;) dvs kollar inte så de använder formuläret för att sicka data ;)
  if (Object.keys(req.body).length <= 4) {
    if (validateArray.every((element) => element.validate)) {
      //req.body.review = validate.convertEvilInputs(); //Behöver inte det där eftersom jag inte skriver till innerHTML eller sänder data utan hanterar bara textSträngar
      write.appendData(
        JSON.stringify(req.body),
        __dirname + "/db/postStorage.txt"
      );
      res.status(200).send("succses");
    } else {
      //Not acceptable reqstatus
      res.status(406).json(validateArray);
    }
  }
  res.status(400);
});

module.exports = router;

//
//    <script src="javascript/gbook.js"></script>

//Test för att kontrollera json saker :)
router.get("/allposts", (req, res) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
