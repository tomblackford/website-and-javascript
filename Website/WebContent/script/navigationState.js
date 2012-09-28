NavigationState = function(name, key, rotation, position){
	var _name = name;
	var _rotation = rotation;
	var _position = position;
	var _key = key;
	
	var _nextState;
	var _previousState;
	
	return {
		
		getRotation : function(){ 
			return _rotation;
		},
		
		getPosition : function(){ 
			return _position;
		},
		
		getName : function(){
			return _name;
		},
		
		getKey : function(){
			return _key;
		},
		
		getNextState : function(){
			return _nextState;
		},
		
		getPreviousState : function(){
			return _previousState;
		},
		
		setNextState : function(state){
			_nextState = state;
		}, 
		
		setPreviousState : function(state){
			_previousState = state;
		}, 
		
		hasNextState : function(){
			return _nextState !=null;
		},
		
		hasPreviousState : function(){
			return _previousState !=null;
		}
		
	};

}