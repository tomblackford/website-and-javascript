vps = vps || {};
vps.worldobjects = vps.worldobjects || {};

/**
 * A checkerboard
 */
vps.worldobjects.Checkerboard = function(name, size, dimx, dimz, altitude, hue, reflectivity){
	// Call parent constructor
	vps.worldobjects.Checkerboard.baseConstructor.call(this, name);
	
	// To make sure the object is centralized on it's local coord system
	var offsetx =  (size*dimx) / 2;
	var offsetz = (size*dimz) / 2;
	
	var height = 0;
	
	// Create vertices for each of the points
	for(var x=0; x<dimx; x++){
		var xpos = x*size - offsetx;
		
		for(var z=0; z<dimz; z++){
	
			var zpos = z*size - offsetz;
			
			if(Math.random()>0.5){
				height += altitude*Math.random();
			} else {
				height -= altitude*Math.random();
			}
			
			this.addVertexByCoords(xpos, height,  zpos);
		}
	}
			
	console.log('Created '+this.vertices.length+' vertices');
	
	// Create polygons from the points
	for(var x=0; x<(dimx*(dimz-1)-1); x++){
		var polyhue = (x % 2 == 0) ? hue : -hue;
				
		this.addPolygon4(x, x+dimx, x+dimx+1, x+1, polyhue, reflectivity);
	}


};


// Extend Polygon
vps.Utils.extend(vps.worldobjects.Checkerboard, vps.WorldObject);