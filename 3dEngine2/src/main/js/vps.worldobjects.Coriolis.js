vps = vps || {};
vps.worldobjects = vps.worldobjects || {};

/**
 * A Coriolis station (from Elite)
 */
vps.worldobjects.Coriolis = function(name, hue, reflectivity){
	// Call parent constructor
	vps.worldobjects.Coriolis.baseConstructor.call(this, name);
	
	
	// Some vertices for this object	
	this.addVertexByCoords(-50,	71,	50);		// 0
	this.addVertexByCoords(50,	71,	50);		// 1
	this.addVertexByCoords(50,	71,-50);		// 2
	this.addVertexByCoords(-50,	71,-50);		// 3
	this.addVertexByCoords(0,	0,	-100);		// 4
	this.addVertexByCoords(-100,0,	0);			// 5
	this.addVertexByCoords(0,	0,	100);		// 6
	this.addVertexByCoords(100,	0,	0);			// 7
	this.addVertexByCoords(-50,	-71,-50);		// 8
	this.addVertexByCoords(-50,	-71,50);		// 9
	this.addVertexByCoords(50,	-71,50);		// 10
	this.addVertexByCoords(50,	-71,-50);		// 11		
	
	// Polygons from these vertices
	this.addPolygon3(1,2,7, -hue, reflectivity);
	this.addPolygon3(3,4,2, -hue, reflectivity);
	this.addPolygon3(0,5,3, -hue, reflectivity);
	this.addPolygon3(6,0,1, -hue, reflectivity);
	this.addPolygon4(0,3,2,1, hue, reflectivity);
	this.addPolygon4(2,4,11,7, hue, reflectivity);
	this.addPolygon4(1,7,10,6, hue, reflectivity);
	this.addPolygon4(0,6,9,5, hue, reflectivity);
	this.addPolygon4(3,5,8,4, hue, reflectivity);
	this.addPolygon4(10,11,8,9, hue, reflectivity);
	this.addPolygon3(9,8,5,-hue, reflectivity);
	this.addPolygon3(7,11,10,-hue, reflectivity);
	this.addPolygon3(6,10,9,-hue, reflectivity);
	this.addPolygon3(11,4,8,-hue, reflectivity);

};


// Extend Polygon
vps.Utils.extend(vps.worldobjects.Coriolis, vps.WorldObject);