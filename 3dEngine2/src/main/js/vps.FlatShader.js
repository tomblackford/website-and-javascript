vps = vps || {};

/**
 * Construct a Flat shader 
 */
vps.FlatShader = function(){
	
};


/**
 * Answer the colour for the passed polygon
 * @param vertex
 */
vps.FlatShader.prototype.shade = function(polygon, lights){
	
	// the raw brightness, 
	//var brightness = Math.round((this.ambientLight + (this.lightVector.dotProduct(polygon.getNormal())) * polygon.reflectivity)*50);
	
	// Apply each light to the passed polygon, summing up the total brightness
	var brightness = 0;
	for(var i=0; i<lights.length; i++){
		brightness += lights[i].getBrightness(polygon);
	}
	
	brightness = brightness * 100;
	
	// an hsl colour based on the hue and brightness
	var colour = 'hsl('+polygon.hue+', 100%, '+brightness/2+'%)';
	//console.log(colour);
	
	return colour;
};