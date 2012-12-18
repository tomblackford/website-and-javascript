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
	this.normal = null;
	this.midpointPosition = null;
};

/**
 * Add a new vertex to the polygon
 * @param vertex
 */
vps.Polygon.prototype.addVertex = function(vertex){
	this.vertices[this.vertices.length] = vertex;
};

vps.Polygon.prototype.clearDerivedState = function(){
	this.distanceToFurthestPoint = 0;
	this.distanceToClosestPoint = Number.POSITIVE_INFINITY;
	this.normal = null;
	this.midpointPosition = null;
};

/**
 * Return whether this polygon is facing the viewport (and thus should be rendered)
 * @returns {Boolean}
 */
vps.Polygon.prototype.isFacingViewport = function(camera){
	
	// A cheaty way of doing this - seems faster but innaccurate
	var v1x = this.vertices[2].viewCoords.x - this.vertices[0].viewCoords.x;
	var v1y = this.vertices[2].viewCoords.y - this.vertices[0].viewCoords.y;	
	
	var v2x = this.vertices[2].viewCoords.x - this.vertices[1].viewCoords.x;
	var v2y = this.vertices[2].viewCoords.y - this.vertices[1].viewCoords.y;
	
	var z = (v1x * v2y) - (v1y * v2x);
	return z < 0;
	
//	// Try this with the normals - seems more accurate *but slower*
//	if(this.getNormal().dotProduct(camera.rotation.toVector())>Math.PI/2){
//		return false;
//	} else {
//		return true;
//	}
};

/**
 * Update the polygon's visibilty flag, based on whether it's inside the view clip,
 * inside the camera's field of view, and facing the camera
 */
vps.Polygon.prototype.updateVisibility = function(camera){
	this.visible = true;
	
	var anyVertexInsideFieldOfView = false;
	
	// First updating the distance to the furthest/nearest point of the polygon
	for(var i=0; i<this.vertices.length; i++){
		
		if(this.vertices[i].distanceToCamera > this.distanceToFurthestPoint){
			this.distanceToFurthestPoint = this.vertices[i].distanceToCamera;
		}
		
		if(this.vertices[i].distanceToCamera < this.distanceToClosestPoint){
			this.distanceToClosestPoint = this.vertices[i].distanceToCamera;
		}
			
		if(this.vertices[i].insideFieldOfView){
			anyVertexInsideFieldOfView = true;
		}
	}
	
	// If the closest point is outside of the view distance, set poly to invisible
	if(this.distanceToClosestPoint>20000){
		this.visible = false;
	}
	
	// Consider the polygon invisible if no vertex is inside the field of view
	if(!anyVertexInsideFieldOfView){
		this.visible = false;
	}

	// Finally, check if the polygon is actually facing the viewport
	if(this.visible){
		
		// Now check for facing the camera
		if(!this.isFacingViewport(camera)){
			this.visible = false;
		} 
	}
};

/**
 * Answer a unit vector representing the normal to the polygon surface.
 * Calculated lazily each frame.
 * COULD CACHE THIS IF POLYGON HASN'T MOVED
 * @returns
 */
vps.Polygon.prototype.getNormal = function(){
	var answer = this.normal;
	
	if(answer == null){
		var vector1 = vps.GeometryUtils.createVector3d(this.vertices[0].absoluteCoords,this.vertices[1].absoluteCoords);
		var vector2 = vps.GeometryUtils.createVector3d(this.vertices[1].absoluteCoords,this.vertices[2].absoluteCoords);
		
		answer = vector1.crossProduct(vector2);
		answer.normalise();
		
		this.normal = answer;
	}
	
	return answer;
};

/**
 * Answer a Coord3d representing the midpoint of the polygon surface.
 * Calculated lazily each frame.
 * COULD CACHE THIS IF THE POLYGON HASN'T MOVED
 * @returns
 */
vps.Polygon.prototype.getMidpointPosition = function(){
	var answer = this.midpointPosition;
	
	if(answer == null){
		var x = 0;
		var y = 0;
		var z = 0;
		
		for(var i=0; i<this.vertices.length; i++){
			x += this.vertices[i].absoluteCoords.x;
			y += this.vertices[i].absoluteCoords.y;
			z += this.vertices[i].absoluteCoords.z;
		}
		
		answer = new vps.Coord3d(x/this.vertices.length, y/this.vertices.length, z/this.vertices.length);
		
		this.midpointPosition = answer;
	}
	
	return answer;
};