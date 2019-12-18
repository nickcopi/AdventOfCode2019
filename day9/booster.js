const Computer = require('./computer');
const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
//const program = '104,1125899906842624,99'.replace('\n','').split(',').map(instruction=>Number(instruction));


const computer = new Computer([...program],[1]);
console.log(computer.run());
