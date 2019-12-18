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

for(let i = 0;i < 5;i++){
	for(let j = 0;j<5;j++){
		for(let k = 0;k<5;k++){
			for(let l = 0;l<5;l++){
				for(let m = 0;m<5;m++){
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
console.log(sequenceList.map(sequence=>{
	let output = 0;
	for(let i = 0;i<sequence.length;i++){
		let computer = new Computer([...program],[Number(sequence[i]),output]);
		output = computer.run()[0];
	}
	return{
		sequence,
		output
	}
}).sort(sorter));
