vps = vps || {};
vps.behaviours = vps.behaviours || {};

/**
 * Construct CosineTransition
 */
vps.behaviours.CosineTransition = function(startState, endState, duration, callback){
	vps.behaviours.CosineTransition.baseConstructor.call(this, startState, endState, duration, callback);
};

//Extend Transition
vps.Utils.extend(vps.behaviours.CosineTransition, vps.behaviours.LinearTransition);


/**
 * Get the appropriate value between 2 values
 * @param startVal	The initial value
 * @param endVal	The final value	
 * @param amount	Between 0 (initial) and 1 (final)
 * @returns
 */
vps.behaviours.CosineTransition.prototype.interpolate = function(startVal, endVal, amount){
	var t2 = (1-Math.cos(amount*Math.PI))/2;
	return (startVal*(1-t2)) + (endVal*(t2));
};

