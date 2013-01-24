vps = vps || {};
vps.behaviours = vps.behaviours || {};

/**
 * Construct LinearTransition
 */
vps.behaviours.LinearTransition = function(startState, endState, duration, callback){
	this.currentTime = 0;
	
	this.startState = startState;
	this.endState = endState;
	this.currentState = startState;
	
	this.duration = duration;
	this.callback = callback;
};

//Extend Transition
vps.Utils.extend(vps.behaviours.LinearTransition, vps.behaviours.Transition);

/**
 *
 */
vps.behaviours.LinearTransition.prototype.update = function(){

	// Amount is between 0 and 1
	var intAmount = (1/this.duration) * this.currentTime;

	this.currentState.rotation.x = this.interpolate(this.startState.rotation.x, this.endState.rotation.x, intAmount);
	this.currentState.rotation.y = this.interpolate(this.startState.rotation.y, this.endState.rotation.y, intAmount);
	this.currentState.rotation.z = this.interpolate(this.startState.rotation.z, this.endState.rotation.z, intAmount);

	this.currentState.position.x = this.interpolate(this.startState.position.x, this.endState.position.x, intAmount);
	this.currentState.position.y = this.interpolate(this.startState.position.y, this.endState.position.y, intAmount);
	this.currentState.position.z = this.interpolate(this.startState.position.z, this.endState.position.z, intAmount);
	
	// Call super implementation of this
	vps.behaviours.Transition.prototype.update.call(this, null);
};

/**
 * Get the appropriate value between 2 values
 * @param startVal	The initial value
 * @param endVal	The final value	
 * @param amount	Between 0 (initial) and 1 (final)
 * @returns
 */
vps.behaviours.LinearTransition.prototype.interpolate = function(startVal, endVal, amount){
	var incAmount = (endVal - startVal) * amount;
	
	return startVal + incAmount;	
};

