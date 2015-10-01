uk.co.vps.ObjectManager = function () {
	var _objects = new Array();
	
	var _fps = 0;
	var _lastUpdate = (new Date)*1 - 1;
	var _fpsFilter = 50;

	
	return  {
	
		addObject: function (object){
			_objects[_objects.length] = object;
		},
	
		drawAll: function (ctx){
			
			var allPolys = new Array();
			
			for(var i=0; i<_objects.length; i++){	
				if(_objects[i].isActive()){		
					
					// Clear the previous frame
					var topLeft = _objects[i].getBoundingBoxTopLeft();
					var bottomRight = _objects[i].getBoundingBoxBottomRight();
					
					var clearWidth = bottomRight.x - topLeft.x;
					var clearHeight = bottomRight.y - topLeft.y;
					
					ctx.clearRect(topLeft.x-5, topLeft.y-5, clearWidth+10, clearHeight+10);
					
					
					// Get all the polygons into an array
					var polys = _objects[i].polygons;
					for(var j=0; j<polys.length; j++){
						
						if(polys[j].visible){
							allPolys[allPolys.length] = polys[j];
							
							// Make sure this polygons vertices are translated
							// into view coords
						}
					}
				}
			}
			
			// Order the polygons by furthest depth
			// so we can render the nearest ones last
			allPolys.sort(function(p1, p2){
				return p2.furthestPoint - p1.furthestPoint;
			});
			
			// Work through the polygons in order, drawing them
			// if their parent object is itself visible
			for(var i=0; i<allPolys.length; i++){
				
				if(allPolys[i].visible){
					allPolys[i].draw(ctx);
				}
			}
			
			// Update the fps calculator
			var thisFrameFPS = 1000 / ((_now=new Date) - _lastUpdate);
			_fps += (thisFrameFPS - _fps) / _fpsFilter;
			_lastUpdate = _now;

		},
		
		updateAll: function (){
			
			for(var i=0; i<_objects.length; i++){
				if(_objects[i].isActive()){
					_objects[i].update();
				}
			}
		},
		
		getFps: function (){
			return _fps;
		},
		
		getObject: function(name){
			for(var i=0; i<_objects.length; i++){
				if(_objects[i].getName()==name){
					return _objects[i];
				}
			}
			
		}
	
	};

}();
	
