TrigUtilsTestCase = TestCase("TrigUtilsTestCase");

TrigUtilsTestCase.prototype.testPerformance = function() {

	// Generate 10000 random values (to 2 dp precision)
	var values = new Array();
	for (var i=0; i<10000000; i++){
		values[i] = Math.round(100* (Math.random() * (Math.PI * 2)))/100;
		//jstestdriver.console.log(values[i]);
	}
	
	jstestdriver.console.log('Starting precalc');
	
	// Precalc the different values
	for(var j=0; j<Math.PI*2; j+=0.01){
		vps.TrigUtils.sin(Math.round(j*100)/100);
		vps.TrigUtils.cos(Math.round(j*100)/100);
		vps.TrigUtils.tan(Math.round(j*100)/100);
	}
	
	jstestdriver.console.log('Starting test run');

	// Work out the Sin / Cos and Tan of each of the values, via lookup table
	var optStart = new Date();
	for (var i=0; i<values.length; i++){
		var sin = vps.TrigUtils.sin(values[i]);
		var cos = vps.TrigUtils.cos(values[i]);
		var tan = vps.TrigUtils.tan(values[i]);
		//jstestdriver.console.log(sin+'_'+cos+'_'+tan);
	}
	var optEnd = new Date();
	jstestdriver.console.log('Optimized approach took '+(optEnd.getTime()-optStart.getTime()));
	
	// Work out the Sin / Cos and Tan of each, the normal way
	var controlStart = new Date();
	for (var i=0; i<values.length; i++){
		var sin = Math.sin(values[i]);
		var cos = Math.cos(values[i]);
		var tan = Math.tan(values[i]);
		//jstestdriver.console.log(sin+'_'+cos+'_'+tan);
	}
	var controlEnd = new Date();
	jstestdriver.console.log('Control took '+(controlEnd.getTime()-controlStart.getTime()));
	
};

