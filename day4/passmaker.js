const input = '134792-675810'.split('-');
const start = Number(input[0]);
const end = Number(input[1]);

const hasDouble = num=>{
	let valid = false;
	[...String(num)].forEach((num,i,arr)=>{
		if(num === arr[i+1])
			valid = true;
	});
	return valid;
}
const hasOnlyDouble = num=>{
	let valid = false;
	//let turboValid = true;
	let pairs = [];
	[...String(num)].forEach((num,i,arr)=>{
		if(num === arr[i+1]){
			valid = true;
			pairs.push({num,i});
		}
	});
	return valid && validPairs(pairs);
}

const validPairs = pairs=>{
	let valid = false;
	pairs.forEach(pair=>{
		if(!pairs.find(found=>found.num === pair.num && (found.i === pair.i+1 || found.i === pair.i-1)))
			valid = true;
	});
	return valid;
}

const isntDecreasing = num=>{
	let valid = true;
	let max = 0;
	[...String(num)].forEach(num=>{
		if(num > max)
			max = num;
		if(num < max)
			valid = false;
	});
	return valid;
	
}

const isValid = num=>{
	return hasDouble(num) && isntDecreasing(num);
}
const isValidTwo = num=>{
	return hasOnlyDouble(num) && isntDecreasing(num);
}
//console.log(isValid("123445"));
let count = 0;
for(let i = start;i<end;i++){
	if(isValidTwo(i)) count++;
}
console.log(validPairs([
    {num:1,i:1},{num:1,i:2}
]))
console.log(count);
