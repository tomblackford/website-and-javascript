vps = vps || {};

/**
 * A polygon with 3 points
 */
vps.Polygon3 = function(v1, v2, v3, hue, reflectivity){
	// Call parent constructor
	vps.Polygon3.baseConstructor.call(this, hue, reflectivity);
	
	this.addVertex(v1);
	this.addVertex(v2);
	this.addVertex(v3);
	
};


// Extend Polygon
vps.Utils.extend(vps.Polygon3, vps.Polygon);