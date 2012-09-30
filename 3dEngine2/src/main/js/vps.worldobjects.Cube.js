vps = vps || {};
vps.worldobjects = vps.worldobjects || {};

/**
 * A cube
 */
vps.worldobjects.Cube = function(){
	// Call parent constructor
	vps.worldobjects.Cube.baseConstructor.call(this);
	
	var sp = 100;
	var shade = 'hsla(60,100%,100%,1.0)';
	
	// The vertices which make up the shape
	this.addVertex(new vps.Vertex(new vps.Coord3d(-sp, -sp,  sp)));		// 0
	this.addVertex(new vps.Vertex(new vps.Coord3d(sp, -sp,  sp)));		// 1
	this.addVertex(new vps.Vertex(new vps.Coord3d(sp, -sp, -sp)));		// 2
	this.addVertex(new vps.Vertex(new vps.Coord3d(-sp, -sp, -sp)));		// 3
	this.addVertex(new vps.Vertex(new vps.Coord3d(-sp,  sp,  sp)));		// 4
	this.addVertex(new vps.Vertex(new vps.Coord3d(sp,  sp,  sp)));		// 5
	this.addVertex(new vps.Vertex(new vps.Coord3d(sp,  sp, -sp)));		// 6
	this.addVertex(new vps.Vertex(new vps.Coord3d(-sp,  sp, -sp)));		// 7
		
	// Now make polygons out of these
	this.addPolygon(new vps.Polygon4(this.vertices[0], this.vertices[4], this.vertices[5], this.vertices[1]), shade);
	this.addPolygon(new vps.Polygon4(this.vertices[7], this.vertices[3], this.vertices[2], this.vertices[6]), shade);
	this.addPolygon(new vps.Polygon4(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]), shade);
	this.addPolygon(new vps.Polygon4(this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2]), shade);
	this.addPolygon(new vps.Polygon4(this.vertices[4], this.vertices[0], this.vertices[3], this.vertices[7]), shade);
	this.addPolygon(new vps.Polygon4(this.vertices[5], this.vertices[4], this.vertices[7], this.vertices[6]), shade);
};


// Extend Polygon
vps.Utils.extend(vps.worldobjects.Cube, vps.WorldObject);