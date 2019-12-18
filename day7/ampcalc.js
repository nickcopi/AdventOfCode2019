const Computer = require('./computer.js');
const fs = require('fs');
const program = fs.readFileSync('input').toString().replace('\n','').split(',').map(instruction=>Number(instruction));

let results = [];
let sequenceList = [];

const diffVals = (i,j,k,l,m)=>{
	return i !== j && i !== k && i !== l && i !== m &&
		j !== k && j !== l && j !== m &&
		k !== l && k !==m &&
		l !== m
}

for(let i = 5;i < 10;i++){
	for(let j = 5;j<10;j++){
		for(let k = 5;k<10;k++){
			for(let l = 5;l<10;l++){
				for(let m = 5;m<10;m++){
					if(diffVals(i,j,k,l,m))
						sequenceList.push(String(i) + String(j) + String(k) + String(l) + String(m));
				}
			}
		}
	}
}

const sorter = (a,b)=>{
	return b.output - a.output;
}

//console.log(sequenceList);
let init = async()=>{
	console.log(sequenceList.map((sequence,j)=>{
		//if(j) return;
		let computers = [];
		for(let i = 0;i<sequence.length;i++){
			let computer = new Computer([...program],[Number(sequence[i])]);
			computers.push(computer);
			if(!i) computer.addInput(0);
		}
		computers.forEach((computer,i)=>{
			if(i === computers.length-1)
				computer.addObserver(computers[0]);
			else computer.addObserver(computers[i+1]);
		});
		for(let i = 0; i < computers.length;i++){
			new Promise((resolve,reject)=>{
				computers[i].run();
				resolve()
			}).then(value=>value);
		}
		console.log('waiting for run end');
		let stillBad = true;
		while(stillBad){
			stillBad = false;
			computers.forEach(computer=>{
				if(computer.pointer < program.length)
					stillBad = true;
			});
		}
		return{
			sequence,
			output
		}
	}).sort(sorter));
}
init();
