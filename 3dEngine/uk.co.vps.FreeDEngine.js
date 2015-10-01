uk.co.vps.FreeDEngine = function () {
	
	var _canvas;
	var _ctx;
	
	// This is the body of the 'game loop'
	var updateAndDraw = function () {

		// Update all transitions
		TransitionManager.updateAll();
	
		// Calculate the rendered position of all objects
		ObjectManager.updateAll();

		// Draw all objects to the canvas
		ObjectManager.drawAll(_ctx);

	};
	
	return  {
		
		init: function () {

			// Configure the canvas
			_canvas = document.querySelector('canvas');
			_ctx = _canvas.getContext('2d');
			_ctx.strokeStyle = "#4d4d4d";
			_ctx.lineCap = "butt";
			_ctx.lineJoin = "round";

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


			//var python = ObjectFactory.python('asp',30,128);
			//python.setPosition(0000,0000,1000);
			//python.setRotationSpeed(oneDegree,oneDegree,oneDegree);
			//ObjectManager.addObject(python);
			//python.setActive(true);
			
		}
	};

}(); 
