PolygonTestCase = TestCase("PolygonTestCase");

PolygonTestCase.prototype.testGetNormal = function() {
	var position = new vps.Coord3d(0, 0, 0);
	var rotation = new vps.RotationTransformationMatrix(new vps.Rotation(0,0,0));
	
	// Some vertices
	var v1 = new vps.Vertex(new vps.Coord3d(-10, 0, 10));
	var v2 = new vps.Vertex(new vps.Coord3d(10, 0, 10));
	var v3 = new vps.Vertex(new vps.Coord3d(10, 0, -10));
	var v4 = new vps.Vertex(new vps.Coord3d(-10, 0, -10));
	
	v1.updateAbsoluteCoords(rotation, position);
	v2.updateAbsoluteCoords(rotation, position);
	v3.updateAbsoluteCoords(rotation, position);
	v4.updateAbsoluteCoords(rotation, position);
	
	jstestdriver.console.log('v1 absolute pos = '+v1.absoluteCoords);
	
	var polygon = new vps.Polygon4(v1,v2,v3,v4,45);
	
	var normalVector = polygon.getNormal();
	
	jstestdriver.console.log('Normal is = '+normalVector);
	
	assertEquals("The x component is correct", 0, normalVector.x);
	assertEquals("The y component is correct", 1, normalVector.y);
	assertEquals("The z component is correct", 0, normalVector.z);
	
};