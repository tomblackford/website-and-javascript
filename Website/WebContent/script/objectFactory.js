ObjectFactory = function () {

	return  {
	
		cube: function (name, size, shade){
			var cube = new Object(name);
			
			var sp = 10*(size/2);
			
			cube.addVertex(-sp, -sp,  sp);		// 0
			cube.addVertex( sp, -sp,  sp);		// 1
			cube.addVertex( sp, -sp, -sp);		// 2
			cube.addVertex(-sp, -sp, -sp);		// 3
			cube.addVertex(-sp,  sp,  sp);		// 4
			cube.addVertex( sp,  sp,  sp);		// 5
			cube.addVertex( sp,  sp, -sp);		// 6
			cube.addVertex(-sp,  sp, -sp);		// 7
			
			cube.addPolygon4(0,4,5,1,shade);
			cube.addPolygon4(7,3,2,6,shade);
			cube.addPolygon4(0,1,2,3,shade);
			cube.addPolygon4(1,5,6,2,shade);
			cube.addPolygon4(4,0,3,7,shade);
			cube.addPolygon4(5,4,7,6,-shade);
			
			return cube;
		},
		
		cuboid: function (name, width, height, depth, shade){
			var cuboid = new Object(name);
			
			var spW = 10*(width/2);
			var spH = 10*(height/2);
			var spD = 10*(depth/2);
			
			cuboid.addVertex(-spW, -spH,  spD);		// 0
			cuboid.addVertex( spW, -spH,  spD);		// 1
			cuboid.addVertex( spW, -spH, -spD);		// 2
			cuboid.addVertex(-spW, -spH, -spD);		// 3
			cuboid.addVertex(-spW,  spH,  spD);		// 4
			cuboid.addVertex( spW,  spH,  spD);		// 5
			cuboid.addVertex( spW,  spH, -spD);		// 6
			cuboid.addVertex(-spW,  spH, -spD);		// 7
			
			cuboid.addPolygon4(0,4,5,1,shade);
			cuboid.addPolygon4(7,3,2,6,shade);
			cuboid.addPolygon4(0,1,2,3,shade);
			cuboid.addPolygon4(1,5,6,2,shade);
			cuboid.addPolygon4(4,0,3,7,shade);
			cuboid.addPolygon4(5,4,7,6,-shade);
			
			return cuboid;
		},

		pyramid: function (name, size, shade){
			var pyramid = new Object(name);
			
			var sp = 10*(size/2);
			
			pyramid.addVertex( 	0,	 sp, -sp);				// 0
			pyramid.addVertex(-sp, 	-sp, -sp);				// 1
			pyramid.addVertex( sp,	-sp, -sp);				// 2
			pyramid.addVertex(	0, 	  0, sp);				// 3
	
			
			pyramid.addPolygon3(1,0,2,shade);		
			pyramid.addPolygon3(3,0,1,shade);		
			pyramid.addPolygon3(2,0,3,shade);
			pyramid.addPolygon3(2,3,1,shade);
			
			return pyramid;
		},
		
		coriolis: function (name, size, shade){
			var coriolis = new Object(name);
			
			var sp = 10*(size/2);
			
			coriolis.addVertex(-50,	71,	50);		// 0
			coriolis.addVertex(50,	71,	50);		// 1
			coriolis.addVertex(50,	71,-50);		// 2
			coriolis.addVertex(-50,	71,-50);		// 3
			
			coriolis.addVertex(0,	0,	-100);		// 4
			coriolis.addVertex(-100,0,	0);		// 5
			coriolis.addVertex(0,	0,	100);		// 6
			coriolis.addVertex(100,	0,	0);		// 7
			
			coriolis.addVertex(-50,	-71,-50);	// 8
			coriolis.addVertex(-50,	-71,50);		// 9
			coriolis.addVertex(50,	-71,50);		// 10
			coriolis.addVertex(50,	-71,-50);		// 11		
			
			
			coriolis.addPolygon3(1,2,7,shade);
			coriolis.addPolygon3(3,4,2,shade);
			coriolis.addPolygon3(0,5,3,shade);
			coriolis.addPolygon3(6,0,1,shade);
			coriolis.addPolygon4(0,3,2,1,-shade);
			coriolis.addPolygon4(2,4,11,7,-shade);
			coriolis.addPolygon4(1,7,10,6,-shade);
			coriolis.addPolygon4(0,6,9,5,-shade);
			coriolis.addPolygon4(3,5,8,4,-shade);
			coriolis.addPolygon4(10,11,8,9,-shade);
			coriolis.addPolygon3(9,8,5,-shade);
			coriolis.addPolygon3(7,11,10,-shade);
			coriolis.addPolygon3(6,10,9,-shade);
			coriolis.addPolygon3(11,4,8,-shade);
	
			//coriolis.addPolygon4(0,1,2,3,175);
			return coriolis;
		}, 
		
		adder: function (name, size, shade){
			var adder = new Object(name);
			
			var sp = 10*(size/2);
			
			adder.addVertex(-70,0,-110);		// 0
			adder.addVertex(-70,0,-70);			// 1
			adder.addVertex(-50,19,-110);		// 2
			adder.addVertex(-50,19,10);			// 3
			
			adder.addVertex(70,19,10);			// 4
			adder.addVertex(70,19,-110);		// 5
			adder.addVertex(90,0,-70);			// 6
			adder.addVertex(90,0,-110);			// 7
			
			adder.addVertex(-50,0,90);			// 8
			adder.addVertex(70,0,90);			// 9
			adder.addVertex(70,-20,-110);		// 10
			adder.addVertex(70,-20,10);			// 11
			
			adder.addVertex(-50,-20,-110);		// 12
			adder.addVertex(-50,-20,10);		// 13
			adder.addVertex(-25,7,70);			// 14
			adder.addVertex(-25,12,50);			// 15
			
			adder.addVertex(45,12,50);			// 16
			adder.addVertex(45,7,70);			// 17
			adder.addVertex(-15,9,-112);		// 18
			adder.addVertex(35,9,-112);			// 19
			
			adder.addVertex(35,-15,-112);		// 20
			adder.addVertex(-15,-15,-112);		// 21
			adder.addVertex(18,20,-29);			// 22
			adder.addVertex(18,20,-89);			// 23
			
			adder.addVertex(38,20,-69);			// 24
			adder.addVertex(8,20,-29);			// 25
			adder.addVertex(8,20,-89);			// 26
			adder.addVertex(-12,20,-69);		// 27
			
			adder.addPolygon4(2,3,1,0,shade);
			adder.addPolygon4(4,3,2,5,shade);
			adder.addPolygon3(22,23,24,360-shade);
			adder.addPolygon3(27,26,25,360-shade);
			adder.addPolygon4(5,7,6,4,shade);
			adder.addPolygon3(3,8,1,shade);
			adder.addPolygon3(4,6,9,shade);
			adder.addPolygon4(8,3,4,9,shade);
			adder.addPolygon4(10,11,6,7,shade);
			adder.addPolygon3(6,11,9,shade);
			adder.addPolygon3(8,13,1,shade);
			adder.addPolygon4(0,1,13,12,shade);
			adder.addPolygon4(12,13,11,10,shade);
			adder.addPolygon4(8,9,11,13,shade);
			adder.addPolygon4(14,15,16,17,260);
			adder.addPolygon3(0,12,2,60);
			adder.addPolygon4(2,12,10,5,shade);
			adder.addPolygon3(5,10,7,180);
			adder.addPolygon4(20,19,18,21,130);		
			
			return adder;
		},
				
	asp: function (name, size, shade){
		var asp = new Object(name);
		
		asp.addVertex(105,	-10,	15);		// 0
		asp.addVertex(39,	-10,	97);		// 1
		asp.addVertex(79,	16,		27);		// 2
		asp.addVertex(-60,	-10,	97);		// 3
		
		asp.addVertex(-126,	-10,	15);		// 4
		asp.addVertex(-100,	16,		27);		// 5
		asp.addVertex(59,	-10,	-103);		// 6
		asp.addVertex(89,	-30,	37);		// 7
		
		asp.addVertex(-108,	-30,	37);		// 8
		asp.addVertex(-80,	-10,	-103);		// 9
		asp.addVertex(-10,	30,		-11);		// 10
		asp.addVertex(-10,	-10,	-103);		// 11	
		
		asp.addVertex(-30,	-10,	-103);		// 12
		asp.addVertex(9,	-10,	-103);		// 13
		asp.addVertex(-30,	-14,	85);		// 14
		asp.addVertex(-35,	-26,	49);		// 15
		
		asp.addVertex(-25,	-26,	49);		// 12
		asp.addVertex(12,	-26,	49);		// 13
		asp.addVertex(2,	-26,	49);		// 14
		asp.addVertex(7,	-14,	85);		// 15
		
		asp.addPolygon3(7,0,6,-shade);
		asp.addPolygon4(8,3,1,7,shade);	
		asp.addPolygon3(16,15,14,40);
		asp.addPolygon3(17,18,19,40);	
		asp.addPolygon4(6,9,8,7,shade);	
		asp.addPolygon3(6,2,10,40);
		asp.addPolygon3(5,9,10,40);
		asp.addPolygon3(11,6,10,360-shade);
		asp.addPolygon3(11,10,9,360-shade);
		asp.addPolygon3(2,1,10,-shade);
		asp.addPolygon3(1,3,10,-shade);
		asp.addPolygon3(3,5,10,-shade);
		asp.addPolygon3(11,12,13,-shade);
		asp.addPolygon3(11,9,12,-shade);
		
		asp.addPolygon3(6,11,13,-shade);
		asp.addPolygon3(9,5,4,-shade);
		asp.addPolygon3(8,9,4,-shade);
		asp.addPolygon3(3,8,4,-shade);
		asp.addPolygon3(4,5,3,-shade);
		asp.addPolygon3(1,2,0,-shade);
		asp.addPolygon3(0,7,1,-shade);
		asp.addPolygon3(0,2,6,-shade);
		
		return asp;
		
	},
	
	gecko: function (name, size, shade){
		var gecko = new Object(name);
		
		gecko.addVertex(-60,	30,		-100);		// 0
		gecko.addVertex(60,		30,		-100);		// 1
		gecko.addVertex(120,	0,		-60);		// 2
		gecko.addVertex(60,		-30,	-100);		// 3
		
		gecko.addVertex(-60,	-30,	-100);		// 4
		gecko.addVertex(-120,	0,		-60);		// 5
		gecko.addVertex(-30,	0,		100);		// 6
		gecko.addVertex(30,		0,		100);		// 7
		
		gecko.addVertex(10,		-6,		40);		// 8
		gecko.addVertex(25,		-27,	-80);		// 9
		gecko.addVertex(10,		-27,	-80);		// 10
		
		gecko.addVertex(-10,	-27,	-80);		// 11
		gecko.addVertex(-25,	-27,	-80);		// 12
		gecko.addVertex(-10,	-6,		40);		// 13
		
		gecko.addVertex(-30,	20,		-105);		// 14
		gecko.addVertex(30,		20,		-105);		// 15
		gecko.addVertex(-30,	-20,	-105);		// 16
		gecko.addVertex(30,		-20,	-105);		// 17
		
		gecko.addVertex(-90,	0,		-80);		// 18
		gecko.addVertex(-72,	10,		-92);		// 19
		gecko.addVertex(-72,	-10,	-92);		// 20
		
		gecko.addVertex(72,		10,		-92);		// 21
		gecko.addVertex(72,		-10,	-92);		// 22
		gecko.addVertex(90,		0,		-80);		// 23
		
		// Top
		gecko.addPolygon4(1,7,6,0,-shade);
		
		// Bottom
		gecko.addPolygon4(7,3,4,6,-shade);
		gecko.addPolygon3(8,9,10,shade);
		gecko.addPolygon3(11,12,13,shade);
		
		// Boosters right
		gecko.addPolygon3(5,4,0,shade);
		gecko.addPolygon3(20,19,18,shade);
		
		// Boosters left
		gecko.addPolygon3(1,3,2,shade);
		gecko.addPolygon3(21,22,23,shade);
		
		// Side flats bottom
		gecko.addPolygon3(2,7,1,shade);
		gecko.addPolygon3(6,5,0,shade);
		
		// Side flats top
		gecko.addPolygon3(5,6,4,shade);
		gecko.addPolygon3(3,7,2,shade);
		
		// Back
		gecko.addPolygon4(4,3,1,0,shade);
		gecko.addPolygon4(17,15,14,16,shade);
		
		return gecko;
		
	},
	
	python: function (name, size, shade){
		var python = new Object(name);

		python.addVertex(0,		0,		160);		// 0
		python.addVertex(-80,	0,		-80);		// 1
		python.addVertex(0,		50,		-30);		// 2
		python.addVertex(80,	0,		-80);		// 3
		
		python.addVertex(0,		50,		-80);		// 4
		python.addVertex(0,		30,		-160);		// 5
		python.addVertex(50,	0,		-160);		// 6
		python.addVertex(-50,	0,		-160);		// 7
		
		python.addVertex(0,		-50,	-30);		// 8
		python.addVertex(0,		-50,	-80);		// 9
		python.addVertex(0,		-30,	-160);		// 10
		python.addVertex(0,		-10,	-162);		// 11
		
		python.addVertex(10,	0,		-162);		// 12
		python.addVertex(0,		10,		-162);		// 13
		python.addVertex(-10,	0,		-162);		// 14

		python.addPolygon3(0,1,2,shade);
		python.addPolygon3(0,2,3,shade);
		python.addPolygon3(1,4,2,shade);
		python.addPolygon3(2,4,3,shade);
		
		python.addPolygon3(5,4,1,shade);
		python.addPolygon3(3,4,5,shade);
		python.addPolygon3(5,6,3,shade);
		python.addPolygon3(1,7,5,shade);
		
		python.addPolygon3(0,3,8,shade);
		python.addPolygon3(0,8,1,shade);
		python.addPolygon3(3,9,8,shade);
		python.addPolygon3(8,9,1,shade);
		
		python.addPolygon3(10,9,3,shade);
		python.addPolygon3(1,9,10,shade);
		python.addPolygon3(10,7,1,shade);
		python.addPolygon3(3,6,10,shade);
		
		//python.addPolygon3(5,7,10,-shade);
		//python.addPolygon3(5,10,6,-shade);
		python.addPolygon4(5,7,10,6,-shade);
		
		//python.addPolygon3(11,12,13,-shade);
		//python.addPolygon3(13,14,11,-shade);
		python.addPolygon4(13,14,11,12,-shade);
		
		return python;
		
	}

	};

}();