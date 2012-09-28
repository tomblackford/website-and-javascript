MatrixMultiplicationTestCase = TestCase("MatrixMultiplicationTestCase");

MatrixMultiplicationTestCase.prototype.testMultiplication = function() {

	var matrix1 = new vps.TransformationMatrix();
	matrix1.values =  [[1,2,3,4],
	 				  [5,6,7,8],
					  [9,10,11,12],
					  [13,14,15,16]];

	var matrix2 = new vps.TransformationMatrix();
	matrix2.values =  [[1,2,3,4],
	 				  [5,6,7,8],
					  [9,10,11,12],
					  [13,14,15,16]];
		
	matrix1.multiply(matrix2);
	
	var correctValues = [[90,	100,	110,	120],
	                     [202,	228,	254,	280],
	                     [314,	356,	398,	440],
	                     [426,	484,	542,	600]];
	
	assertEquals("The multiplication has gone wrong!",correctValues, matrix1.values);
};
