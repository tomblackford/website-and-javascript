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
vps.Vertex = function(coords){
	this.relativeCoords = coords;
	
	// These will be calculated later
	this.absoluteCoords = new vps.Coord3d(0,0,0);	// The position of the vertex in absolute world coords
	this.povCoords = new vps.Coord3d(0,0,0);		// The position of the vertex relative to view window
	this.viewCoords = new vps.Coord2d(0,0);			// The position of the vertex on the 2d view plane

	this.distanceToCamera = -1;						// The direct distance from vertex to camera
	this.insideFieldOfView = false;					// Whether this vertex is in the field of view
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
 * Calculate:
 * - the pov-relative coordinates of the vertex 
 * - the distance between pov coords and camera
 * - whether the vertext falls inside the camera's field of view
 * @param transformationMatrix
 * @param positionRelativeToView
 */
vps.Vertex.prototype.updatePOVCoords = function(cameraRotationTransformationMatrix, cameraPosition, cameraRotation){

	// Work out position with respect to the camera's coordinate system
	var relativePos = new vps.Coord3d(this.absoluteCoords.x-cameraPosition.x,
									  this.absoluteCoords.y-cameraPosition.y,
									  this.absoluteCoords.z-cameraPosition.z);
	
	cameraRotationTransformationMatrix.apply(relativePos, this.povCoords);

	var distanceVector = vps.GeometryUtils.vectorBetween(this.absoluteCoords, cameraPosition);
	this.distanceToCamera = distanceVector.distance();
	
	// Work out if this vertex is within the camera's field of view 
	// based on http://nic-gamedev.blogspot.co.uk/2011/11/using-vector-mathematics-and-bit-of.html
	var inverseDistance = 1/this.distanceToCamera;
	var vectorToPoint = new vps.Vector3d(distanceVector.x * inverseDistance, distanceVector.y * inverseDistance, distanceVector.z * inverseDistance);
	var cameraVector = cameraRotation.toVector();
	
	var dotProduct = cameraVector.dotProduct(vectorToPoint);
	var halfOfFOV = Math.PI/4;

	if(dotProduct >= Math.cos(halfOfFOV)){
		this.insideFieldOfView = true;
	} else {
		this.insideFieldOfView = false;
	}
	
};

/**
 * Calculate the coordinates of the vertex as projected onto the 2d view plane (ie perspectve projection)
 */
vps.Vertex.prototype.updateViewCoords = function(viewerPostion){
	
	var oneOverZ = 1/this.povCoords.z;
	this.viewCoords.x = this.povCoords.x * 800 * oneOverZ + 500 ;
	this.viewCoords.y = -this.povCoords.y * 800 * oneOverZ + 250 ;

};

vps.Vertex.prototype.toString = function(){
	return "Vertex ("+this.relativeCoords+")";
};