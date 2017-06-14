var Promise = require('bluebird');
var prompt = require('prompt');
var fs = require('fs');

Promise.promisifyAll(prompt);
Promise.promisifyAll(fs);


class RandomNumberPrompt {
  constructor() {
    this.getNumber();
  }

  getNumber() {
    
    let numberSchema = [
      {name: 'number', description: 'Please enter an number', type: 'integer'}
    ];


    prompt.getAsync(numberSchema)
      .then(result => {
        let {number} = result;
        let randomNum = Math.floor(Math.random() * 10);
        let message = `Your number was: ${number}\nA random number is: ${randomNum}\nThese numbers added together is: ${number + randomNum}`;
        console.log(message);
        return prompt.getAsync(numberSchema);
      })
      .then(result => {
        let {number} = result;
        console.log(`Second number entered: ${number}`);
      })
      .catch(err => {
        console.error(err);
      });

  }

  readFile() {
    
    fs.readFileAsync(__dirname + '/text.txt', 'utf8')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}

var randomNumberPrompt = new RandomNumberPrompt();
// randomNumberPrompt.readFile();

// prompt.getAsync(['firstName', 'lastName'])
//   .then(result => {
//     let {firstName, lastName} = result;
//     let fullName = `${firstName} ${lastName}`;
//     console.log(fullName);
//   })
//   .catch(err => {
//     console.error(err);
//   });