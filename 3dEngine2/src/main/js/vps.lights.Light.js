/**
 * Represents a very basic light - effectively behaving like ambient light
 * as it has no position or direction and is of uniform brightness.
 */
vps = vps || {};
vps.lights = vps.lights || {};

/**
 * Create a new light with the given name and brightness
 * @param name
 * @param brightness Should be between 0 and 1
 * @returns {vps.Light}
 */
vps.lights.Light = function(name, brightness){
	this.name = name;
	this.brightness = brightness;
};


/**
 * Answer the brightness this light contributes to the passed polygon.
 * In this case the light is uniform (ie ambient) so brightness always the same
 * regardless of position / direction of light
 * @param polygon
 */
vps.lights.Light.prototype.getBrightness = function(polygon){
	//console.log("light '"+this.name+"' basic brightness is "+this.brightness);
	return this.brightness;
};

vps.lights.Light.prototype.toString = function(){
	return 'Light (brightness='+this.brightness+')';
};