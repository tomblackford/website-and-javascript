CanvasTest = function () {
	
	var _canvas;
	var _ctx;
		
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
		
		// Set up some initial objects
		var cuboid1 = ObjectFactory.adder(name, width, height, 128);
		cuboid1.setPosition(positionX, positionY ,15000);
		ObjectManager.addObject(cuboid1);
		cuboid1.setRotation(Math.PI,0,Math.PI);
		cuboid1.setActive(true);
		
		var cuboid1StartState = new TransitionState(cuboid1.getPosition(), cuboid1.getRotation());
		var cuboid1EndPosition = cuboid1.getPosition();
		cuboid1EndPosition.z = -200;
		var cuboid1EndState = new TransitionState(cuboid1EndPosition,  cuboid1.getRotation());
		var cuboid1Callback = function(transition){
			transition.reset();
		};
		
		var cuboid1Transition = new Transition(cuboid1, cuboid1StartState, cuboid1EndState, transitionDuration, false, false, cuboid1Callback);
		TransitionManager.addTransition(cuboid1Transition);		
		
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
			  console.log(ObjectManager.getFps().toFixed(1) + 'fps');
			}, 1000); 
			
			// Update screen 30x per second
			window.setInterval(function(){
				 updateAndDraw();
			},30);

			// Set up some initial objects
			var coriolis = ObjectFactory.coriolis('coriolis',30,128);
			coriolis.setPosition(0000,0000,5000);
			coriolis.setRotation(1.5707963267948983,0,0);
			ObjectManager.addObject(coriolis);
			coriolis.setActive(true);
			
			
			// Once the main object is up close - add a variety of 
			// background shapes - these loop around
			setTimeout(function(){
				addBackgroundObject('cuboid1',20,10,50, 800, 200, 300);
				addBackgroundObject('cuboid2',10,20,75, 400, 400, 500);
				addBackgroundObject('cuboid3',10,5,35, -280, 50, 450);
				addBackgroundObject('cuboid4',15,10,50, -600, 150, 350);
				addBackgroundObject('cuboid5',10,25,80, -1000, 150, 550);
				addBackgroundObject('cuboid6',10,15,50, 400, -100, 250);
			}, 5000);

			
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
