Object = function(name){
	
	var _name = name;
	var _active;
	var _vertices = new Array();
	var _polygons = new Array();
	var _absoluteVertices = new Array();
	
	var _viewCoordinates = new Array();
	
	// We blat this to clear the previous frame so we don't 
	// clear entire canvas each time. Initially set this to
	// entire canvas width - this will be updated each frame
	var _boundingBoxTopLeft = new Vertex2d(0,0);
	var _boundingBoxBottomRight = new Vertex2d(1600,800);

	var _positionX;
	var _positionY;
	var _positionZ;
	
	var _rotationX = 0;
	var _rotationY = 0;
	var _rotationZ = 0;
	
	var _speedX = 0;
	var _speedY = 0;
	var _speedZ = 0;
	
	var _rotationSpeedX = 0;
	var _rotationSpeedY = 0;
	var _rotationSpeedZ = 0;
		
	// Work out the bounding box to clear previous frame
	function setBoundingBox(viewCoordinates){
		
		var minX = 1000;
		var minY = 1000;
		var maxX = 0;
		var maxY = 0;
		
		for(var i=0; i<viewCoordinates.length;i++){
			
			if(viewCoordinates[i].x < minX) minX = viewCoordinates[i].x;
			if(viewCoordinates[i].y < minY) minY = viewCoordinates[i].y;
			if(viewCoordinates[i].x > maxX) maxX = viewCoordinates[i].x;
			if(viewCoordinates[i].y > maxY) maxY = viewCoordinates[i].y;
		}
		
		_boundingBoxTopLeft = new Vertex2d(minX,minY);
		_boundingBoxBottomRight = new Vertex2d(maxX,maxY);
		
	}
	
	
	
	return {
		name: _name,
		rotationZ: _rotationZ,
		rotationSpeed: _rotationSpeedZ,
		speedX: _speedX,
		speedY: _speedY,
		polygons: _polygons,
		vertices: _vertices,
		absoluteVertices: _absoluteVertices,
		viewCoordinates: _viewCoordinates,
		
		setActive: function(active){
			_active = active;
		},
		
		isActive: function(){
			return _active;
		},
		
		getName: function(){
			return _name;
		},
		
		addVertex: function(xpos, ypos, zpos){
			_vertices[_vertices.length] = new Vertex3d(xpos, ypos, zpos);
		},
		
		addPolygon: function(poly){
			_polygons[_polygons.length] = poly;
			poly.setObject(this);
		},
		
		addPolygon3: function(v1, v2, v3, shade){
			
			var poly = new Polygon(this);
			poly.addVertex(v1);
			poly.addVertex(v2);
			poly.addVertex(v3);
			poly.setColour('hsla('+shade+',0%,98.0%,1.0)');
			
			_polygons[_polygons.length] = poly;
		},
		
		addPolygon4: function(v1, v2, v3, v4, shade){
			//alert('Poly: '+v1+', '+v2+', '+v3+', '+v4);

			var poly = new Polygon(this);
			poly.addVertex(v1);
			poly.addVertex(v2);
			poly.addVertex(v3);
			poly.addVertex(v4);
			poly.setColour('hsla('+shade+',100%,100%,1.0)');
			
			_polygons[_polygons.length] = poly;
		},
		
		setPosition: function(xpos, ypos, zpos){
			_positionX = xpos;
			_positionY = ypos;
			_positionZ = zpos;
		},
		
		setPosition3: function(pos){
			_positionX = pos.x;
			_positionY = pos.y;
			_positionZ = pos.z;
		},
		
		setSpeed: function(xspeed, yspeed, zspeed){
			_speedX = xspeed;
			_speedY = yspeed;
			_speedZ = zspeed;
		},
		
		setRotation: function(x, y, z){
			_rotationX = x;
			_rotationY = y;
			_rotationZ = z;
		},
		
		setRotation3: function(rot){
			_rotationX = rot.x;
			_rotationY = rot.y;
			_rotationZ = rot.z;
		},
		
		getRotation: function(){
			return new Rotation(_rotationX,_rotationY,_rotationZ);
		},
		
		getPosition: function(){
			return new Position(_positionX,_positionY,_positionZ);
		},
		
		getBoundingBoxTopLeft : function(){
			return _boundingBoxTopLeft;
		},
		
		getBoundingBoxBottomRight : function(){
			return _boundingBoxBottomRight;
		},
		
		setRotationSpeed: function(xspeed, yspeed, zspeed){
			_rotationSpeedX = xspeed;
			_rotationSpeedY = yspeed;
			_rotationSpeedZ = zspeed;
		},
			
		rotate: function(x, y, z){
			_rotationX += x;
			_rotationY += y;
			_rotationZ += z;
		}, 
		
		move: function(x, y, z){
			_positionX += x;
			_positionY += y;
			_positionZ += z;
		},
	
		// Update the state of this object by one frame
		update: function(){

			_rotationX = _rotationX + _rotationSpeedX;
			_rotationY = _rotationY + _rotationSpeedY;
			_rotationZ = _rotationZ + _rotationSpeedZ;
			
			_positionX = _positionX + _speedX;
			_positionY = _positionY + _speedY;
			_positionZ = _positionZ + _speedZ;
						
			// Work out absolute position of each vertices
			for(var i=0; i<_vertices.length;i++){
				
				var transformedVertex = _vertices[i];
				var transformX = TransformationFactory.rotateX(_rotationX);
				var transformY = TransformationFactory.rotateY(_rotationY);
				var transformZ = TransformationFactory.rotateZ(_rotationZ);
				
				var combinedTransform = transformX.multiply(transformZ).multiply(transformY);
				
				transformedVertex = combinedTransform.apply(transformedVertex);

				var absX = transformedVertex.x + _positionX;
				var absY = transformedVertex.y + _positionY;
				var absZ = transformedVertex.z + _positionZ;
				
				_absoluteVertices[i] = new Vertex3d(absX, absY, absZ);
			}
			
			// Set a bounding box to clear previous frame
			if(_viewCoordinates.length>0){
				setBoundingBox(_viewCoordinates);
			} else {
				// Skip this - will blat entire frame first time around
			}
			
			// Translate to view coordinates
			for(var i=0; i<_vertices.length;i++){
					
				var oneOverZ = (1/(_absoluteVertices[i].z));
				var viewX = _absoluteVertices[i].x * 2000 * oneOverZ + 840 ;
				var viewY = -_absoluteVertices[i].y * 2000 * oneOverZ + 400 ;
				
				_viewCoordinates[i] = new Vertex2d(viewX, viewY);
			}
			

			
			// Work out if polygon needs to be rendered 
			// - Work out if itusing normals
			for(var i=0; i<_polygons.length; i++){
				var poly = _polygons[i];
				
				// Reset
				poly.furthestPoint = 0;
				
				// Work out furthest point of each poly (and store against poly) and set invisible if < max draw depth
				for(var p=0; p<poly.vertices.length; p++){
	
					if(poly.furthestPoint==0 || _absoluteVertices[poly.vertices[p]].z > poly.furthestPoint){
						poly.furthestPoint =  _absoluteVertices[poly.vertices[p]].z;
					}
				}						

				if(poly.furthestPoint>18000 || poly.furthestPoint < 300){
					poly.visible = false;
				} else {
					// If still visible - work out if pointing towards or away
					var vector1 = new Vertex2d(_viewCoordinates[poly.vertices[2]].x - _viewCoordinates[poly.vertices[0]].x,
							_viewCoordinates[poly.vertices[2]].y - _viewCoordinates[poly.vertices[0]].y);
					var vector2 = new Vertex2d(_viewCoordinates[poly.vertices[2]].x - _viewCoordinates[poly.vertices[1]].x,
							_viewCoordinates[poly.vertices[2]].y - _viewCoordinates[poly.vertices[1]].y);
					
					var z = (vector1.x * vector2.y) - (vector1.y * vector2.x);
					
					if (z>0){
						poly.visible = false;
					} else {
						
						poly.visible = true;

					}
					
				}
			}
			
			
		}
	};
	
};

