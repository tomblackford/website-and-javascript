uk.co.vps.Transition = function (object, startState, endState, duration, returnRot, returnPos, callback) {
	var _object = object;
	var _startState = startState;
	var _endState = endState;
	var _duration = duration;
	var _currentTime = 0;
	var _returnRot = returnRot;
	var _returnPos = returnPos;
	var _callback = callback;
	
	return {
		getObject : function(){
			return _object;
		},
		
		setObject : function(object){
			_object = object;
		},
		
		getCurrentTime : function (){ 
			return _currentTime;
		},
		
		getStartState : function (){
			return _startState;
		},
		
		getEndState : function (){
			return _endState;
		},
		
		getDuration : function (){
			return _duration;
		},
		
		getReturnPos : function (){
			return _returnPos;
		},
		
		getReturnRot : function (){
			return _returnRot;
		},
		
		incrementTime : function (){
			++_currentTime;
		},
		
		isActive : function (){
			return _currentTime < _duration;
		},
		
		getCurrentState : function (){
			
			// Amount is between 0 and 1
			var intAmount = (1/_duration) * _currentTime;
		
			var rotateX = 0;
			var rotateY = 0;
			var rotateZ = 0;
			
			var posX = 0;
			var posY = 0;
			var posZ = 0;

			if(returnRot){
				rotateX = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().x, _endState.getRotation().x, intAmount);
				rotateY = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().y, _endState.getRotation().y, intAmount);
				rotateZ = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().z, _endState.getRotation().z, intAmount);
			} else {
				rotateX = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().x, _endState.getRotation().x, intAmount);
				rotateY = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().y, _endState.getRotation().y, intAmount);
				rotateZ = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().z, _endState.getRotation().z, intAmount);
			}
			
			if(returnPos){
				posX = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().x, _endState.getPosition().x, intAmount);
				posY = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().y, _endState.getPosition().y, intAmount);
				posZ = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().z, _endState.getPosition().z, intAmount);
			} else {
				posX = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().x, _endState.getPosition().x, intAmount);
				posY = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().y, _endState.getPosition().y, intAmount);
				posZ = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().z, _endState.getPosition().z, intAmount);
			}
			
			var currentPosition = new Position (posX, posY, posZ);
			var currentRotation = new Rotation (rotateX, rotateY, rotateZ);
			
			return new TransitionState(currentPosition, currentRotation);
		},
		
		update : function (){
			
			// Work out the current state
			var transitionState = this.getCurrentState();
			
			// Apply this to the current object
			_object.setPosition3(transitionState.getPosition());
			_object.setRotation3(transitionState.getRotation());
			
			// Increment the transition's time
			this.incrementTime();
			
			if(_currentTime==_duration){
				
				if(_callback != null){
					_callback(this);
				}
			}
		},
		
		reset : function (){
			_currentTime = 0;
		}
		
	
	};
	
	
};