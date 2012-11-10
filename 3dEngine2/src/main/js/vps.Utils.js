var vps = vps || {};

/**
 * Singleton providing utility functions
 */
vps.Utils = function(){
	
	/**
	 * Make the subclass extend / inherit from baseclass
	 */
	var extend = function(subClass, baseClass) {
	   function inheritance() {}
	   inheritance.prototype = baseClass.prototype;

	   subClass.prototype = new inheritance();
	   subClass.prototype.constructor = subClass;
	   subClass.baseConstructor = baseClass;
	   subClass.superClass = baseClass.prototype;
	};
	
	return {
		extend : extend
	};

}();