/**
 * Represents a single point within a polygon
 */
vps = vps || {};

/**
 * Construct a vertex at specified position (in the object local coord system)
 * @param relX
 * @param relY
 * @param relZ
 */
vps.Vertex = function(relX, relY, relZ){
	this.relativeCoords = new vps.Coord3d(relX, relY, relZ);
	
	// These will be calculated later
	this.absoluteCoords = new vps.Coord3d(0,0,0);	// The position of the vertex in absolute world coords
	this.povCoords = new vps.Coord3d(0,0,0);		// The position of the vertex relative to view window
	this.viewCoords = new vps.Coord2d(0,0);			// The position of the vertex on the 2d view plane
};

/**
 * Calculate the absolute coordinates of the vertex
 * @param transformationMatrix
 * @param worldPosition
 */
vps.Vertex.prototype.updateAbsoluteCoords = function(transformationMatrix, worldPosition){
	// Apply the local rotation first
	transformationMatrix.apply(this.relativeCoords, this.absoluteCoords);
	
	// Move to the correct world position
	this.absoluteCoords.x += worldPosition.x;
	this.absoluteCoords.y += worldPosition.y;
	this.absoluteCoords.z += worldPosition.z;

};

/**
 * Calculate the pov-relative coordinates of the vertex and return the distance between pov coords and camera
 * @param transformationMatrix
 * @param positionRelativeToView
 */
vps.Vertex.prototype.updatePOVCoords = function(cameraRotationTransformationMatrix, cameraPosition){

	// Work out position with respect to the camera's coordinate system
	var relativePos = new vps.Coord3d(this.absoluteCoords.x-cameraPosition.x,
									  this.absoluteCoords.y-cameraPosition.y,
									  this.absoluteCoords.z-cameraPosition.z);
	
	cameraRotationTransformationMatrix.apply(relativePos, this.povCoords);

	// Work out the distance from camera to this point
	xDist = relativePos.x - cameraPosition.x;
	yDist = relativePos.y - cameraPosition.y;
	zDist = relativePos.z - cameraPosition.z;
	
	return Math.sqrt(xDist*xDist + yDist*yDist + zDist*zDist);
};