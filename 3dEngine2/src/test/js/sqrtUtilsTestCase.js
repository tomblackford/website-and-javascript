SqrtUtilsTestCase = TestCase("SqrtUtilsTestCase");

SqrtUtilsTestCase.prototype.testPerformance = function() {

	// Generate 10000 random values (to 2 dp precision)
	var values = new Array();
	for (var i=0; i<10000000; i++){
		values[i] = Math.round(100* (Math.random() * (1000)))/100;
		//jstestdriver.console.log(values[i]);
	}
	
	jstestdriver.console.log('Starting precalc');
	
	// Precalc the different values
	for(var j=0; j<1000; j+=0.01){
		vps.SquareRootUtils.sqrt(Math.round(j*100)/100);
	}
	
	jstestdriver.console.log('Starting test run');

	// Work out the Sin / Cos and Tan of each of the values, via lookup table
	var optStart = new Date();
	for (var i=0; i<values.length; i++){
		vps.SquareRootUtils.sqrt(values[i]);
	}
	var optEnd = new Date();
	jstestdriver.console.log('Optimized approach took '+(optEnd.getTime()-optStart.getTime()));
	
	// Work out the Sin / Cos and Tan of each, the normal way
	var controlStart = new Date();
	for (var i=0; i<values.length; i++){
		Math.sqrt(values[i]);
		
	}
	var controlEnd = new Date();
	jstestdriver.console.log('Control took '+(controlEnd.getTime()-controlStart.getTime()));
	
};

