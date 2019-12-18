//const fs = require('fs');
//const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));
const mainTape = [];
const input = [0,0];
const output = [];

//program[1] = 12;
//program[2] = 2;

//console.log(JSON.stringify(program));





const opCodeLookup = [];

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
	use(inputs,tape,pointer,modes){
		//console.log(inputs);
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		tape[inputs[2]] = input1 + input2;
		return this.adjustPointer(pointer);
	}
}
class MultiplyOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,tape,pointer,modes){
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		tape[inputs[2]] = input1 * input2;
		return this.adjustPointer(pointer);
	}
}

class InputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,tape,pointer,modes,input,output){
		let result = input.shift();
		console.log('trying to get input');
		while(result === undefined){
			result = input.shift();
		}
		console.log('took input');
		tape[inputs[0]] = result;
		return this.adjustPointer(pointer);
	}
}

class OutputOpCode extends OpCode{
	constructor(){
		super(1);
	}
	use(inputs,tape,pointer,modes,input,output,observers){
		console.log(tape[inputs[0]]);
		output.push(tape[inputs[0]])
		observers.forEach(observer=>{
			observer.addInput(tape[inputs[0]]);
		});
		return this.adjustPointer(pointer);
	}
}

class HaltOpCode extends OpCode{
	constructor(){
		super(0);
	}
	use(inputs,tape){
		//console.log(output);
		//process.exit();
		return tape.length;
	}
}

class JumpTrueOpCode extends OpCode{
	constructor(){
		super(2);
	}
	use(inputs,tape,pointer,modes){
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		if(input1) return input2;
		return this.adjustPointer(pointer);
	}
}

class JumpFalseOpCode extends OpCode{
	constructor(){
		super(2);
	}
	use(inputs,tape,pointer,modes){
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		if(!input1) return input2;
		return this.adjustPointer(pointer);
	}
}

class LessThanOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,tape,pointer,modes){
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		tape[inputs[2]] = (input1 < input2)?1:0;
		return this.adjustPointer(pointer);
	}
}
class EqualsOpCode extends OpCode{
	constructor(){
		super(3);
	}
	use(inputs,tape,pointer,modes){
		let input1 = modes[0]?inputs[0]:tape[inputs[0]];
		let input2 = modes[1]?inputs[1]:tape[inputs[1]];
		tape[inputs[2]] = (input1 === input2)?1:0;
		return this.adjustPointer(pointer);
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

class Computer{
	constructor(program,input){
		this.program = program;
		this.input = input;
		this.pointer = 0;
		this.output = [];
		this.observers = [];
	}
	async run(){
		console.log('running');
		while(this.pointer < this.program.length){
			const opCode = parseOpCode(this.program[this.pointer]);
			const codeInput = [];
			opCode.argModes.forEach((mode,i)=>{
				codeInput.push(this.program[this.pointer +i +1]);
			});
			this.pointer = opCodeLookup[opCode.code].use(codeInput,this.program,this.pointer,opCode.argModes,this.input,this.output,this.observers);
		}
		return this.output;
	}
	getOutput(){
		return this.output;
	}
	addInput(input){
		this.input.push(input);
		console.log('input added');
	}
	addObserver(observer){
		this.observers.push(observer);
	}

}


module.exports = Computer;

