class Renderer{
	constructor(width,height,layers){
		this.scale = 40;
		this.width = width;
		this.height = height;
		this.layers = layers;
		this.initCanvas();
		this.renderCanvas();
	}
	initCanvas(){
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.scale * this.width;
		this.canvas.height = this.scale * this.height;
	}
	renderCanvas(){
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.layers.forEach(layer=>{
			layer.lines.forEach((line,y)=>{
				[...line].forEach((pixel,x)=>{
					switch(pixel){
						case '0':
							this.ctx.fillStyle='black';
							break;
						case '1':
							this.ctx.fillStyle='white';
							break;
						case '2':
							return;
					}
					this.ctx.fillRect(x*this.scale,y*this.scale,this.scale,this.scale);

				});
			});
		});
	}

}


window.addEventListener('load',()=>{
	layers.reverse();
	new Renderer(WIDTH,HEIGHT,layers);

});
