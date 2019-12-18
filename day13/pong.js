class Pong{
	constructor(){
		this.output = [];
		this.initGrid();
	}
	initGrid(){
		this.grid = [];
		for(let i = 0;i<26;i++)
			this.grid.push([]);
	}
	readOutput(output){
		this.output.push(output);
	}
	parseOutput(){
		for(let i = 0;i<this.output.length;i+=3){
			if(this.output[i] === -1){
				this.score = this.output[i+2];
			}
			this.grid[this.output[i+1]][this.output[i]] = this.output[i+2];
		}
	}
	render(){
		this.grid.forEach(line=>{
			let str = '';
			line.forEach(tile=>{
				str += this.numToTile(tile);
			});
			console.log(str);
		});
		console.log(`Score: ${this.score}`);
	}
	numToTile(num){
		switch(num){
			case 0:
				return ' ';
			case 1:
				return '#';
			case 2:
				return '+';
			case 3:
				return '_';
			case 4:
				return 'O';
		}
	}

}

module.exports = Pong;
