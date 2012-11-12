var vps = vps || {};

/**
 * Singleton providing geometry utility functions
 */
vps.GeometryUtils = function(){
	
	/**
	 * Move the passed position in the direction it is facing, by the passed amount
	 */
	var moveInFacingDirection = function(position, direction, amount) {
	  
		var xincrement =  Math.sin(0-direction.y) * amount;
		position.x += xincrement;
		
		var zincrement = Math.cos(0-direction.y) * amount;
		position.z += zincrement;
		
		var yincrement = Math.sin(direction.x) * amount;
		position.y += yincrement;
	};

	/**
	 * Answer a vector between the two points
	 */
	var createVector3d = function(start, end){	

		var x = end.x - start.x;
		var y = end.y - start.y; 
		var z = end.z - start.z;
		
		return new vps.Vector3d(x,y,z);
	};
	
	return {
		moveInFacingDirection : moveInFacingDirection,
		createVector3d : createVector3d
	};

}();