vps = vps || {};

/**
 * A polygon with 4 points
 */
vps.Polygon4 = function(v1, v2, v3, v4, hue, reflectivity){
	// Call parent constructor
	vps.Polygon4.baseConstructor.call(this, hue, reflectivity);
	
	this.addVertex(v1);
	this.addVertex(v2);
	this.addVertex(v3);
	this.addVertex(v4);
	
};


// Extend Polygon
vps.Utils.extend(vps.Polygon4, vps.Polygon);