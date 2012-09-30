vps = vps || {};
/**
 * Represents a polygon, consisting of vertices
 * @returns {vps.Polygon}
 */
vps.Polygon = function(colour){
	this.vertices = [];
	this.visible = false;
	this.distanceToFurthestPoint = 0;
	this.distanceToClosestPoint = Number.POSITIVE_INFINITY;
	this.colour = colour;
	
	console.log('Creating new polygon with colour '+colour);
};

/**
 * Add a new vertex to the polygon
 * @param vertex
 */
vps.Polygon.prototype.addVertex = function(vertex){
	this.vertices[this.vertices.length] = vertex;
};

/**
 * Return whether this polygon is facing the viewport (and thus should be rendered)
 * @returns {Boolean}
 */
vps.Polygon.prototype.isFacingViewport = function(){
	var v1x = this.vertices[2].viewCoords.x - this.vertices[0].viewCoords.x;
	var v1y = this.vertices[2].viewCoords.y - this.vertices[0].viewCoords.y;	
	
	var v2x = this.vertices[2].viewCoords.x - this.vertices[1].viewCoords.x;
	var v2y = this.vertices[2].viewCoords.y - this.vertices[1].viewCoords.y;
	
	var z = (v1x * v2y) - (v1y * v2x);
	return z < 0;
};

/**
 * Answer whether all the polygon's vertices are close enough to draw
 */
vps.Polygon.prototype.isInsideViewDistance = function(){
	var answer = true;
	for(var i=0; i<this.vertices.length; i++){
		
		if(this.vertices[i].distanceToCamera > this.distanceToFurthestPoint){
			this.distanceToFurthestPoint = this.vertices[i].distanceToCamera;
		}
		
		if(this.vertices[i].distanceToCamera < this.distanceToClosestPoint){
			this.distanceToClosestPoint = this.vertices[i].distanceToCamera;
		}
		
		// TODO: Pass in max render distance as part of Camera object
		if(this.vertices[i].distanceToCamera > 50000){
			answer = false;
		}
		
		console.log('Distance to camera = '+this.vertices[i].distanceToCamera);
	}
	
	return answer;
};

/**
 * Temporary draw method (will be factored out into some kinda renderer class)
 * @param ctx
 */
vps.Polygon.prototype.draw = function(ctx){

	if(this.visible){
		//ctx.fillStyle = colour;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.vertices[0].viewCoords.x,this.vertices[0].viewCoords.y);
	
		//console.log ('Starting draw at '+this.vertices[0].viewCoords.toString());
		
		for(var j=1; j<this.vertices.length; j++){
			//console.log ('Drawing to '+j+' : '+this.vertices[j].viewCoords.toString());
			ctx.lineTo(this.vertices[j].viewCoords.x, this.vertices[j].viewCoords.y);
		}
		
		//console.log ('Closing draw at '+this.vertices[0].viewCoords.toString());
	
		// Join it back up to the start
		ctx.lineTo(this.vertices[0].viewCoords.x, this.vertices[0].viewCoords.y);	
		
		ctx.closePath();
		ctx.stroke();
	}
};