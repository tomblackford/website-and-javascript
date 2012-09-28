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
};

/**
 * Add a new vertex to the polygon
 * @param vertex
 */
vps.Polygon.prototype.addVertex = function(vertex){
	vertices[vertices.length] = vertex;
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.Polygon.prototype.updateAbsoluteCoords = function(rotationMatrix, position){
	
	for (var i=0; i<this.vertices.length; i++){
		vertices[i].updateAbsoluteCoords(rotationMatrix, position);
	}
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.Polygon.prototype.updatePovCoords = function(rotationMatrix, relativePosition){
	// Reset the furthest / nearest points, we'll recalculate these here
	this.distanceToFurthestPoint = 0;
	this.distanceToClosestPoint = Number.POSITIVE_INFINITY;
	
	// Loop through every point - updating the POV-relative coordinates
	// Also update the distance to furthest / nearest point vars if required
	for (var i=0; i<this.vertices.length; i++){
		var distanceTo = vertices[i].updatePovCoords(rotationMatrix, position);
		if(distanceTo>this.distanceToFurthestPoint){
			this.distanceToFurthestPoint = distanceTo;
		}
		if(distanceTo<this.distanceToClosestPoint){
			this.distanceToClosestPoint = distanceTo;
		}
	}
};