NavigationManager = function () {
	var _states = new Array(); 
	var _currentState = null;
	var _coriolis = null;

	function switchState(state, object, returnPos){
		
		// Only do anything if this is different state
		if(_currentState == null || _currentState.getName()!= state.getName()){
			
			// First figure out where we are actually trying to rotate to
			var targetRotation = state.getRotation();
	
			// A function to set up the transition
			var transitionFunction =  function(){
				
				// Create a new transition to rotate the shape to the desired position
				var startState = new TransitionState(object.getPosition(), object.getRotation());
				
				if(returnPos){
					var distantPosition = new Position(object.getPosition().x, object.getPosition().y, object.getPosition().z+200);
				} else {
					var distantPosition = state.getPosition();
				}
				
				var fadeInCallback = function(){
					var divSelector = '#content #'+state.getName();
					$(divSelector).fadeIn('slow', 'swing', function(){	
						if(_currentState.hasNextState()){
							$('#nextPage').fadeIn('slow', 'swing');
						}
						
						if(_currentState.hasPreviousState()){
							$('#previousPage').fadeIn('slow', 'swing');	
						}
					});
					

					
					// Set the hash to reflect the selected page (for bookmarking)
					window.location.hash = '#page-'+state.getName();
				};
	
				var endState = new TransitionState(distantPosition, targetRotation);
				var transition = new Transition(object, startState, endState, 100, false, returnPos, fadeInCallback);
				TransitionManager.addTransition(transition);
				
			};
			
			
			// Either apply the function to set the transition immediately, or after fading content
			if(_currentState!=null){
				var oldDivSelector = '#content #'+_currentState.getName();
				$(oldDivSelector).fadeOut('slow', 'swing',  transitionFunction);

				$('#nextPage').fadeOut('slow', 'swing');
				$('#previousPage').fadeOut('slow', 'swing');
				
			} else {
				transitionFunction();
			}
				
			// Update the current state
			_currentState = state;
			
		}
		
	}
	
	
	return  {
		
		init : function (){
		
			_coriolis = ObjectManager.getObject('coriolis');
						
			// Set up the transformations themselves
			_states[0] =  new NavigationState('home',49,new Rotation(-1.5707963267948983,0,0), new Position(0,0,550));
			_states[1] =  new NavigationState('about',50,new Rotation(0.6110849084701179,-0.9599782514546074,-0.523228553163913), new Position(0,0,550));
			_states[2] =  new NavigationState('services',51,new Rotation(0.6111020722206558,-2.1811233058505484,0.5234437569652984), new Position(0,0,550));
			_states[3] =  new NavigationState('clients',52,new Rotation(0.6108738482339227,2.198326774980829,-0.5235771836232133), new Position(0,0,550));
			_states[4] =  new NavigationState('contacts',53,new Rotation(0.6110675811502934,0.96029205524303,0.5229832323532358), new Position(0,0,550));
			_states[5] =  new NavigationState('accessibility',54,new Rotation(1.5707963267948983,0,0), new Position(0,0,550));
			
			_states[0].setNextState(_states[1]);
			
			_states[1].setPreviousState(_states[0]);
			_states[1].setNextState(_states[2]);

			_states[2].setPreviousState(_states[1]);
			_states[2].setNextState(_states[3]);
			
			_states[3].setPreviousState(_states[2]);
			_states[3].setNextState(_states[4]);
			
			_states[4].setPreviousState(_states[3]);


			
			// Add an event handler to wire these transitions up to their appropriate keys
			document.onkeyup=(function(e){
				var key=(typeof event!='undefined')?window.event.keyCode:e.keyCode;
	
				var oneDegree = Math.PI/180;
				
				// Rotate About X Axis
				if(key===38){
					_coriolis.rotate(oneDegree,0,0);
				}
				if(key===40){
					_coriolis.rotate(-oneDegree,0,0);
				}
				
				// Rotate About Y Axis
				if(key===37){
					_coriolis.rotate(0,oneDegree,0);
				}
				if(key===39){
					_coriolis.rotate(0,-oneDegree,0);
				}
				
				// Rotate About Z Axis
				if(key===46){
					_coriolis.rotate(0,0,-oneDegree);
				}
				if(key===34){
					_coriolis.rotate(0,0,oneDegree);
				}
				
				if(key===34){
					_coriolis.rotate(0,0,oneDegree);
				}
				
				if(key===32){
					alert(_coriolis.getRotation().x+","+_coriolis.getRotation().y+","+_coriolis.getRotation().z);
				}
				
				// If there is no current transition - add one, to the appropriate position
				if(!TransitionManager.hasTransition(_coriolis)){
						
					for (var i = 0; i<_states.length; i++){
	
						if(key ===_states[i].getKey()){
							var state = _states[i];
						}
					}

					// If the key has corresponded with some kind of navigation
					if(state!=null){
						switchState(state, _coriolis, true);						
					}	
				}
				
			});
			

		},
		
		changeState : function (name, returnPosition){
				
			if(!TransitionManager.hasTransition(_coriolis)){
				for (var i = 0; i<_states.length; i++){
	
					if(name ===_states[i].getName()){
						var state = _states[i];
					}
				}
				
				if(state!=null){
					switchState(state, _coriolis, returnPosition);	
				}
			}
			
		},
		
		nextState : function (returnPosition){
			
			if(_currentState.hasNextState()){
				switchState(_currentState.getNextState(), _coriolis, returnPosition)
			}
		},
		
		previousState : function (returnPosition){
			
			if(_currentState.hasPreviousState()){
				switchState(_currentState.getPreviousState(), _coriolis, returnPosition)
			}
		}
		
	};

}();
