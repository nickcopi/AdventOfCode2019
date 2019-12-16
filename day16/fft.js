const fs = require('fs');
let input = [...fs.readFileSync('input').toString().repeat(10000)];
input.pop();
//let input = [...'80871224585914546619083218645595'];
const LENGTH = input.length;
const patternLookup = [0,1,0,-1];

const init = ()=>{
	for(let k = 0;k<100;k++){
		doFFT();
		console.log(k+1 + '%');
	}
	console.log(input);
	fs.writeFileSync('calculatedoutput',input.join(''));
}

const getPattern = n => {
	let result = [];
	for(let i = 0;i<n+1;i++)
		result.push(0);
	for(let i = 0;i<n+1;i++)
		result.push(1);
	for(let i = 0;i<n+1;i++)
		result.push(0);
	for(let i = 0;i<n+1;i++)
		result.push(-1);
	return result;
}

const getRepeatedPattern = n => {
	const pattern = getPattern(n);
	while(pattern.length < LENGTH+1)
		pattern.push(...pattern);
	pattern.shift();
	return pattern;
}

class PatternIterator{
	constructor(size){
		this.size = size+1;
		this.index = 1;
	}
	getNext(){
		let num = Math.floor((this.index % (this.size*4)) / this.size) %4;
		this.index++;
		return patternLookup[num];
	}

}


const doFFT = ()=>{
	input = input.map((num,i,arr)=>{
		//const pattern = getRepeatedPattern(i);
		const patternIterator = new PatternIterator(i);
		let result = 0;
		arr.forEach((num,j)=>{
			//console.log(num,pattern[j]);
			result += num * patternIterator.getNext();
		
		});
		return Math.abs(result%10);

	});

}
init();
