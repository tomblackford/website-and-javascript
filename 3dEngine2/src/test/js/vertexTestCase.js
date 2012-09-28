VertexTestCase = TestCase("VertexTestCase");

VertexTestCase.prototype.testAbsolutePositionMovementOnly = function() {

	var test1 = new vps.Vertex(1,1,1);
	
	var noRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0,0,0));
	var worldPosition = new vps.Coord3d(-5,5,10);
	
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	assertEquals("The x position is correct", -4, test1.absolutePosition.x);
	assertEquals("The y position is correct", 6, test1.absolutePosition.y);
	assertEquals("The z position is correct", 11, test1.absolutePosition.z);
	
};

/**
 * 
 */
VertexTestCase.prototype.testAbsolutePositionRotationOnly = function() {

};
