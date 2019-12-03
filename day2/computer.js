const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const tape = [];

program[1] = 12;
program[2] = 2;

//console.log(JSON.stringify(program));

const readTape = index=>{
	if(tape[index] === undefined) return 0;
	return tape[index];
}


for(let i = 0; i < program.length;i+=4){
	let input1 = program[i+1];
	let input2 = program[i+2];
	let input3 =program[i+3];
	//console.log(program[i])
	switch(program[i]){
		case 1:
			console.log(`Inserting sum of values at ${input1} and ${input2} into ${input3}`);
			program[input3] = program[input1]  + program[input2];
			break;
		case 2:
			console.log(`Inserting product of values at ${input1} and ${input2} into ${input3}`);
			program[input3] = program[input1] * program[input2];
			break;
		case 99:
			console.log(JSON.stringify(program));
			process.exit();
			break;
		default:
			console.error(`Unknown opcode: ${i}`);
			break;
	}
}

