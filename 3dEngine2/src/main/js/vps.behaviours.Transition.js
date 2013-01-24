vps = vps || {};
vps.behaviours = vps.behaviours || {};

/**
 * Construct Transition
 */
vps.behaviours.Transition = function(){
	this.callback = null;
	this.currentTime = 0;
};


//Extend Behaviour
vps.Utils.extend(vps.behaviours.Transition, vps.Behaviour);


/**
 *
 */
vps.behaviours.Transition.prototype.update = function(){

	if(this.currentTime==this.duration){
		if(this.callback){
			this.callback(this);
		}
	} else {
		++this.currentTime;
	}

};

vps.behaviours.Transition.prototype.apply = function(worldObject){
	worldObject.position = currentState.position;
	worldObject.rotation = currentState.rotation;
};

