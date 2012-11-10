RotationTransformationFactoryTestCase = TestCase("RotationTransformationFactoryTestCase");

RotationTransformationFactoryTestCase.prototype.testCachingFactoryPerformance = function() {

	// Try using the caching factory first 
	var beforeCached = new Date();
	for(var j=0; j<100; j++){
		for(x=0; x<Math.PI*2; x+=0.5){
			for(y=0; y<Math.PI*2; y+=0.5){
				for(z=0; z<Math.PI*2; z+=0.5){
					vps.RotationTransformationFactory.getRotationTransformationMatrix(new vps.Rotation(x,y,z));
				}
			}
		}
	}
	var timeTakenCached = new Date()- beforeCached;
	jstestdriver.console.log('Time taken when using caching factory = '+timeTakenCached);

	// Now try a control, where we create the matrix every time
	var beforeControl = new Date();
	for(var i=0; i<100; i++){
		for(var x=0; x<Math.PI*2; x+=0.5){
			for(var y=0; y<Math.PI*2; y+=0.5){
				for(var z=0; z<Math.PI*2; z+=0.5){
					new vps.RotationTransformationMatrix(new vps.Rotation(x,y,z));
				}
			}
		}
	}
	var timeTakenControl = new Date()- beforeControl;
	jstestdriver.console.log('Time taken for control = '+timeTakenControl);
	

	
	assertTrue("The cache improves the computation time : ", timeTakenControl > timeTakenCached);
};