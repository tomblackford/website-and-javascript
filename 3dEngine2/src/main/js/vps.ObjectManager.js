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

	this.allPolygons = [];
	
	// Put all the polygons from all objects into an array
	for(var i=0; i<this.objects.length; i++){
		for(var j=0; j<this.objects[i].polygons.length; j++){
			this.allPolygons[this.allPolygons.length] = this.objects[i].polygons[j];
		}
	}
	
	// Order by proximity to the camera
	this.allPolygons.sort(function(p1, p2){
		return p2.distanceToFurthestPoint - p1.distanceToFurthestPoint;
	});
};

vps.ObjectManager.prototype.drawAll = function(ctx){

	// Draw them in the right order
	for(var k=0; k<this.allPolygons.length; k++){
		if(this.allPolygons[k].parentObject.visible){
			this.allPolygons[k].draw(ctx);
		}
	}
};
