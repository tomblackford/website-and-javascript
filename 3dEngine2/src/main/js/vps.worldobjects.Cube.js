vps = vps || {};
vps.worldobjects = vps.worldobjects || {};

/**
 * A cube
 */
vps.worldobjects.Cube = function(name){
	// Call parent constructor
	vps.worldobjects.Cube.baseConstructor.call(this, name);
	
	var sp = 10;
	var shade = 'hsla(60,100%,100%,1.0)';
	
	// Some vertices for this object
	this.addVertexByCoords(-sp, -sp,  sp);		// 0
	this.addVertexByCoords(sp, -sp,  sp);		// 1
	this.addVertexByCoords(sp, -sp, -sp);		// 2
	this.addVertexByCoords(-sp, -sp, -sp);		// 3
	this.addVertexByCoords(-sp,  sp,  sp);		// 4
	this.addVertexByCoords(sp,  sp,  sp);		// 5
	this.addVertexByCoords(sp,  sp, -sp);		// 6
	this.addVertexByCoords(-sp,  sp, -sp);		// 7
	
	this.addPolygon4(0, 4, 5, 1, shade);
	this.addPolygon4(7, 3, 2, 6, shade);
	this.addPolygon4(0, 1, 2, 3, shade);
	this.addPolygon4(1, 5, 6, 2, shade);
	this.addPolygon4(4, 0, 3, 7, shade);
	this.addPolygon4(5, 4, 7, 6, shade);

};


// Extend Polygon
vps.Utils.extend(vps.worldobjects.Cube, vps.WorldObject);