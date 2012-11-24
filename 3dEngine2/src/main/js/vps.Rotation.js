vps = vps || {};

vps.Rotation = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
	
};

vps.Rotation.prototype.toString = function(){
	return "Rotation ("+this.x+", "+this.y+", "+this.z+")";
};


vps.Rotation.prototype.toVector = function(){
	var pos = new vps.Coord3d(0,0,0);
	
	// Move a point from origin, with distance of 1
	// this will represent a unit vector 
	vps.GeometryUtils.moveInFacingDirection(pos, this, 1);
	
	return new vps.Vector3d(pos.x, pos.y, pos.z);
};