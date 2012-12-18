vps = vps || {};

/**
 * Represents a vector in 3 dimensions
 * @param x
 * @param y
 * @param z
 * @returns {vps.Vector3d}
 */
vps.Vector3d = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
};

vps.Vector3d.prototype.crossProduct = function(vector){
	var ox = (this.y * vector.z) - (vector.y * this.z);
	var oy = (this.z * vector.x) - (vector.z * this.x);
	var oz = (this.x * vector.y) - (vector.x * this.y);
	
	return new vps.Vector3d(ox, oy, oz);
};

vps.Vector3d.prototype.dotProduct = function(vector){
	return (this.x * vector.x) + (this.y * vector.y) + (vector.z * this.z);
};

vps.Vector3d.prototype.normalise = function(){
	var length = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z));
	
	this.x = this.x/length;
	this.y = this.y/length;
	this.z = this.z/length;
};

vps.Vector3d.prototype.distance = function(){
	return Math.abs(Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z)));
};

vps.Vector3d.prototype.toString = function(){
	return "Vector3d ("+this.x+", "+this.y+", "+this.z+")";
};