RotationTransformationTestCase = TestCase("RotationTransformationTestCase");

RotationTransformationTestCase.prototype.testNoRotation = function() {

	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test no rotation
	var noRotation = new vps.Rotation(0, 0, 0);
	var noRotationTransformationMatrix = new vps.RotationTransformationMatrix(noRotation);
	var coord1a = new vps.Coord3d(0, 0, 0);
	noRotationTransformationMatrix.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertEquals("x pos is wrong", 1, coord1a.x);
	assertEquals("y pos is wrong", 0, coord1a.y);
	assertEquals("z pos is wrong", 0, coord1a.z);
};

/**
 * Test a simple rotation around each axis
 */
RotationTransformationTestCase.prototype.testSimpleRotation = function() {
	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test 90 degree rotation about Y axis
	var testRotation1 = new vps.Rotation(0, Math.PI / 2.0, 0);
	var testTransformationMatrix1 = new vps.RotationTransformationMatrix(testRotation1);
	var coord1a = new vps.Coord3d(0, 0, 0);
	testTransformationMatrix1.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertTrue("x pos is wrong", coord1a.x < 0.00001);
	assertTrue("y pos is wrong", coord1a.y == 0);
	assertTrue("z pos is wrong", coord1a.z == -1);
	
	// Test 90 degree rotation about Z axis
	var testRotation2 = new vps.Rotation(0, 0, Math.PI / 2.0);
	var testTransformationMatrix2 = new vps.RotationTransformationMatrix(testRotation2);
	var coord1b = new vps.Coord3d(0, 0, 0);
	testTransformationMatrix2.apply(coord1, coord1b);

	// Check the values of the destination coordinate
	assertTrue("x pos is wrong", coord1b.x < 0.00001);
	assertTrue("y pos is wrong", coord1b.y == 1);
	assertTrue("z pos is wrong", coord1b.z == 0);

};
