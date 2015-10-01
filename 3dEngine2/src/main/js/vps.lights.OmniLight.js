vps = vps || {};
vps.lights = vps.lights || {};

/**
 * An omnidirectional point light source, which decays linearly with distance
 */
vps.lights.OmniLight = function(name, brightness, position, range){
	
	// Call parent constructor
	vps.lights.OmniLight.baseConstructor.call(this, name, brightness);
	
	this.position = position;
	this.range = range; 
};


// Extend the basic light class
vps.Utils.extend(vps.lights.OmniLight, vps.lights.Light);


/**
 * Get the brightness of the passed polygon for this omnidirectional light
 * @param polygon
 */
vps.lights.OmniLight.prototype.getBrightness = function(polygon){
	var polyBrightness = vps.lights.OmniLight.superClass.getBrightness.call(this,polygon);
	var polygonMidpointPosition = polygon.getMidpointPosition();

	var distanceVector = vps.GeometryUtils.vectorBetween(polygonMidpointPosition, this.position);

	// Apply 3 multipliers - the distance from the light, the angle to the light and 
	// the surface's reflectivity
	polyBrightness = polyBrightness * this.getRangeMultiplier(polygonMidpointPosition, distanceVector);
	if(polyBrightness>0){
		distanceVector.normalise();
		polyBrightness = polyBrightness * this.getDirectionalMultiplier(polygonMidpointPosition, polygon.getNormal(), distanceVector);
	}
	if(polyBrightness>0){
		polyBrightness = polyBrightness * polygon.reflectivity;
	}
	return polyBrightness;
};

/**
 * Answer the multiplier for the light brightness based on how much the 
 * polygon is facing the light source. Should be between 1 (polygon facing 
 * directly at light) and 0 polygon is facing completely opposite direction.
 */
vps.lights.OmniLight.prototype.getDirectionalMultiplier = function (polygonMidpointPosition, polygonNormal, distanceVector){
	var answer = 0;

	// Decay the distance based on angle of poly to light
	answer = distanceVector.dotProduct(polygonNormal);
	if(answer<0){
		answer = 0;
	}
	return answer;
};

/**
 * Answer the multiplier for the light brightness based on the distance
 * between the polygon and the light source. Should be between 1 (polygon on
 * top of light) and 0 polygon is outside range of light.
 */
vps.lights.OmniLight.prototype.getRangeMultiplier = function (polygonMidpointPosition, distanceVector){
	var answer = 0;
	
	var distanceToPoly = distanceVector.distance();
	var diff = (this.range) - distanceToPoly;
	if (diff>0) {
		answer = diff/this.range;
	}
	
	return answer;

};

vps.lights.OmniLight.prototype.toString = function(){
	return 'OmniLight (brightness='+this.brightness+', position='+this.position+', range='+this.range+')';
};