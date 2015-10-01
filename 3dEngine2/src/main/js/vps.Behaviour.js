vps = vps || {};

vps.Behaviour = function(){
	this.currentState = null;
};

vps.Behaviour.prototype.apply = function(worldObject){
	
	// Apply this behaviour to the passed object
	if(this.currentState.position!=null){
		worldObject.position.x = this.currentState.position.x;
		worldObject.position.y = this.currentState.position.y;
		worldObject.position.z = this.currentState.position.z;
	}
	
	if(this.currentState.rotation!=null){
		worldObject.rotation.x = this.currentState.rotation.x;
		worldObject.rotation.y = this.currentState.rotation.y;
		worldObject.rotation.z = this.currentState.rotation.z;
	}
	
	
};