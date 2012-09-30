vps = vps || {};

vps.Coord2d = function (x, y){
	this.x = x;
	this.y = y;
};

vps.Coord2d.prototype.toString = function(){
	return "Coord2d ("+this.x+", "+this.y+")";
};