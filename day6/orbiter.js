const fs = require('fs');

let orbits = fs.readFileSync('input').toString().split('\n');
orbits.pop();
//console.log(JSON.stringify(orbits));

const existingNodes = [
	'COM'
]

class Node{
	constructor(name){
		this.name = name;
		this.orbiters = [];
	}
	addOrbiter(node){
		this.orbiters.push(node);
	}

}
const orbitMap = new Node('COM');

const findNodeWithName = name=>{
	let toVist = [orbitMap];
	while(toVisit.length){
		let node = toVisit.pop();
		if(node.name === name) return node;
		node.orbiters.forEach(orbiter=>{
			toVisit.push(orbiter);
		});
	}
}


const buildGraph = ()=>{
	while(orbits.length){
		console.log(orbits.length)
		orbits = orbits.filter(orbit=>{
			orbitArr = orbit.split(')');
			if(existingNodes.includes(orbitArr[0])){
				findNodeWithName(orbitArr[0],orbitMap).addOrbiter(new Node(orbitArr[1]));
				existingNodes.push(orbitArr[1]);
				return false;
			}
			return true;
		});
	}
}
buildGraph();
console.log(orbitMap);
