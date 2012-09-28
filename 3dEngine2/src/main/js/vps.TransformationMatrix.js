/**
 * Represents a transformation (ie rotation)
 */
vps = vps || {};

/**
 * Construct a blank transformation matrix
 * @returns {vps.TransformationMatrix}
 */
vps.TransformationMatrix = function () {
	// The internal representation of the matrix - start off with identity matrix
	// This will be a no-op if applied to anything
	this.values = [[1,0,0,0],
				  [0,1,0,0],
				  [0,0,1,0],
				  [0,0,0,1]];
};
 

/**
 * Transform the passed Coord3d, storing the result in the destination Coord3d
 * @param source
 * @param destination
 */
vps.TransformationMatrix.prototype.apply = function (source, destination){
	destination.x = (source.x * this.values[0][0]) + (source.y * this.values[0][1])  + (source.z * this.values[0][2]) + (1.0 * this.values[0][3]);
	destination.y = (source.x * this.values[1][0]) + (source.y * this.values[1][1])  + (source.z * this.values[1][2]) + (1.0 * this.values[1][3]);
	destination.z = (source.x * this.values[2][0]) + (source.y * this.values[2][1])  + (source.z * this.values[2][2]) + (1.0 * this.values[2][3]);
};

/**
 * Multiply this matrix by another 
 * @param matrix
 */
vps.TransformationMatrix.prototype.multiply = function (matrix) {
	var temp = new vps.TransformationMatrix();
	// Row 0
	temp.values[0][0] = (this.values[0][0] * matrix.values[0][0]) + (this.values[0][1] * matrix.values[1][0]) + (this.values[0][2] * matrix.values[2][0]) +  (this.values[0][3] * matrix.values[3][0]);
	temp.values[0][1] = (this.values[0][0] * matrix.values[0][1]) + (this.values[0][1] * matrix.values[1][1]) + (this.values[0][2] * matrix.values[2][1]) +  (this.values[0][3] * matrix.values[3][1]);
	temp.values[0][2] = (this.values[0][0] * matrix.values[0][2]) + (this.values[0][1] * matrix.values[1][2]) + (this.values[0][2] * matrix.values[2][2]) +  (this.values[0][3] * matrix.values[3][2]);
	temp.values[0][3] = (this.values[0][0] * matrix.values[0][3]) + (this.values[0][1] * matrix.values[1][3]) + (this.values[0][2] * matrix.values[2][3]) +  (this.values[0][3] * matrix.values[3][3]);
	
	// Row 1
	temp.values[1][0] = (this.values[1][0] * matrix.values[0][0]) + (this.values[1][1] * matrix.values[1][0]) + (this.values[1][2] * matrix.values[2][0]) +  (this.values[1][3] * matrix.values[3][0]);	
	temp.values[1][1] = (this.values[1][0] * matrix.values[0][1]) + (this.values[1][1] * matrix.values[1][1]) + (this.values[1][2] * matrix.values[2][1]) +  (this.values[1][3] * matrix.values[3][1]);	
	temp.values[1][2] = (this.values[1][0] * matrix.values[0][2]) + (this.values[1][1] * matrix.values[1][2]) + (this.values[1][2] * matrix.values[2][2]) +  (this.values[1][3] * matrix.values[3][2]);
	temp.values[1][3] = (this.values[1][0] * matrix.values[0][3]) + (this.values[1][1] * matrix.values[1][3]) + (this.values[1][2] * matrix.values[2][3]) +  (this.values[1][3] * matrix.values[3][3]);
	
	// Row 2
	temp.values[2][0] = (this.values[2][0] * matrix.values[0][0]) + (this.values[2][1] * matrix.values[1][0]) + (this.values[2][2] * matrix.values[2][0]) +  (this.values[2][3] * matrix.values[3][0]);	
	temp.values[2][1] = (this.values[2][0] * matrix.values[0][1]) + (this.values[2][1] * matrix.values[1][1]) + (this.values[2][2] * matrix.values[2][1]) +  (this.values[2][3] * matrix.values[3][1]);
	temp.values[2][2] = (this.values[2][0] * matrix.values[0][2]) + (this.values[2][1] * matrix.values[1][2]) + (this.values[2][2] * matrix.values[2][2]) +  (this.values[2][3] * matrix.values[3][2]);
	temp.values[2][3] = (this.values[2][0] * matrix.values[0][3]) + (this.values[2][1] * matrix.values[1][3]) + (this.values[2][2] * matrix.values[2][3]) +  (this.values[2][3] * matrix.values[3][3]);
	
	// Row 3
	temp.values[3][0] = (this.values[3][0] * matrix.values[0][0]) + (this.values[3][1] * matrix.values[1][0]) + (this.values[3][2] * matrix.values[2][0]) +  (this.values[3][3] * matrix.values[3][0]);	
	temp.values[3][1] = (this.values[3][0] * matrix.values[0][1]) + (this.values[3][1] * matrix.values[1][1]) + (this.values[3][2] * matrix.values[2][1]) +  (this.values[3][3] * matrix.values[3][1]);
	temp.values[3][2] = (this.values[3][0] * matrix.values[0][2]) + (this.values[3][1] * matrix.values[1][2]) + (this.values[3][2] * matrix.values[2][2]) +  (this.values[3][3] * matrix.values[3][2]);
	temp.values[3][3] = (this.values[3][0] * matrix.values[0][3]) + (this.values[3][1] * matrix.values[1][3]) + (this.values[3][2] * matrix.values[2][3]) +  (this.values[3][3] * matrix.values[3][3]);

	this.values = temp.values;

};

/**
 * A human readable toString for all matrixes
 */
vps.TransformationMatrix.prototype.toString = function(){
	var answer = "Matrix:\n\t";
	answer += this.values[0][0] +",\t"+this.values[0][1]+",\t"+this.values[0][2]+",\t"+this.values[0][3]+"\n\t";
	answer += this.values[1][0] +",\t"+this.values[1][1]+",\t"+this.values[1][2]+",\t"+this.values[1][3]+"\n\t";
	answer += this.values[2][0] +",\t"+this.values[2][1]+",\t"+this.values[2][2]+",\t"+this.values[2][3]+"\n\t";
	answer += this.values[3][0] +",\t"+this.values[3][1]+",\t"+this.values[3][2]+",\t"+this.values[3][3]+"\n\t";
	return answer;
}
