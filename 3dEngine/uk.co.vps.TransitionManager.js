uk.co.vps.TransitionManager = function () {
	var _transitions = [];
	
	return  {
		
		addTransition : function (transition){
			_transitions[transition.getObject().getName()] = transition;
		},
	
		updateAll : function (){
			
			// Update each of the managed transitions
			for(transitionName in _transitions){	
				
				var transition = _transitions[transitionName];
				if(transition!=null){
					if( transition.isActive()){	
						transition.update();				
					} else {
						_transitions[transition.getObject().getName()] = null;			
					}
				}
			}	

		},
		
		hasTransition : function (object){
			return _transitions[object.getName()]!=null;
		}
		
	};

}();
