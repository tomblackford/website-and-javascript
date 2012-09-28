FreeDEngine = function () {
	
	var _canvas;
	var _ctx;
	var _consecutiveSlowFrames = 0;
	
	
	// Convert from radians into degrees
	var oneDegree = Math.PI/180;
	
	// This is the body of the 'game loop'
	var updateAndDraw = function () {

		// Update all transitions
		TransitionManager.updateAll();
	
		// Calculate the rendered position of all objects
		ObjectManager.updateAll();

		// Draw all objects to the canvas
		ObjectManager.drawAll(_ctx);

	};
	
	function addBackgroundObject(name, width, height, depth, positionX, positionY, transitionDuration){
		var rand = Math.random();

		// Add a bit of a random factor to the position
		positionX>0 ? positionX+=500*Math.random() : positionX-=500*Math.random();
		positionY>0 ? positionY+=500*Math.random() : positionY-=500*Math.random();
	
		// Set up some initial objects
		if(rand<0.2){
			console.log('Adding asp');
			var newShape = ObjectFactory.asp(name, width, height, 128);
		} else if (rand<0.6) {
			console.log('Adding adder');
			var newShape = ObjectFactory.adder(name, width, height, 128);
			newShape.setRotation(Math.PI,0,Math.PI);
		} else if (rand<0.8){ 
			console.log('Adding gecko');
			var newShape = ObjectFactory.gecko(name, width, height, 128);
			newShape.setRotation(Math.PI,0,Math.PI);
		} else {
			console.log('Adding python');
			var newShape = ObjectFactory.python(name, width, height, 128);
			newShape.setRotation(Math.PI,0,Math.PI);
		}
		
		newShape.setPosition(0, 0, 15000);
		ObjectManager.addObject(newShape);
		newShape.setActive(true);
		
		var newShapeEndPosition = newShape.getPosition();
		
		newShapeEndPosition.x = positionX;
		newShapeEndPosition.y = positionY;
		newShapeEndPosition.z = -200;
		
		var rand = Math.random();
		if(rand>0.5){
			// Towards the camera
			var newShapeStartState = new TransitionState(newShape.getPosition(), newShape.getRotation());
			var newShapeEndState = new TransitionState(newShapeEndPosition,  newShape.getRotation());
		} else {
			// Away from the camera
			newShape.rotate(0,Math.PI,0);
			var newShapeStartState = new TransitionState(newShapeEndPosition, newShape.getRotation());
			var newShapeEndState = new TransitionState(newShape.getPosition(),  newShape.getRotation());
		}
		
		var newShapeCallback = function(transition){
			transition.reset();
		};
		
		var newShapeTransition = new Transition(newShape, newShapeStartState, newShapeEndState, transitionDuration, false, false, newShapeCallback);
		TransitionManager.addTransition(newShapeTransition);		
		
	}

	return  {
		
		init: function () {

			// 
			_canvas = document.querySelector('canvas');
			_ctx = _canvas.getContext('2d');
			_ctx.strokeStyle = "#4d4d4d";
			_ctx.lineCap = "butt";
			_ctx.lineJoin = "round";
			//_ctx.globalAlpha = 0.5; 
			
			// Calculate FPS every second
			var fpsOut = document.getElementById('fps');
			setInterval(function(){
			  
				var fps = ObjectManager.getFps().toFixed(1);
				console.log(fps + 'fps');
			  
			}, 500); 
			
			// Update screen 30x per second
			window.setInterval(function(){
				 updateAndDraw();
			},30);

			// Set up some initial objects
			var coriolis = ObjectFactory.coriolis('coriolis',300,128);
			coriolis.setPosition(0000,0000,5000);
			coriolis.setRotation(1.5707963267948983,0,0);
			ObjectManager.addObject(coriolis);
			coriolis.setActive(true);
			
			//var python = ObjectFactory.python('asp',30,128);
			//python.setPosition(0000,0000,1000);
			//python.setRotationSpeed(oneDegree,oneDegree,oneDegree);
			//ObjectManager.addObject(python);
			//python.setActive(true);
			
			// Once the main object is up close - add a variety of 
			// background shapes - these loop around
			setTimeout(function(){
				addBackgroundObject('ship1',20,10,50, 800, 200, 400);
			}, 5000+Math.random()*60000);
			
			setTimeout(function(){
				addBackgroundObject('ship2',10,20,75, 400, 400, 500);
			}, 5000+Math.random()*60000);
			
			setTimeout(function(){
				addBackgroundObject('ship3',10,5,35, -980, 50, 450);
			}, 5000+Math.random()*60000);
			
			setTimeout(function(){
				addBackgroundObject('ship4',15,10,50, -600, 150, 550);
			}, 5000+Math.random()*60000);
			
			setTimeout(function(){
				addBackgroundObject('ship5',10,25,80, -1000, 150, 550);
			}, 5000+Math.random()*60000);
			
			setTimeout(function(){
				addBackgroundObject('ship6',10,15,50, 400, -100, 450);
			}, 5000+Math.random()*60000);

			
			// Init the navigation manager - this controls moving between pages
			NavigationManager.init();
			
			// Work out what initial 'page' to render
			// The hash tells us what page to load (default to 'home')
			var startPage = window.location.hash;
			if(startPage=='#' || startPage.indexOf('#page')==-1 ){
				startPage = 'home';
			} else {
				startPage = startPage.replace('#page-', '');
			}
			
			// Tell this to start off on the appropriate 'page'
			NavigationManager.changeState(startPage,false);
			
		}
	};

}(); 
