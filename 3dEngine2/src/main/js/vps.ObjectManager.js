vps = vps || {};

vps.ObjectManager = function(){
	this.objects = [];
	
	this.fps = 0;
	this.lastUpdate = (new Date)*1 - 1;
	this.fpsFilter = 50;
	
};

vps.ObjectManager.prototype.addObject = function(newObject){
	this.objects[this.objects.length] = newObject;
};

vps.ObjectManager.prototype.updateAll = function(camera){
	
	for(var i=0; i<this.objects.length; i++){
		// console.log('Updating object '+i);
		this.objects[i].update(camera);
	
	}

	this.allPolygons = [];
	
	// Put all the polygons from all objects into an array first of all 
	// checking to see if they're outside of the view distance (in which case they can be skipped)
	for(var i=0; i<this.objects.length; i++){
		for(var j=0; j<this.objects[i].polygons.length; j++){
			var polygon = this.objects[i].polygons[j];
			
			if(polygon.visible) {
				this.allPolygons[this.allPolygons.length] = polygon;
			}
		}
	}
	
	// Order by proximity to the camera
	this.allPolygons.sort(function(p1, p2){
		return Math.abs(p2.distanceToFurthestPoint) - Math.abs(p1.distanceToFurthestPoint);
	});

	// Update the fps calculator
	this.thisFrameFPS = 1000 / ((this.now=new Date) - this.lastUpdate);
	this.fps += (this.thisFrameFPS - this.fps) / this.fpsFilter;
	this.lastUpdate = this.now;
};

vps.ObjectManager.prototype.drawAll = function(sceneRenderer){

	// Draw them in the right order
	for(var k=0; k<this.allPolygons.length; k++){
		if(this.allPolygons[k].parentObject.visible){
			sceneRenderer.draw(this.allPolygons[k]);
		}
	}
};
