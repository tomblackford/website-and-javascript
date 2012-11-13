vps = vps || {};

/**
 * Construct a Flat shader 
 */
vps.FlatShader = function(lightVector, ambientLight){
	
	this.lightVector = lightVector;
	this.ambientLight = ambientLight;

};


/**
 * Answer the colour for the passed polygon
 * @param vertex
 */
vps.FlatShader.prototype.shade = function(polygon){
	
	// the raw brightness, 
	var brightness = Math.round((this.ambientLight + (this.lightVector.dotProduct(polygon.getNormal())) * polygon.reflectivity)*100);
	
	// an hsl colour based on the hue and brightness
	var colour = 'hsl('+polygon.hue+', 100%, '+brightness/2+'%)';
	//console.log(colour);
	
	return colour;
};