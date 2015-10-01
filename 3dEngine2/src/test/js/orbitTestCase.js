OrbitTestCase = TestCase("OrbitTestCase");

OrbitTestCase.prototype.testOrbit = function() {
	
	var obj1 = new vps.worldobjects.Coriolis('obj1', 100, 0.5);
	obj1.rotation = new vps.Rotation(0,0,0);
	obj1.position = new vps.Coord3d(0,0,0);	
	
	var centre = new vps.Coord3d(0,0,0);
	
	// A callback which just sets a global variable
	var callbackFunc = function(){
		newVar = true;
	};
	
	var orbit = new vps.behaviours.Orbit(centre, 10, 100, callbackFunc);

	//assertEquals("The initial x position is correct", 10, orbit.currentState.position.x);
	//assertEquals("The initial y position is correct", 0, orbit.currentState.position.y);
	
	orbit.currentTime = 25;
	orbit.update();
	//assertEquals("The quarter point x position is correct", 0, orbit.currentState.position.x);
	//assertEquals("The quarter point y position is correct", 10, orbit.currentState.position.y);
	
	orbit.currentTime = 50;
	orbit.update();
	orbit.apply(obj1);
	jstestdriver.console.log('obj1 x = '+obj1.position.x);
	jstestdriver.console.log('obj1 y = '+obj1.position.y);
	
	
	//assertEquals("The midpoint x position is correct", -10, orbit.currentState.position.x);
	//assertEquals("The midpoint y position is correct", 0, orbit.currentState.position.y);
	
	orbit.currentTime = 75;
	orbit.update();
	//assertEquals("The 3 quarter point x position is correct", 0, orbit.currentState.position.x);
	//assertEquals("The 3 quarter point y position is correct", -10, orbit.currentState.position.y);
	
	orbit.currentTime = 100;
	orbit.update();
	//assertEquals("The final x position is correct", 0, orbit.currentState.position.x);
	//assertEquals("The final y position is correct", -10, orbit.currentState.position.y);
	
	assertEquals("The callback was called", newVar, true);

};
