vps = vps || {};

/**
 * Singleton providing caching of transformations
 */
vps.RotationTransformationFactory = function(){

	var transformations = {};
	
	function getKey(rotation){
		return rotation.x+"_"+rotation.y+"_"+rotation.z;
	}
	
	
	var getRotationTransformationMatrix = function(rotation){
		
		var fixedRotation = rotation;
		var key = getKey(fixedRotation);
		var answer = transformations[key];
		
		if(answer==null){
			answer = new vps.RotationTransformationMatrix(fixedRotation);
			transformations[key] = answer;
		}
		return answer;
	};
	
	return {
		
		getRotationTransformationMatrix : getRotationTransformationMatrix
	};


}();