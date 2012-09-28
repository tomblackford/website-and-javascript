TranslationTransformationTestCase = TestCase("TranslationTransformationTestCase");

TranslationTransformationTestCase.prototype.testNoTranslation = function() {

	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test no rotation
	var noTranslation = new vps.Coord3d(0, 0, 0);
	var noTranslationTransformationMatrix = new vps.TranslationTransformationMatrix(noTranslation);
	var coord1a = new vps.Coord3d(0, 0, 0);
	noTranslationTransformationMatrix.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertEquals("x pos is wrong", 1, coord1a.x);
	assertEquals("y pos is wrong", 0, coord1a.y);
	assertEquals("z pos is wrong", 0, coord1a.z);
};

TranslationTransformationTestCase.prototype.testXTranslation = function() {

	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test no rotation
	var xTranslation = new vps.Coord3d(1, 0, 0);
	var xTranslationTransformationMatrix = new vps.TranslationTransformationMatrix(xTranslation);
	var coord1a = new vps.Coord3d(0, 0, 0);
	xTranslationTransformationMatrix.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertEquals("x pos is wrong", 2, coord1a.x);
	assertEquals("y pos is wrong", 0, coord1a.y);
	assertEquals("z pos is wrong", 0, coord1a.z);
};

TranslationTransformationTestCase.prototype.testYTranslation = function() {

	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test no rotation
	var yTranslation = new vps.Coord3d(0, 2, 0);
	var yTranslationTransformationMatrix = new vps.TranslationTransformationMatrix(yTranslation);
	var coord1a = new vps.Coord3d(0, 0, 0);
	yTranslationTransformationMatrix.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertEquals("x pos is wrong", 1, coord1a.x);
	assertEquals("y pos is wrong", 2, coord1a.y);
	assertEquals("z pos is wrong", 0, coord1a.z);
};

TranslationTransformationTestCase.prototype.testZTranslation = function() {

	var coord1 = new vps.Coord3d(1, 0, 0);

	// Test no rotation
	var zTranslation = new vps.Coord3d(0, 0, 3);
	var zTranslationTransformationMatrix = new vps.TranslationTransformationMatrix(zTranslation);
	var coord1a = new vps.Coord3d(0, 0, 0);
	zTranslationTransformationMatrix.apply(coord1, coord1a);

	// Check the values of the destination coordinate
	assertEquals("x pos is wrong", 1, coord1a.x);
	assertEquals("y pos is wrong", 0, coord1a.y);
	assertEquals("z pos is wrong", 3, coord1a.z);
};