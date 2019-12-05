const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const mainTape = [];
const input = [1];
const output = [];

//program[1] = 12;
//program[2] = 2;

//console.log(JSON.stringify(program));

const opCodeLookup = [];

class OpCode{
	constructor(argSize){
		this.argSize = argSize;
	}
}

class AddOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,tape){
		console.log(inputs);
		tape[inputs[2]] = inputs[0] + inputs[1];
	}
}
class MultiplyOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,tape){
		tape[inputs[2]] = inputs[0] * inputs[1];
	}
}

class InputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,tape){
		tape[inputs[0]] = input.shift();
	}
}

class OutputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,tape){
		output.push(tape[inputs[0]])
	}
}

class HaltOpCode extends OpCode{
	constructor(){
		super(0);
	}
	use(inputs,tape){
		console.log(output);
		process.exit();
	}
}

opCodeLookup[1] = new AddOpCode();
opCodeLookup[2] = new MultiplyOpCode();
opCodeLookup[3] = new InputOpCode();
opCodeLookup[4] = new OutputOpCode();
opCodeLookup[99] = new HaltOpCode();

const parseOpCode = opCode=>{
	opCode = [...String(opCode)];
	let code = Number(opCode.pop());
	if(opCode.length)
		code = Number(opCode.pop() + String(code));
	const argModes = [];
	while(opCode.length > 0)
		argModes.push(Number(opCode.pop()));
	if(!(code in opCodeLookup)){
		console.error(`Unknown opcode ${code}! Aborting.`);
		process.exit();
	}
	if(argModes.length > opCodeLookup[code].argSize){
		console.error(`Opcode provided modes for more inputs than it takes. ${argmodes} Aborting.`);
		process.exit();
	}
	while(argModes.length < opCodeLookup[code].argSize){
		argModes.push(0);
	}
	return {
		code,
		argModes
	}
}


let pointer = 0;
while(pointer < program.length){
	//console.log('pointer: ' + pointer);
	const opCode = parseOpCode(program[pointer]);
	//console.log(opCode);
	const codeInput = [];
	opCode.argModes.forEach((mode,i,arr)=>{
		if(i == arr.length-1) codeInput.push(program[pointer+i+1]);
		if(mode) codeInput.push(program[pointer+i+1]);
		else codeInput.push(program[program[pointer+i+1]]);
	});
	//console.log(codeInput);
	opCodeLookup[opCode.code].use(codeInput,program);
	pointer += opCodeLookup[opCode.code].argSize + 1;


}

