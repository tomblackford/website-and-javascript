vps = vps || {};

vps.ObjectManager = function(){
	this.objects = [];
};

vps.ObjectManager.prototype.addObject = function(newObject){
	this.objects[this.objects.length] = newObject;
};

vps.ObjectManager.prototype.updateAll = function(cameraPosition, cameraRotation, viewerPostion){
	
	for(var i=0; i<this.objects.length; i++){
		// console.log('Updating object '+i);
		this.objects[i].update(cameraPosition, cameraRotation, viewerPosition);
	
	}
};

vps.ObjectManager.prototype.drawAll = function(ctx){
	
	for(var i=0; i<this.objects.length; i++){
		this.objects[i].draw(ctx);
	}
};