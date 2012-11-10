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
		
		//var fixedRotation = new vps.Rotation(rotation.x.toFixed(2), 
		//									rotation.y.toFixed(2),
		//									rotation.z.toFixed(2));
		var fixedRotation = rotation;
		var key = getKey(fixedRotation);
		var answer = transformations[key];
		
		//console.log('Key '+key);
		//console.log('Hits cache '+(answer!=null));
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