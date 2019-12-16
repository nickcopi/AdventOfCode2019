const fs = require('fs');
let input = [...fs.readFileSync('input').toString().repeat(10000)];
input.pop();
//let input = [...'80871224585914546619083218645595'];
const LENGTH = input.length;

const init = ()=>{
	for(let k = 0;k<100;k++){
		doFFT();
		console.log(k + '%');
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

const doFFT = ()=>{
	input = input.map((num,i,arr)=>{
		const pattern = getRepeatedPattern(i);
		let result = 0;
		arr.forEach((num,j)=>{
			//console.log(num,pattern[j]);
			result += num * pattern[j]
		
		});
		return Math.abs(result%10);

	});

}
init();
