const moons = require('./moons.json');



const addVector3 = (v1,v2)=>{
	return{
		x:v1.x+v2.x,
		y:v1.y+v2.y,
		z:v1.z+v2.z,
	}
}

class Moon{
	constructor(x,y,z){
		this.position = {x,y,z};
		this.velocity = {x:0,y:0,z:0};
		this.accelerations = [];
	}
	getPotential(){
		return Math.abs(this.position.x + this.position.y + this.position.z) 
	}
	getKinetic(){
		return Math.abs(this.velocity.x + this.velocity.y + this.velocity.z) 
	}
	getEnergy(){
		return this.getPotential() + this.getKinetic();
	}
	bufferGravity(acceleration){
		this.accelerations.push(acceleration);
	}
	accelerate(){
		this.accelerations.forEach(acceleration=>{
			this.velocity = addVector3(this.velocity,acceleration);
		});
		this.accelerations = [];
	}
}
class MoonHandler{
	constructor(moons){
		this.moons = [];
		this.initMoons(moons);
	}
	initMoons(moons){
		moons.forEach(moon=>{
			this.moons.push(new Moon(moon.x,moon.y,moon.z));
		});
	}
	doStep(){
		this.moons.forEach(moon=>{
			this.moons.forEach(pair=>{
				moon.bufferGravity(this.getGravity(moon,pair));
			});
		});
		this.moons.forEach(moon=>{
			moon.accelerate();
		});
	}
	getGravity(moon1,moon2){
		let x,y,z;
		if(moon1.x > moon2.x)
			x = -1;
		else if(moon1.x < moon2.x)
			x = 1;
		else x = 0;
		if(moon1.y > moon2.y)
			y = -1;
		else if(moon1.y < moon2.y)
			y = 1;
		else y = 0;
		if(moon1.z > moon2.z)
			z = -1;
		else if(moon1.z < moon2.z)
			z = 1;
		else z = 0;
		return {x,y,z};
	}


}


const moonHandler = new MoonHandler(moons);
console.log(moonHandler.moons);
