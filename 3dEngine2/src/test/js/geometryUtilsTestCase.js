GeometryUtilsTestCase = TestCase("GeometryUtilsTestCase");

GeometryUtilsTestCase.prototype.testMoveInFacingDirection = function() {

	var oneDegree = Math.PI/180;
	
	// Try moving it along the default direction (ie along the Z axis)
	var position = new vps.Coord3d(0,0,0);
	var trajectory = new vps.Rotation(0, 0, 0);
	vps.GeometryUtils.moveInFacingDirection(position, trajectory, 100);
	
	assertEquals("The z position is correct", 100, position.z);
	assertEquals("The x position is correct", 0, position.x);
	assertEquals("The y position is correct", 0, position.y);

	// Try moving it backwards along the Z axis (ie facing 180degress around Y axis)
	position = new vps.Coord3d(0, 0, 0);
	trajectory = new vps.Rotation(0, 180*oneDegree, 0);
	vps.GeometryUtils.moveInFacingDirection(position, trajectory, 100);

	assertEquals("The z position is correct", -100, position.z);
	assertEquals("The x position is correct", 0, Math.round(position.x));
	assertEquals("The y position is correct", 0, Math.round(position.y));
	
	// Try moving it along the X axis (ie facing 90degress around Y axis)
	position = new vps.Coord3d(0, 0, 0);
	trajectory = new vps.Rotation(0, 90*oneDegree, 0);
	vps.GeometryUtils.moveInFacingDirection(position, trajectory, 100);
		
	assertEquals("The z position is correct", 0, Math.round(position.z));
	assertEquals("The x position is correct", -100, Math.round(position.x));
	assertEquals("The y position is correct", 0, Math.round(position.y));
};

