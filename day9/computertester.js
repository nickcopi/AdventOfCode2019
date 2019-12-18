const Computer = require('./computer.js');
const fs = require('fs');
const program = fs.readFileSync('testinput').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const computer = new Computer(program,[5]);
console.log(computer.run());
