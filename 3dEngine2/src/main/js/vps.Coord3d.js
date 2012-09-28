vps = vps || {};

/**
 * Represents a co-ordinate in 3 dimensions
 * @param x
 * @param y
 * @param z
 * @returns {vps.Coord3d}
 */
vps.Coord3d = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
};