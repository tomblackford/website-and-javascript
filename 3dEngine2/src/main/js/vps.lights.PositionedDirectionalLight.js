vps = vps || {};
vps.lights = vps.lights || {};

/**
 * A directional light eminating from a particular position 
 */
vps.lights.PositionedDirectionalLight = function(name, brightness, vectorDirection, position){
	
	// Call parent constructor
	vps.lights.PositionedDirectionalLight.baseConstructor.call(this, name, brightness, vectorDirection);
	
	this.position = position;
};


// Extend the directional light class
vps.Utils.extend(vps.lights.PositionedDirectionalLight, vps.lights.DirectionalLight);


/**
 * Apply a multiplier to the basic brightness based on how much the polygon in facing the lightsource
 * @param polygon
 */
vps.lights.PositionedDirectionalLight.prototype.getPolygonBrightness = function(polygon){
	var polyBrightness = vps.lights.PositionedDirectionalLight.superClass.getPolygonBrightness(polygon);
	
	//
	
	
	return polyBrightness;
};