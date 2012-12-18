vps = vps || {};
vps.lights = vps.lights || {};

/**
 * An basic (uniform) light which comes from a particular direction
 */
vps.lights.DirectionalLight = function(name, brightness, vectorDirection){
	
	// Call parent constructor
	vps.lights.DirectionalLight.baseConstructor.call(this, name, brightness);
	
	this.vectorDirection = vectorDirection;
};


// Extend the basic light class
vps.Utils.extend(vps.lights.DirectionalLight, vps.lights.Light);


/**
 * Apply a multiplier to the basic brightness based on how much the 
 * polygon in facing the lightsource
 * @param polygon
 */
vps.lights.DirectionalLight.prototype.getBrightness = function(polygon){
	var polyBrightness = vps.lights.DirectionalLight.superClass.getBrightness.call(this,polygon);
	
	polyBrightness = ((this.vectorDirection.dotProduct(polygon.getNormal())) * polygon.reflectivity)*(polyBrightness);
	//console.log("light '"+this.name+"' directional brightness is "+polyBrightness);
	
	return polyBrightness;
};
