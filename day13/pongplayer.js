
const Computer = require('./computer');
const fs = require('fs');
const readline = require('readline');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const computer = new Computer([...program],[]);
const pong = (computer.run());
pong.parseOutput();
//console.log(pong);
pong.render();
//let count = 0;
//pong.grid.forEach(line=>{
//	line.forEach(square=>{
//		if(square ===2) count++;
//	});
//});
//console.log(count);
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress',(str,key)=>{
	if (key.ctrl && key.name === 'c' || key.name === 'q') {
	   process.exit();
	 } else {
		 if(str === 'd'){
			 computer.addInput(1);
			 computer.run().render();
		 }
		 if(str === 'a'){
			 computer.addInput(-1);
			 computer.run().render();
		 }
		 if(str === 's'){
			 computer.addInput(0);
			 computer.run().render();
		 }
	 }
	
});

