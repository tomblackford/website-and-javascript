TransitionState = function(position,rotation){

	var _position = position;
	var _rotation = rotation;
	
	return {

		getPosition: function(){ 
			return _position;
		},
		getRotation: function(){ 
			return _rotation;
		}
		
	};

}