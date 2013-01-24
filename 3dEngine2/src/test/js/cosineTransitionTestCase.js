CosineTransitionTestCase = TestCase("CosineTransitionTestCase");

CosineTransitionTestCase.prototype.testcosineTransition = function() {
 
	var startPos = new vps.Coord3d(0,0,0);
	var endPos = new vps.Coord3d(10,10,10);
	
	var startRot = new vps.Rotation(0, 0, 0);
	var endRot = new vps.Rotation(10, 10, 10);
	
	var startState = new vps.BehaviourState (startPos, startRot);
	var endState = new vps.BehaviourState (endPos, endRot);
	
	// A callback which just sets a global variable
	var callbackFunc = function(){
		newVar = true;
	};
	
	var cosineTransition = new vps.behaviours.CosineTransition(startState, endState, 100, callbackFunc);

	assertEquals("The initial x position is correct", 0, cosineTransition.currentState.position.x);
	assertEquals("The initial y position is correct", 0, cosineTransition.currentState.position.y);
	assertEquals("The initial z position is correct", 0, cosineTransition.currentState.position.z);
	
	cosineTransition.currentTime = 100;
	cosineTransition.update();
	assertEquals("The final x position is correct", 10, cosineTransition.currentState.position.x);
	assertEquals("The final y position is correct", 10, cosineTransition.currentState.position.y);
	assertEquals("The final z position is correct", 10, cosineTransition.currentState.position.z);
	
	assertEquals("The callback was called", newVar, true);
	
};
