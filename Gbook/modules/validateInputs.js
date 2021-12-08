const patterns = {
  name: new RegExp(/^(\p{L}|\s){2,}$/iu), //Förnamn och efternamn tillåter dubbelnamn samt alla olika bokstäver för alla språk:)
  email: new RegExp(
    /^([^\.][a-z0-9!#$%&'*\+\-\/=?^_`{|}~.]{1,63})[^\.]@{1}([a-z]{1})([a-z0-9\.-]*)([^-])\.([a-z]){2,8}$/i
  ),
};

/* 
Validerar inputs från post


Går att optimisera lite genom att bara ha this.validate array istället för ratings osv men men xD 
*/

class Validate {
  constructor(rating, name, email, text) {
    this.rating = rating;
    this.name = name;
    this.email = email;
    this.text = text;
  }
  //Private functions :)
  #validateNameInput() {
    if (patterns.name.test(this.name) || this.name == "") {
      return { validate: true, name: this.name };
    } else {
      return {
        validate: false,
        name: "Tillåter bara bokstäver och mellanslag ;)",
      };
    }
  }
  #validateEmailInput() {
    if (patterns.email.test(this.email) || this.email == "") {
      return { validate: true, email: this.email };
    } else {
      return { validate: false, email: "Felaktig email address" };
    }
  }
  #validateRating() {
    //check alsoe for undefined :)
    if (isNaN(this.rating)) {
      return { validate: false, rating: "Inte valt ett  nummer!" };
    } else if (Number(this.rating) >= 1 && Number(this.rating) <= 5) {
      return { validate: true, rating: this.rating };
    } else {
      return {
        validate: false,
        rating: "Vad försöker du göra? :)",
      };
    }
  }
  convertEvilInputs() {
    let convertBadchars = this.text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    return convertBadchars;
  }
  validateArray() {
    let validate = [
      this.#validateRating(),
      this.#validateNameInput(),
      this.#validateEmailInput(),
    ];
    return validate;
  }
}

//const test = new Validate("1", "Jacob Hedén", "jacob@bajs.com", "&<BajASD>");
//console.log(test.validateArray());

/* Unit testing
console.log(test.convertEvilInputs());
console.log(test.validateEmailInput());
console.log(test.validateNameInput());
console.log(test.validateRating());
*/
module.exports.Validate = Validate;
