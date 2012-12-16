var vps = vps || {};

/**
 * Singleton providing utility functions
 */
vps.Timer = (function(){
	var startTimes = {};
	var elapsedTimes = {};
	
	/**
	 * Start a timer with the passed name
	 */
	var start = function(name) {
	  startTimes[name] = new Date().getTime();
	};
	
	/**
	 * Finish the timer with the passed name
	 */
	var end = function(name){
		elapsedTimes[name] = new Date().getTime() - startTimes[name];
	};
	
	/**
	 * Get the time with the passed name
	 */
	var getTime = function (name){
		return elapsedTimes[name];
	};
	
	return {
		start : start,
		end : end,
		getTime : getTime
	};

})();