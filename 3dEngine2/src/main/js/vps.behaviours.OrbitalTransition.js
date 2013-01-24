vps = vps || {};
vps.behaviours = vps.behaviours || {};

/**
 * Construct OrbitalTransition
 */
vps.behaviours.OrbitalTransition = function(startState, endState, duration, callback){
	this.currentTime = 0;
	
	this.startState = startState;
	this.endState = endState;
	this.currentState = startState;
	
	this.duration = duration;
	this.callback = callback;
};


/**
 *
 */
vps.transitions.OrbitalTransition.prototype.update = function(){

	// Amount is between 0 and 1
	var intAmount = (1/this.duration) * this.currentTime;

	var rotateX = this.interpolate(this.startState.rotation.x, this.endState.rotation.x, intAmount);
	var rotateY = this.interpolate(this.startState.rotation.y, this.endState.rotation.y, intAmount);
	var rotateZ = this.interpolate(this.startState.rotation.z, this.endState.rotation.z, intAmount);

	var posX = this.interpolate(this.startState.position.x, this.endState.position.x, intAmount);
	var posY = this.interpolate(this.startState.position.y, this.endState.position.y, intAmount);
	var posZ = this.interpolate(this.startState.position.z, this.endState.position.z, intAmount);
	
	var currentPosition = new vps.Coord3d (posX, posY, posZ);
	var currentRotation = new vps.Rotation (rotateX, rotateY, rotateZ);
	
	if(this.currentTime==this.duration){
		this.callback(this);
	} else {
		++this.currentTime;
	}
	
	this.currentState.position = currentPosition;
	this.currentState.rotation = currentRotation;
};

