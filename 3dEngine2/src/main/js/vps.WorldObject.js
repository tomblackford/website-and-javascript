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
	this.visible = true;
	this.name = name;

	// Position and speed of the object
	this.position = new vps.Coord3d(0,0,0);
	this.rotation = new vps.Rotation(0,0,0);
	
	// Rotation speed
	this.rotationSpeed = new vps.Rotation(0,0,0);
	
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
vps.WorldObject.prototype.addPolygon3 = function (v1, v2, v3, hue, reflectivity){
	var newPoly = new vps.Polygon3(this.vertices[v1], this.vertices[v2], this.vertices[v3], hue, reflectivity);
	this.polygons[this.polygons.length] = newPoly;
	
	// Add a reference back to the parent object
	newPoly.parentObject = this;
};

/**
 * Add a new 4-point poly to the object
 */
vps.WorldObject.prototype.addPolygon4 = function (v1, v2, v3, v4, hue, reflectivity){
	
	var newPoly = new vps.Polygon4(this.vertices[v1], this.vertices[v2], this.vertices[v3], this.vertices[v4], hue, reflectivity);
	this.polygons[this.polygons.length] = newPoly;
	
	// Add a reference back to the parent object
	newPoly.parentObject = this;
};

/**
 * Update each of the polygons world, pov and relative positions
 */
vps.WorldObject.prototype.update = function(camera){
	
	// Clear any cached distances from each polygon
	for(var i=0; i<this.polygons.length; i++){
		this.polygons[i].clearDerivedState();
	}
	
	// Update the object's rotation based on its rotation speed
	// If we're past 360 degrees, reduce by 360 degrees and vice versa
	this.rotation.x += this.rotationSpeed.x;
	this.rotation.x = Math.round(this.rotation.x*100)/100;
	if(this.rotation.x > Math.PI*2){
		this.rotation.x -= Math.PI*2;
	} else if (this.rotation.x < -Math.PI*2){
		this.rotation.x += Math.PI*2;
	}
	
	this.rotation.y += this.rotationSpeed.y;
	this.rotation.y = Math.round(this.rotation.y*100)/100;
	if(this.rotation.y > Math.PI*2){
		this.rotation.y -= Math.PI*2;
	} else if (this.rotation.y < -Math.PI*2){
		this.rotation.y += Math.PI*2;
	}
	
	this.rotation.z += this.rotationSpeed.z;
	this.rotation.z = Math.round(this.rotation.z*100)/100;
	if(this.rotation.z > Math.PI*2){
		this.rotation.z -= Math.PI*2;
	} else if (this.rotation.z < -Math.PI*2){
		this.rotation.z += Math.PI*2;
	}
	
	// Rotation transformations based on the camera position, rotation and viewer position
	var worldRotationTransformation = vps.RotationTransformationFactory.getRotationTransformationMatrix(this.rotation);
	var cameraRotationTransformation = vps.RotationTransformationFactory.getRotationTransformationMatrix(camera.rotation);
	
	// Update every vertex's world position/rotation based on the object's latest position/rotation	
	this.updateAbsoluteCoords(worldRotationTransformation, this.position);
	
	// Update every vertex's POV coords based on the camera's position
	this.updatePovCoords(cameraRotationTransformation, camera.position, camera.rotation);
	
	// We only need to do the rest if the object is visible (ie not behind viewer) 
	if(this.visible){
	
		// Update every vertex's view coordinates based on the viewer position (relative to camera)
		this.updateViewCoords(camera.viewerPosition);
		
		// Work out whether each polygon needs to be rendered
		for(var i=0; i<this.polygons.length; i++){		
			this.polygons[i].updateVisibility(camera);
		};
	} 
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.WorldObject.prototype.updateAbsoluteCoords = function(rotationMatrix, position){
	
	for (var i=0; i<this.vertices.length; i++){
		this.vertices[i].updateAbsoluteCoords(rotationMatrix, position);
	}
	
	// Update the position vertices (but use a noop transformation matrix as rotation is no needed)
	this.positionVertices.updateAbsoluteCoords(new vps.TransformationMatrix(), position);
};

/**
 * Update the absolute coordinates of every vertex used by this polygon
 * @param rotationMatrix
 * @param position
 */
vps.WorldObject.prototype.updatePovCoords = function(rotationMatrix, relativePosition, cameraRotation){

	// Loop through every point - updating the POV-relative coordinates
	// Also update the distance to furthest / nearest point vars if required
	for (var i=0; i<this.vertices.length; i++){
		this.vertices[i].updatePOVCoords(rotationMatrix, relativePosition, cameraRotation);
	}
	
	// Update the position vertex (helper for locating this object)
	this.positionVertices.updatePOVCoords(rotationMatrix, relativePosition, cameraRotation);
	
};

/**
 * Update the view position of each of the vertices in this object
 * @param viewPosition
 */
vps.WorldObject.prototype.updateViewCoords = function(viewPosition){	

	for(var i=0; i<this.vertices.length; i++){
		this.vertices[i].updateViewCoords(viewPosition);
	};
	
};
