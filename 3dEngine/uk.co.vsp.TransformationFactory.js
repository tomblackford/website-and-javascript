uk.co.vsp.TransformationFactory = function () {

	return  {
	
		translate: function (translateX, translateY, translateZ){
			
			var matrix = new TransformationMatrix();
			matrix.setValue(3,0,translateX);
			matrix.setValue(3,1,translateY);
			matrix.setValue(3,2,translateZ);
			
			return matrix;
		},
	
		scale: function (scaleX, scaleY, scaleZ){
			
			var matrix = new TransformationMatrix();
			matrix.setValue(0,0,scaleX);
			matrix.setValue(1,1,scaleY);
			matrix.setValue(2,2,scaleZ);
			
			return matrix;
		},
		
		rotateX: function (rotateX){
			
			var matrix = new TransformationMatrix();
			matrix.setValue(1,1,Math.cos(rotateX));
			matrix.setValue(1,2,0-Math.sin(rotateX));
			matrix.setValue(2,1,Math.sin(rotateX));
			matrix.setValue(2,2,Math.cos(rotateX));
			return matrix;
		},
		
		rotateY: function (rotateY){
			
			var matrix = new TransformationMatrix();
			matrix.setValue(0,0,Math.cos(rotateY));
			matrix.setValue(2,0,Math.sin(rotateY));
			matrix.setValue(0,2,0-Math.sin(rotateY));
			matrix.setValue(2,2,Math.cos(rotateY));
			return matrix;
		},
		
		rotateZ: function (rotateZ){			
			var matrix = new TransformationMatrix();
			matrix.setValue(0,0,Math.cos(rotateZ));
			matrix.setValue(1,0,Math.sin(rotateZ));
			matrix.setValue(0,1,0-(Math.sin(rotateZ)));
			matrix.setValue(1,1,Math.cos(rotateZ));
			return matrix;
		}
	
	};

}();