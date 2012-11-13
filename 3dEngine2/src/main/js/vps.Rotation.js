vps = vps || {};

vps.Rotation = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
};

vps.Rotation.prototype.toString = function(){
	return "Rotation ("+this.x+", "+this.y+", "+this.z+")";
};