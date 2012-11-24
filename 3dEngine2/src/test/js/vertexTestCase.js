VertexTestCase = TestCase("VertexTestCase");

VertexTestCase.prototype.testAbsolutePositionMovementOnly = function() {

	var test1 = new vps.Vertex(new vps.Coord3d(1,1,1));
	
	var noRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0,0,0));
	var worldPosition = new vps.Coord3d(-5,5,10);
	
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	assertEquals("The x position is correct", -4, test1.absoluteCoords.x);
	assertEquals("The y position is correct", 6, test1.absoluteCoords.y);
	assertEquals("The z position is correct", 11, test1.absoluteCoords.z);
	
};

VertexTestCase.prototype.testAbsolutePositionRotationOnly = function() {

	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	var xRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0, Math.PI,0));
	var worldPosition = new vps.Coord3d(0,0,0);
	
	test1.updateAbsoluteCoords(xRotationTransformation, worldPosition);
	
	assertEquals("The x position is correct", -5, test1.absoluteCoords.x);
	assertTrue("The y position is correct", test1.absoluteCoords.y < 0.0001);
	assertTrue("The z position is correct", test1.absoluteCoords.z < 0.0001);
};

VertexTestCase.prototype.testAbsolutePositionRotationAndMovement = function() {

	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	var xRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0, 0, Math.PI/2));
	var worldPosition = new vps.Coord3d(0,0,4);
	
	test1.updateAbsoluteCoords(xRotationTransformation, worldPosition);

	assertTrue("The x position is correct", test1.absoluteCoords.x < 0.0001);
	assertTrue("The y position is correct", test1.absoluteCoords.y == 5);
	assertTrue("The z position is correct", test1.absoluteCoords.z == 4);
};

VertexTestCase.prototype.testCameraTransformCameraMoved = function() {
	
	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	// Transform the test vertex to 10,5,5 in absolute world coordinate system
	var noRotation = new vps.Rotation(0,0,0);
	var noRotationTransformation = new vps.RotationTransformationMatrix(noRotation);
	var worldPosition = new vps.Coord3d(5,5,5);
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	// Now update the camera relative coordinates of the vertex (based on camera at -10,-5,-5, pointing down z axis)
	var cameraPosition = new vps.Coord3d(-10,-5,-5);
	test1.updatePOVCoords(noRotationTransformation, cameraPosition, noRotation);
	
	assertEquals("The x position is correct", 20, test1.povCoords.x);
	assertEquals("The y position is correct", 10, test1.povCoords.y);
	assertEquals("The z position is correct", 10, test1.povCoords.z);
};


VertexTestCase.prototype.testCameraTransformCameraRotated = function() {
	
	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	// Transform the test vertex to 10,0,0 in absolute world coordinate system
	var noRotation = new vps.Rotation(0,0,0);
	var noRotationTransformation = new vps.RotationTransformationMatrix(noRotation);
	var worldPosition = new vps.Coord3d(5,0,0);
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	// Now update the camera relative coordinates of the vertex (based on camera at origin, rotated 90 degrees about y) 
	var yRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0,Math.PI/2,0));
	var cameraPosition = new vps.Coord3d(0,0,0);
	test1.updatePOVCoords(yRotationTransformation, cameraPosition, noRotation);
	
	assertTrue("The x position is correct", test1.povCoords.x < 0.0001);
	assertTrue("The y position is correct", test1.povCoords.y < 0.001);
	assertEquals("The z position is correct", -10, test1.povCoords.z);
};

VertexTestCase.prototype.testCameraTransformCameraRotated = function() {
	
	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	// Transform the test vertex to 10,0,0 in absolute world coordinate system
	var noRotation = new vps.Rotation(0,0,0);
	var noRotationTransformation = new vps.RotationTransformationMatrix(noRotation);
	var worldPosition = new vps.Coord3d(5,0,0);
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	// Now update the camera relative coordinates of the vertex (based on camera at origin, rotated 90 degrees about y) 
	var yRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0,Math.PI/2,0));
	var cameraPosition = new vps.Coord3d(0,0,0);
	test1.updatePOVCoords(yRotationTransformation, cameraPosition, noRotation);
	
	assertTrue("The x position is correct", test1.povCoords.x < 0.0001);
	assertTrue("The y position is correct", test1.povCoords.y < 0.001);
	assertEquals("The z position is correct", -10, test1.povCoords.z);
};


VertexTestCase.prototype.testCameraTransformCameraRotatedAndMoved = function() {
	
	var test1 = new vps.Vertex(new vps.Coord3d(5,0,0));
	
	// Leave vertex at 5,0,0 in world space
	var noRotation = new vps.Rotation(0,0,0);
	var noRotationTransformation = new vps.RotationTransformationMatrix(noRotation);
	var worldPosition = new vps.Coord3d(0,0,0);
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	// Now update the camera relative coordinates of the vertex (based on camera at -2,4,2, rotated 45 degrees about y) 
	var yRotationTransformation = new vps.RotationTransformationMatrix(new vps.Rotation(0,Math.PI/4,0));
	var cameraPosition = new vps.Coord3d(-2,4,2);
	test1.updatePOVCoords(yRotationTransformation, cameraPosition, noRotation);
	
	assertEquals("The x position is correct", 3.5355339059327378, test1.povCoords.x);
	assertEquals("The y position is correct", -4, test1.povCoords.y);
	assertEquals("The z position is correct", -6.363961030678927, test1.povCoords.z);
};

VertextTestCase.prototype.testFieldOfViewCheck = function() {
	
	// A vertex (at origin in local coords) which is moved a bit along the Z axis
	var test1 = new vps.Vertex(new vps.Coord3d(0,0,0));
	var noRotation = new vps.Rotation(0,0,0);
	var noRotationTransformation = new vps.RotationTransformationMatrix(noRotation);
	var worldPosition = new vps.Coord3d(0,0,0);
	test1.updateAbsoluteCoords(noRotationTransformation, worldPosition);
	
	// Now place the camera at the origin, looking along the Z axis
	var cameraPosition = new vps.Coord3d(0,0,0);
	test1.updatePOVCoords(noRotationTransformation, cameraPosition, noRotation);
	
	assertTrue("The vertex should be in the field of view", test1.insideFieldOfView);
	
	// Now turn the camera 90deg - should be outside the field of view
	var alongXAxis = new vps.Rotation(0, Math.PI/2, 0);
	test1.updatePOVCoords(noRotationTransformation, cameraPosition, alongXAxis);
	assertFalse("The vertex should not be in the field of view", test1.insideFieldOfView);
	
	// Now turn the camera 180deg - should be outside the field of view
	var backAlongZAxis = new vps.Rotation(0, Math.PI, 0);
	test1.updatePOVCoords(noRotationTransformation, cameraPosition, backAlongZAxis);
	assertFalse("The vertex should not be in the field of view", test1.insideFieldOfView);
	
	
	// Now move the vertex to the o
	
};
