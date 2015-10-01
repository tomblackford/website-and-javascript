uk.co.vps.TransformationMatrix = function () {
	
	var _values = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
	
	return  {
		
		setValue: function (col, row, value){
			(_values[row])[col] = value;
		},
		
		getValue: function (col, row){
			return (_values[row])[col];
		},
	
		apply: function (vertex){
			var nx = (vertex.x * this.getValue(0,0)) + (vertex.y * this.getValue(0,1))  + (vertex.z * this.getValue(0,2)) + (1.0 * this.getValue(0,3));
			var ny = (vertex.x * this.getValue(1,0)) + (vertex.y * this.getValue(1,1))  + (vertex.z * this.getValue(1,2)) + (1.0 * this.getValue(1,3));
			var nz = (vertex.x * this.getValue(2,0)) + (vertex.y * this.getValue(2,1))  + (vertex.z * this.getValue(2,2)) + (1.0 * this.getValue(2,3));
		
			return new Vertex3d(nx, ny, nz);
		},
		
		multiply : function (matrix){
			
			var answer = new TransformationMatrix();
			
			// Row 1
			answer.setValue (0,0, (this.getValue(0,0) * matrix.getValue(0,0)) 
						        + (this.getValue(1,0) * matrix.getValue(0,1))
							    + (this.getValue(2,0) * matrix.getValue(0,3)));
			
			answer.setValue (1,0, (this.getValue(0,0) * matrix.getValue(1,0)) 
								+ (this.getValue(1,0) * matrix.getValue(1,1))
								+ (this.getValue(2,0) * matrix.getValue(1,2)));
			
			answer.setValue (2,0, (this.getValue(0,0) * matrix.getValue(2,0)) 
								+ (this.getValue(1,0) * matrix.getValue(2,1))
								+ (this.getValue(2,0) * matrix.getValue(2,2)));
			
			// Row 2
			answer.setValue (0,1, (this.getValue(0,1) * matrix.getValue(0,0)) 
								+ (this.getValue(1,1) * matrix.getValue(0,1))
								+ (this.getValue(2,1) * matrix.getValue(0,2)));

			answer.setValue (1,1, (this.getValue(0,1) * matrix.getValue(1,0)) 
								+ (this.getValue(1,1) * matrix.getValue(1,1))
								+ (this.getValue(2,1) * matrix.getValue(1,2)));
			
			answer.setValue (2,1, (this.getValue(0,1) * matrix.getValue(2,0)) 
								+ (this.getValue(1,1) * matrix.getValue(2,1))
								+ (this.getValue(2,1) * matrix.getValue(2,2)));
			
			// Row 3
			answer.setValue (0,2, (this.getValue(0,2) * matrix.getValue(0,0)) 
								+ (this.getValue(1,2) * matrix.getValue(0,1))
								+ (this.getValue(2,2) * matrix.getValue(0,2)));

			answer.setValue (1,2, (this.getValue(0,2) * matrix.getValue(1,0)) 
								+ (this.getValue(1,2) * matrix.getValue(1,1))
								+ (this.getValue(2,2) * matrix.getValue(1,2)));
			
			answer.setValue (2,2, (this.getValue(0,2) * matrix.getValue(2,0)) 
								+ (this.getValue(1,2) * matrix.getValue(2,1))
								+ (this.getValue(2,2) * matrix.getValue(2,2)));
			
			return answer;
		}
		
	};
	
};