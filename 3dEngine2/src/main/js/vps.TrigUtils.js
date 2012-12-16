var vps = vps || {};

/**
 * Singleton providing trig utility functions
 */
vps.TrigUtils = function(){
	
	var sinLookUpTable = new Array(700);
	var cosLookUpTable = new Array(700);
	var tanLookUpTable = new Array(700);
	
	/**
	 * 
	 */
	var sin = function(angle) {
		var key = angle * 100;
		var answer = sinLookUpTable[key];
		if(answer==null){
			answer = Math.sin(key);
			sinLookUpTable[key] = answer;
			jstestdriver.console.log('Caching sin '+key);
		} else {
			return answer;
		}
	};

	
	var cos = function(angle){	
		var key = angle * 100;
		var answer = cosLookUpTable[key];
		if(answer==null){
			answer = Math.cos(key);
			cosLookUpTable[key] = answer;
			jstestdriver.console.log('Caching cos '+key);
		} else {
			return answer;
		}
	};
	
	var tan = function(angle){
		var key = angle * 100;
		var answer = tanLookUpTable[key];
		if(answer==null){
			answer = Math.tan(key);
			tanLookUpTable[key] = answer;
			jstestdriver.console.log('Caching tan '+key);
		} else {
			return answer;
		}
	};
	
	
	return {
		sin : sin,
		cos : cos,
		tan : tan
	};

}();