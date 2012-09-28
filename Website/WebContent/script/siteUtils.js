SiteUtils = function (){ 

	return {

		// Make sure the canvas is centrally aligned in the page 
		// This might require it to overflow the page (can't resize
		// it as this will affect aspect ratio)
		centreCanvas: function centreCanvas(){
				var canvasWidth = $('#canvas').width();
				var canvasHeight = $('#canvas').height();
				
				var screenWidth =  $('body').width();
				var screenHeight = $('body').height();
				
				var marginLeft = (screenWidth - canvasWidth) / 2;
				var marginTop = (screenHeight - canvasHeight) / 2;
				
				if(marginTop>0) marginTop = 0;
				if(marginTop<-100) marginTop = -100;
				
				document.getElementById("canvas").style.marginLeft = marginLeft+"px";
				document.getElementById("canvas").style.marginTop = marginTop+"px";
				
				document.getElementById("innerContainer").style.marginLeft = (screenWidth/2-500)+"px";
				
				document.getElementById("innerContainer2").style.marginLeft = (screenWidth/2-500)+"px";
				document.getElementById("innerContainer2").style.marginTop = marginTop+"px";
				
				document.getElementById("content").style.marginLeft = (screenWidth/2-230)+"px";
				document.getElementById("content").style.marginTop = marginTop+"px";
				
		},
			
		isCanvasSupported : function isCanvasSupported(){
			var elem = document.createElement('canvas');
			  return !!(elem.getContext && elem.getContext('2d'));
		}
			


	};


}();