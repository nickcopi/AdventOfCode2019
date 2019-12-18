class Robot{
	
	constructor(){
		this.x = 1000;
		this.y = 1000;
		this.initGrid();
		this.painting = true;
		this.direction = 0;
		this.firstPaint = true;
	}
	initGrid(){
		this.grid = [];
		for(let i = 0;i<1000*2;i++)
			this.grid.push([]);
	}
	getColor(){
		if(this.firstPaint){
			this.firstPaint = false;
			return 1;
		}
		return (this.grid[this.y][this.x])?1:0;
	}
	readOutput(output){
		if(this.painting)
			this.doPaint(output);
		else
			this.doTurn(output);
	}
	doPaint(output){
		this.painting = false;
		this.grid[this.y][this.x] = output;
	}
	doTurn(output){
		this.painting = true;
		this.direction += output?1:-1;
		if(this.direction > 3) this.direction = 0;
		if(this.direction < 0) this.direction = 3;
		this.doMove();
	}
	doMove(){
		switch(this.direction){
			//up
			case 0:
				this.y--;
				break;
			//right
			case 1:
				this.x++;
				break;
			//down
			case 2:
				this.y++;
				break;
			//left
			case 3:
				this.x--;
				break;
			default:
				console.error(`strange direction ${this.direction}`);
				process.exit();
		}
	}



}

module.exports = Robot;
