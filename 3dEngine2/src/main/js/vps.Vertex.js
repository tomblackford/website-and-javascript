/**
 * Represents a single point within a polygon
 */
vps = vps || {};

/**
 * Construct a vertex at specifed position (in the object local coord system)
 * @param relX
 * @param relY
 * @param relZ
 */
vps.Vertex = function(relX, relY, relZ){
	this.relativePosition = new vps.Coord3d(relX, relY, relZ);
	
	// These will be calculated later
	this.absolutePosition = new vps.Coord3d(0,0,0);	// The position of the vertex in absolute world coords
	this.povPosition = new vps.Coord3d(0,0,0);		// The position of the vertex relative to view window
	this.viewPosition = new vps.Coord2d(0,0);		// The position of the vertex on the 2d view plane
};

/**
 * Calculate the absolute coordinates of the vertex
 * @param transformationMatrix
 * @param worldPosition
 */
vps.Vertex.prototype.updateAbsoluteCoords = function(transformationMatrix, worldPosition){
	
	
	transformationMatrix.apply(this.relativePosition, this.absolutePosition);
	
	jstestdriver.console.log("Applied transformationMatrix : "+this.absolutePosition.x);

	this.absolutePosition.x += worldPosition.x;
	this.absolutePosition.y += worldPosition.y;
	this.absolutePosition.z += worldPosition.z;
	
	jstestdriver.console.log("After position applied: "+this.absolutePosition.x);
};