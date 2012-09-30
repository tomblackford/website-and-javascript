/**
 * Represents a single point within a polygon
 */
vps = vps || {};

/**
 * Create a new world object with the given name
 * @param name
 * @returns {vps.WorldObject}
 */
vps.WorldObject = function(name){
	this.vertices = [];
	this.polygons = [];
	this.visible = false;
	this.name = name;
	
	this.position = new vps.Coord3d(0,0,0);
	this.rotation = new vps.Rotation(0,0,0);
	
	// A point a origin of local coord system.
	// We use this to determine if behind view plane
	this.positionVertices = new vps.Vertex(new vps.Coord3d(0, 0, 0));
};

/**
 * Add a new polygon to the object
 * @param polygon
 */
vps.WorldObject.prototype.addPolygon = function(polygon){
	this.polygons[this.polygons.length] = polygon;
	
	// Add a reference back to the parent object
	polygon.parentObject = this;
};

/**
 * Add a new vertex to the object
 * @param vertex
 */
vps.WorldObject.prototype.addVertex = function(vertex){
	this.vertices[this.vertices.length] = vertex;
};

/**
 * Add a new vertex with the passed coords to the object
 * @param x
 * @param y
 * @param z
 */
vps.WorldObject.prototype.addVertexByCoords = function(x, y, z){
	this.vertices[this.vertices.length] = new vps.Vertex(new vps.Coord3d(x,y,z));
};

/**
 * Add a new 3-point poly to the object
 */
vps.WorldObject.prototype.addPolygon3 = function (v1, v2, v3, shade){
	var newPoly = new vps.Polygon3(this.vertices[v1], this.vertices[v2], this.vertices[v3], shade);
	this.polygons[this.polygons.length] = newPoly;
	
	// Add a reference back to the parent object
	newPoly.parentObject = this;
};

/**
 * Add a new 4-point poly to the object
 */
vps.WorldObject.prototype.addPolygon4 = function (v1, v2, v3, v4, shade){
	
	var newPoly = new vps.Polygon4(this.vertices[v1], this.vertices[v2], this.vertices[v3], this.vertices[v4], shade);
	this.polygons[this.polygons.length] = newPoly;
	
	// Add a reference back to the parent object
	newPoly.parentObject = this;
};

/**
 * Update each of the polygons world, pov and relative positions
 */
vps.WorldObject.prototype.update = function(cameraPosition, cameraRotation, viewerPostion){
	// Rotation transformations based on the camera position, rotation and viewer position
	var worldRotationTransformation = new vps.RotationTransformationMatrix(this.rotation);
	var cameraRotationTransformation = new vps.RotationTransformationMatrix(cameraRotation);
	
	// Update every vertex's world position/rotation based on the object's latest position/rotation	
	this.updateAbsoluteCoords(worldRotationTransformation, this.position);
	
	// Update every vertex's POV coords based on the camera's position
	this.updatePovCoords(cameraRotationTransformation, cameraPosition);
	
	// We only need to do the rest if the object is visible (ie not behind viewer) 
	if(this.visible){
		// Update every vertex's view coordinates based on the viewer position (relative to camera)
		this.updateViewCoords(viewerPosition);
		
		// Work out whether each polygon needs to be rendered
		for(var i=0; i<this.polygons.length; i++){
			var polyVisible = false;
			
			// Check that the polygon isn't too far away
			polyVisible = this.polygons[i].isInsideViewDistance();			
			if(polyVisible){		
				// Confirm that the polygon is facing the viewport
				polyVisible = this.polygons[i].isFacingViewport();
			}
			
			this.polygons[i].visible = polyVisible;
		};
	};
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.WorldObject.prototype.updateAbsoluteCoords = function(rotationMatrix, position){
	
	for (var i=0; i<this.vertices.length; i++){
		console.log(this.vertices[i]);
		this.vertices[i].updateAbsoluteCoords(rotationMatrix, position);
		// console.log("AbsoluteCoords["+i+"] = "+this.vertices[i].absoluteCoords.toString());
	}
	
	// Update the position vertices (but use a noop transformation matrix as rotation is no needed)
	this.positionVertices.updateAbsoluteCoords(new vps.TransformationMatrix(), position);
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.WorldObject.prototype.updatePovCoords = function(rotationMatrix, relativePosition){

	// Loop through every point - updating the POV-relative coordinates
	// Also update the distance to furthest / nearest point vars if required
	for (var i=0; i<this.vertices.length; i++){
		this.vertices[i].updatePOVCoords(rotationMatrix, relativePosition);
	}
	
	// Update the position matrix
	this.positionVertices.updatePOVCoords(rotationMatrix, relativePosition);
	if(this.positionVertices.povCoords.z>0){
		this.visible = true;
	} else {
		console.log('Object '+this.name+' is behind view plane. Skipping.');
		this.visible = false;
	};
	
};

/**
 * Update the view position of each of the vertices in this polygon
 * @param viewPosition
 */
vps.WorldObject.prototype.updateViewCoords = function(viewPosition){	

	for(var i=0; i<this.vertices.length; i++){
		this.vertices[i].updateViewCoords(viewPosition);
		//console.log("ViewCoords["+i+"] = "+this.vertices[i].viewCoords.toString());
	};
	
};
