//const fs = require('fs');
//const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const mainTape = [];
const input = [0,0];
const output = [];

//program[1] = 12;
//program[2] = 2;

//console.log(JSON.stringify(program));





const opCodeLookup = [];

const readFromMode = (mode,input,computer)=>{
	switch(mode){
		case 0:
			return dereference(input,computer.program);
		case 1:
			return input;
		case 2:
			return dereference(computer.base + input,computer.program);
	}
}

class OpCode{
	constructor(argSize){
		this.argSize = argSize;
	}
	adjustPointer(pointer){
		return pointer + this.argSize + 1;
	}
}

class AddOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		computer.program[inputs[2]] = input1 + input2;
		return this.adjustPointer(computer.pointer);
	}
}
class MultiplyOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		computer.program[inputs[2]] = input1 * input2;
		return this.adjustPointer(computer.pointer);
	}
}

class InputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,computer,modes){
		let result = computer.input.shift();
		//let input1 = readFromMode(modes[0],inputs[0],computer);
		let input1 = inputs[0];
		//if(modes[0] === 2) input1 += computer.base;
		/*while(result === undefined){
			result = computer.input.shift();
		}*/
		computer.program[input1] = result;
		return this.adjustPointer(computer.pointer);
	}
}

class OutputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		//console.log(computer.program[inputs[0]]);
		computer.output.push(input1)
		computer.observers.forEach(observer=>{
			observer.addInput(computer.program[input1]);
		});
		return this.adjustPointer(computer.pointer);
	}
}

class HaltOpCode extends OpCode{
	constructor(){
		super(0);
	}
	use(inputs,computer){
		//console.log(output);
		//process.exit();
		computer.halted = true;
		return computer.pointer;
	}
}

class JumpTrueOpCode extends OpCode{
	constructor(){
		super(2);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		if(input1) return input2;
		return this.adjustPointer(computer.pointer);
	}
}

class JumpFalseOpCode extends OpCode{
	constructor(){
		super(2);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		if(!input1) return input2;
		return this.adjustPointer(computer.pointer);
	}
}

class LessThanOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		computer.program[inputs[2]] = (input1 < input2)?1:0;
		return this.adjustPointer(computer.pointer);
	}
}
class EqualsOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		let input2 = readFromMode(modes[1],inputs[1],computer);
		computer.program[inputs[2]] = (input1 === input2)?1:0;
		return this.adjustPointer(computer.pointer);
	}
}
class BaseOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,computer,modes){
		let input1 = readFromMode(modes[0],inputs[0],computer);
		computer.base += input1;
		return this.adjustPointer(computer.pointer);
	}
}

opCodeLookup[1] = new AddOpCode();
opCodeLookup[2] = new MultiplyOpCode();
opCodeLookup[3] = new InputOpCode();
opCodeLookup[4] = new OutputOpCode();
opCodeLookup[5] = new JumpTrueOpCode();
opCodeLookup[6] = new JumpFalseOpCode();
opCodeLookup[7] = new LessThanOpCode();
opCodeLookup[8] = new EqualsOpCode();
opCodeLookup[9] = new BaseOpCode();
opCodeLookup[99] = new HaltOpCode();


const dereference = (position,tape)=>{
	if(tape[position] === undefined) return 0;
	else return tape[position];
}

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

class Computer{
	constructor(program,input){
		this.program = program;
		this.input = input;
		this.pointer = 0;
		this.base = 0;
		this.output = [];
		this.observers = [];
		this.halted = false;
	}
	async run(){
		while(!this.halted){
			const opCode = parseOpCode(this.program[this.pointer]);
			const codeInput = [];
			opCode.argModes.forEach((mode,i)=>{
				codeInput.push(this.program[this.pointer +i +1]);
			});
			this.pointer = opCodeLookup[opCode.code].use(codeInput,this,opCode.argModes);
		}
		return this.output;
	}
	getOutput(){
		return this.output;
	}
	addInput(input){
		this.input.push(input);
	}
	addObserver(observer){
		this.observers.push(observer);
	}

}


module.exports = Computer;
