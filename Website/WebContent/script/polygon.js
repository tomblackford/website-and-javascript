Polygon = function (object) {
	
	var _vertices = new Array();
	var _colour;
	var _object = object;
	var _visible = false;
	var _brightness;
	var _furthestPoint = 0;
	
	return  {
			
		addVertex: function (vertex){
			_vertices[_vertices.length] = vertex;
		},
		
		setVisible: function (visible){
			_visible = visible;
		},
	
		setBrightness: function (brightness){
			_brightness = brightness;
		},
		
		vertices:  _vertices,
		
		visible: _visible,
		
		furthestPoint: _furthestPoint,
		
		setColour: function (colString){
			_colour = colString;
		},
		
		getColour: function(){
			return _colour;
		},
		
		getObject: function(){
			return _object;
		},
		
		setObject: function(object){
			_object = object;
		},
		
		draw: function(ctx){	
			
			var viewCoords = _object.viewCoordinates;
						
			ctx.fillStyle = _colour;

			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(viewCoords[_vertices[0]].x,viewCoords[_vertices[0]].y);

			for(var j=1; j<_vertices.length; j++){
				ctx.lineTo(viewCoords[_vertices[j]].x, viewCoords[_vertices[j]].y);
			}
				
			ctx.lineTo(viewCoords[_vertices[0]].x, viewCoords[_vertices[0]].y);	
			
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
			
			
		}
	};
	
};
