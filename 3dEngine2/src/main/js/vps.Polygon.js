vps = vps || {};
/**
 * Represents a polygon, consisting of vertices
 * @returns {vps.Polygon}
 */
vps.Polygon = function(hue, reflectivity){
	this.vertices = [];
	this.visible = false;
	this.distanceToFurthestPoint = 0;
	this.distanceToClosestPoint = Number.POSITIVE_INFINITY;
	this.hue = hue;
	this.reflectivity = reflectivity;
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
	}
	
	return answer;
};

vps.Polygon.prototype.getNormal = function(){
	
	var vector1 = vps.GeometryUtils.createVector3d(this.vertices[0].absoluteCoords,this.vertices[1].absoluteCoords);
	var vector2 = vps.GeometryUtils.createVector3d(this.vertices[1].absoluteCoords,this.vertices[2].absoluteCoords);
	
	var answer = vector1.crossProduct(vector2);
	answer.normalise();
	
	return answer;
};

vps.Polygon.prototype.getBrightness = function(){
	var ambient = 0.35;
	
	// temp light direction along Z axis
	var lightVector = new vps.Vector3d(0,0,1);
	
	// the raw brightness, 
	var rawColouring = ambient + (lightVector.dotProduct(this.getNormal())) / (1/ambient);
	return rawColouring;
	
};