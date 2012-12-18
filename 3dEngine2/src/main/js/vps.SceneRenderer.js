vps = vps || {};

/**
 * Construct a scene renderer
 */
vps.SceneRenderer = function(ctx, camera, shader){
	this.ctx = ctx;
	this.camera = camera;
	this.shader = shader;
	this.drawVertices = false;
};


/**
 * Temporary draw method (will be factored out into some kinda renderer class)
 * @param ctx
 */
vps.SceneRenderer.prototype.draw = function(polygon, lights){

	var polygonDrawn = false;
	
	if(polygon.visible){

		this.ctx.fillStyle = shader.shade(polygon, lights);
		
		this.ctx.beginPath();
		this.ctx.moveTo(polygon.vertices[0].viewCoords.x, polygon.vertices[0].viewCoords.y);
	
		for(var j=1; j<polygon.vertices.length; j++){
			this.ctx.lineTo(polygon.vertices[j].viewCoords.x, polygon.vertices[j].viewCoords.y);
		}
		
		// Join it back up to the start
		this.ctx.lineTo(polygon.vertices[0].viewCoords.x, polygon.vertices[0].viewCoords.y);	
		
		this.ctx.closePath();
		this.ctx.fill();
		// this.ctx.stroke();
		
		polygonDrawn = true;
	}
	
	if(this.drawVertices){
		this.ctx.fillStyle = '#ffffff';
		ctx.fillRect(polygon.vertices[0].viewCoords.x, polygon.vertices[0].viewCoords.y, 3, 3);
	}
	
	return polygonDrawn;
};