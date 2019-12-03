const fs = require('fs');

const wires = fs.readFileSync('input').toString().split('\n').map(wire=>wire.split(','));
wires.pop();

const letterLookup = {
	'L':{
		variable:'x',
		direction:'-1'
	},
	'R':{
		variable:'x',
		direction:'1'
	},
	'U':{
		variable:'y',
		direction:'-1'
	},
	'D':{
		variable:'y',
		direction:'1'
	}

}


class GridMarker{
	constructor(wireId){
		this.wires = [wireId];
	}
	addWire(wireId){
		if(!this.wires.includes(wireId))
			this.wires.push(wireId);
	}
	toString(){
		if(this.wires.length >2){
			return 'X';
		}
		else return '+';
	}
}

class GridManager{
	static baseX = 10000;
	static baseY = 10000;
	constructor(){
		this.grid = [];
		this.wireId = 0;
		this.resetCoords();
	}
	resetCoords(){
		this.x = GridManager.baseX;
		this.y = GridManager.baseY;
	}
	readWire(wire){
		this.resetCoords();
		wire.forEach(segment=>{
			const letter = segment[0];
			const magnitude = Number(segment.substring(1,segment.length));
			if(isNaN(magnitude)){
				console.error('Parsed a segment magnitude wrong! Aborting!');
				process.exit();
			}
			const movementObject = letterLookup[letter];
			for(let i = 0;i < magnitude;i++){
				this[movementObject.variable] += 1 * movementObject.direction;
				this.addSegment();
			}
		});
		this.wireId++;
	}
	addSegment(){
		if(!this.grid[this.x])
			this.grid[this.x] = [];
		if(this.grid[this.x][this.y]){
			this.grid[this.x][this.y].addWire(this.wireId);
		} else {
			this.grid[this.x][this.y] = new GridMarker(this.wireId);
		}
	}
	displayChunk(startX,startY,endX,endY){
		let str;
		for(let x = startX; x< endX;x++){
			str = '';
			for(let y = startY; y < endY; y++){
				if(this.grid[x][y]) str += this.grid[x][y].toString();
				else str += '.';
			}
			console.log(str);
		}
	} 
	findIntersections(){
		const found = [];
		this.grid.forEach((col,x)=>{
			if(col)
				col.forEach((item,y)=>{
					if(item && item.wires.length > 1)
						found.push({item:item,x,y});
				});
		});
		return found;
	}
}

class IteratorMaker{
	static baseX = 10000;
	static baseY = 10000;
	readWire(wire){
		let wireIterator = new WireIterator();
		wire.forEach(segment=>{
			const letter = segment[0];
			const magnitude = Number(segment.substring(1,segment.length));
			if(isNaN(magnitude)){
				console.error('Parsed a segment magnitude wrong! Aborting!');
				process.exit();
			}
			const movementObject = letterLookup[letter];
			wireIterator.addDirection(movementObject.direction);
			wireIterator.addVariable(movementObject.variable);
			wireIterator.addMagnitude(magnitude);
		});
		return wireIterator;
	}

}


class WireIterator{
	constructor(){
		this.directions = [];
		this.magnitudes = [];
		this.variables = [];
		this.x = IteratorMaker.baseX;
		this.y = IteratorMaker.baseY;
	}
	addDirection(direction){
		this.directions.push(direction);
	}
	addMagnitude(magnitude){
		this.magnitudes.push(magnitude);
	}
	addVariable(variable){
		this.variables.push(variable);
	}
	next(){
		this[this.variables[0]] += 1 * this.directions[0];
		this.magnitudes[0]--;
		if(this.magnitudes[0] === 0){
			this.magnitudes.shift();
			this.variables.shift();
			this.directions.shift();
		}
		return {
			x: this.x,
			y: this.y
		}
	}
}
const gridManager = new GridManager();
wires.forEach(wire=>{
	gridManager.readWire(wire);
});

const iteratorMaker = new IteratorMaker();
let wireIterators = [];
wires.forEach(wire=>{
	wireIterators.push(iteratorMaker.readWire(wire));
});
//console.log(wireIterators[0].next());
let count = 0;
let hits2 = [];
while(true){
	count++;
	const wire = wireIterators[1].next();
	if(gridManager.grid[wire.x][wire.y].wires.includes(0)){
		hits2.push({...wire,count});
	}
	if(hits2.length > 20)
		break;
	//const wire2 = wireIterators[1].next();
	//if(wire1.x === wire2.x && wire2.y === wire1.y)
		//break;
}
//console.log(count,hits);
count = 0;
let hits1 = [];
while(true){
	count++;
	const wire = wireIterators[0].next();
	if(gridManager.grid[wire.x][wire.y].wires.includes(1)){
		hits1.push({...wire,count});
	}
	if(hits1.length > 20)
		break;
	//const wire2 = wireIterators[1].next();
	//if(wire1.x === wire2.x && wire2.y === wire1.y)
		//break;
}

hitSums = [];
hits1.forEach(hit=>{
	let pair = hits2.find(hit2=>hit2.x === hit.x && hit2.y === hit.y);
	if(pair)
		hitSums.push(hit.count + pair.count);
});

console.log(hitSums.sort());


/*const gridManager = new GridManager();
wires.forEach(wire=>{
	gridManager.readWire(wire);
});*/
//gridManager.displayChunk(GridManager.baseX-10,GridManager.baseY-10,GridManager.baseX+10,GridManager.baseY+10);
/*console.log(gridManager.findIntersections().map(item=>{
	item.x = Math.abs(item.x - GridManager.baseX);
	item.y = Math.abs(item.y - GridManager.baseY);
	return item.x + item.y;
}).sort());*/
