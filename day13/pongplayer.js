
const Computer = require('./computer');
const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const computer = new Computer([...program],[]);
const pong = (computer.run());
pong.parseOutput();
console.log(pong);
pong.render();
//let count = 0;
//pong.grid.forEach(line=>{
//	line.forEach(square=>{
//		if(square ===2) count++;
//	});
//});
//console.log(count);
