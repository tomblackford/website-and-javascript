uk.co.vps.InterpolationUtils = function () {
	//See http://paulbourke.net/miscellaneous/interpolation/
	return  {
	
		calcLinearInterpolation: function (startVal, endVal, t){
			return (startVal*(1-t)) + (endVal*(t));
		},
		
		calcCosineInterpolation: function (startVal, endVal, t){
			var t2 = (1-Math.cos(t*Math.PI))/2;
			return (startVal*(1-t2)) + (endVal*(t2));
		},

		calcCosineInterpolationReturn: function (startVal, midVal, t){
			var t2 = 0;
			
			if(t<0.5){	
				t2 = (1-Math.cos((t*2)*Math.PI))/2;
				return (startVal*(1-t2)) + (midVal*(t2));
			} else {
				t2 = (1-Math.cos(((t-0.5)*2)*Math.PI))/2;
				return (midVal*(1-t2)) + (startVal*(t2));
			}	
			
		}
	};
}();