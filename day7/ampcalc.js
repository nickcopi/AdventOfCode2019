const Computer = require('./computer.js');
const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));

let results = [];
for(let phaseSignal = 0;phaseSignal < 5;phaseSignal++){
	results.push((new Computer([...program],[phaseSignal,0])).run())
}
console.log(results);
