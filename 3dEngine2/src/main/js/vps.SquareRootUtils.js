var vps = vps || {};

/**
 * Singleton providing trig utility functions
 */
vps.SquareRootUtils = function(){
	
	var values = new Array(100000);
	
	/**
	 * 
	 */
	var sqrt = function(num) {
		var key = num * 100;
		var answer = values[key];
		if(answer==null){
			answer = Math.sqrt(key);
			values[key] = answer;
			jstestdriver.console.log('Caching '+key);
		} else {
			return answer;
		}
	};


	
	return {
		sqrt : sqrt
	};

}();