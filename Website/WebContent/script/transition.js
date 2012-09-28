Transition = function (object, startState, endState, duration, returnRot, returnPos, callback) {
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
		
			
			if(returnRot){
				var rotateX = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().x, _endState.getRotation().x, intAmount);
				var rotateY = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().y, _endState.getRotation().y, intAmount);
				var rotateZ = InterpolationUtils.calcCosineInterpolationReturn(_startState.getRotation().z, _endState.getRotation().z, intAmount);
			} else {
				var rotateX = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().x, _endState.getRotation().x, intAmount);
				var rotateY = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().y, _endState.getRotation().y, intAmount);
				var rotateZ = InterpolationUtils.calcCosineInterpolation(_startState.getRotation().z, _endState.getRotation().z, intAmount);
			}
			
			if(returnPos){
				var posX = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().x, _endState.getPosition().x, intAmount);
				var posY = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().y, _endState.getPosition().y, intAmount);
				var posZ = InterpolationUtils.calcCosineInterpolationReturn(_startState.getPosition().z, _endState.getPosition().z, intAmount);
			} else {
				var posX = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().x, _endState.getPosition().x, intAmount);
				var posY = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().y, _endState.getPosition().y, intAmount);
				var posZ = InterpolationUtils.calcCosineInterpolation(_startState.getPosition().z, _endState.getPosition().z, intAmount);
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
		
	
	}	
	
	
};