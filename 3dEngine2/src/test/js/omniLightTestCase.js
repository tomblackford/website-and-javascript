OmniLightTestCase = TestCase("OmniLightTestCase");

OmniLightTestCase.prototype.testDistanceDecay = function() {

	var omniLight = new vps.lights.OmniLight("test", 1.0, new vps.Coord3d(0,0,0), 100);
	
	var onTopOfPoly = new vps.Coord3d(0,0,0);
	assertEquals("The brightness decays with distance", 1, omniLight.getRangeMultiplier(onTopOfPoly));
	
	var atHalfRange = new vps.Coord3d(0,50,0);
	assertEquals("The brightness decays with distance", 0.5, omniLight.getRangeMultiplier(atHalfRange));
	
	var atRange = new vps.Coord3d(0,0,100);
	assertEquals("The brightness decays with distance", 0, omniLight.getRangeMultiplier(atRange));
	
	var wayOutOfRange = new vps.Coord3d(5000,0,0);
	assertEquals("The brightness decays with distance", 0, omniLight.getRangeMultiplier(wayOutOfRange));
	
};

OmniLightTestCase.prototype.testDirectionalDecay = function() {

	var omniLight = new vps.lights.OmniLight("test", 1.0, new vps.Coord3d(0,0,0), 100);
	
	// A polygon facing back along the Y axis directly at the light
	// Should be at full brightness
	var poly1position = new vps.Coord3d(0,50,0);
	var poly1normal = new vps.Vector3d(0, -1, 0);
	//assertEquals("The brightness decays with angle to light", 1, omniLight.getDirectionalMultiplier(poly1position, poly1normal));
	
	// A polygon facing along the Y axis directly away from the light
	// Should be at zero brightness
	var poly2position = new vps.Coord3d(0,50,0);
	var poly2normal = new vps.Vector3d(0, 1, 0);
	//assertEquals("The brightness decays with angle to light", 0, omniLight.getDirectionalMultiplier(poly2position, poly2normal));
	
	// A polygon facing back at 45degrees to light light
	// Should be at half brightness
	var poly3position = new vps.Coord3d(0,50,0);
	var poly3normal = new vps.Vector3d(0, -0.5, -0.5);
	poly3normal.normalise();
	//assertEquals("The brightness decays with angle to light", 0.5, omniLight.getDirectionalMultiplier(poly3position, poly3normal));
	
	
};