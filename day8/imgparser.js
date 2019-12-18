const input = require('./input');
const WIDTH = 25;
const HEIGHT = 6;
let img = input.match(/.{1,25}/g);

let layers = [];

class Layer{
	constructor(){
		this.lines = [];
	}
	addLine(line){
		this.lines.push(line);
	}
	countColor(color){
		let total = 0;
		this.lines.forEach(line=>{
			total += (line.match(new RegExp(color, "g")) || []).length;
		});
		return total;
	}

}

const sortForZero = (a,b)=>{
	return b.zeroCount - a.zeroCount;
}

img.forEach((line,i)=>{
	if(!(i%6))
		layers.push(new Layer());
	layers[layers.length-1].addLine(line);
});
//console.log(layers[0].countColor(0));
layers = layers.map(layer=>{
	return {
		zeroCount: layer.countColor(0),
		oneTwoCount: layer.countColor(1) * layer.countColor(2),
		layer
	}
});
console.log(layers.sort(sortForZero));
