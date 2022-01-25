var programCode = function(processingInstance) {
  with(processingInstance) {
    size(screen.width-50, screen.height-50);
    frameRate(60);
		
		var totalNodes = 25;
    var gravity = 0.1;
    var airResistance = 0.97;
    var elasticity = 0.1;
		
    var nodes = [{}];
		var mouseIsPressed = false;
		for(var i = 0; i < totalNodes; i++){
			nodes[i]={
				x: width / 2,
				y: 100,
				xVel: 0,
				yVel: 0,
    	};
		}
		
		mousePressed = function(){mouseIsPressed=true;};
		mouseReleased = function(){mouseIsPressed=false};
		
		strokeWeight(1);
		
    draw = function() {
      background(255);
			
			nodes[0] = {
        x: width/2,
        y: height/10,
        xVel: 0,
        yVel: 0,
      };
			
			if(mouseIsPressed){
				nodes[totalNodes] = {x: mouseX, y: mouseY, xVel: 0, yVel: 0};
			}
			
			var length = nodes.length;
			
      for (var i = 0; i < length; i++) {
        if (nodes[i - 1]) {
          var angle = atan2(nodes[i-1].x-nodes[i].x, nodes[i-1].y-nodes[i].y);
          var distance = dist(nodes[i].x, nodes[i].y, nodes[i - 1].x, nodes[i - 1].y);

          nodes[i].xVel += sin(angle) * distance * elasticity;
          nodes[i].yVel += cos(angle) * distance * elasticity;
          nodes[i].yVel += gravity;
          nodes[i-1].xVel -= sin(angle) * distance * elasticity;
          nodes[i-1].yVel -= cos(angle) * distance * elasticity;
          nodes[i].x += nodes[i].xVel;
          nodes[i].y += nodes[i].yVel;
					
					nodes[i].xVel *= airResistance;
					nodes[i].yVel *= airResistance;
        }
      }
			
			beginShape();
			for(var i = 0; i < length; i++){
				vertex(nodes[i].x, nodes[i].y);
			}
			endShape();
			beginShape();
			for(var i = 0; i < length; i++){
				vertex(nodes[i].x, nodes[i].y);
				if(nodes[i-1]){
					vertex(nodes[i - 1].x, nodes[i - 1].y);
				}			
			}
			endShape();
    };
  }
};

var canvas = document.getElementById("mycanvas");
var processingInstance = new Processing(canvas, programCode);
