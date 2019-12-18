
const Computer = require('./computer');
const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const computer = new Computer([...program],[]);
const robot = (computer.run());
let count = 0;
robot.grid.forEach(line=>{
	line.forEach(square=>{
		if(square !== undefined)
			count++;
	});
});
console.log(count);


const drawLine = line=>{
	//console.log(line.slice(1000,line.length).map(square=>square?'#':'.').join(''));
	let str = '';
	for(let i = 1000;i<line.length+50;i++)
		str += line[i]?'#':'.';
	console.log(str);

}

robot.grid.forEach(line=>{
	if(line.length >0)
		drawLine(line);
});

