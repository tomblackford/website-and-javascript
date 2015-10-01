vps = vps || {};
vps.behaviours = vps.behaviours || {};

/**
 * Construct Orbit
 */
vps.behaviours.Orbit = function(centreCoord3d, radius, duration, callback){
	this.currentTime = 0;
	
	this.centre = centreCoord3d;
	this.duration = duration;
	this.callback = callback;
	this.radius = radius;
	
	this.currentState = new vps.BehaviourState(new vps.Coord3d(0,0,0), null);	
	this.update();

};

//Extend Behaviour
vps.Utils.extend(vps.behaviours.Orbit, vps.Behaviour);

/**
 *
 */
vps.behaviours.Orbit.prototype.update = function(){
	
	var angle = (Math.PI*2) * (this.currentTime / this.duration);
	//jstestdriver.console.log('angle = '+angle);

	this.currentState.position.x = this.centre.x + (this.radius * Math.cos(angle));
	//jstestdriver.console.log('x = '+this.currentState.position.x);

	this.currentState.position.y = this.centre.y + (this.radius * Math.sin(angle));
	//jstestdriver.console.log('y = '+this.currentState.position.y);
		
	if(this.currentTime==this.duration){
		this.callback(this);
	} else {
		++this.currentTime;
	}
};