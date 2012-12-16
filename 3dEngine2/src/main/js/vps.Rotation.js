vps = vps || {};

vps.Rotation = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.cachedVectorKey = null;
	this.cachedVector = null;
	
};

vps.Rotation.prototype.toString = function(){
	return "Rotation ("+this.x+", "+this.y+", "+this.z+")";
};


/**
 * Answer a unit vector representation of this rotation. 
 * This is cached, so it doesn't need to be recalculated repeatedly
 * (until the underlying rotation changes)
 * @returns
 */
vps.Rotation.prototype.toVector = function(){
	
	var pos = new vps.Coord3d(0,0,0);
	var answer = null;
	var cacheKey = this.x +'_'+this.y+'_'+this.z;
	
	// Check for a cached representation of this rotation
	// If we can't find it, calc and store
	if(cacheKey == this.cachedVectorKey){
			answer = this.cachedVector;
	} else {
		console.log ('Calculating vector version of rotation '+this.toString());
		
		// Move a point from origin, with distance of 1
		// this will represent a unit vector 
		vps.GeometryUtils.moveInFacingDirection(pos, this, 1);
		
		answer = new vps.Vector3d(pos.x, pos.y, pos.z);
		answer.normalise();
		
		// Cache the vector version of this rotation
		this.cachedVectorKey = cacheKey;
		this.cachedVector = answer;
	}
	
	return answer;
};