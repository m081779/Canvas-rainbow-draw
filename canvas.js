
//initializing the canvas with context
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//setting the size of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//initializing variables
var lastX = 0;
var lastY = 0;
var hue = 0;

//flags for use later
var direction = true;
var isDrawing = false;

c.beginPath();
c.strokeStyle = "white";
c.textAlign = "center";
c.font = "70px Arial";
c.strokeText("DRAW ON ME!",canvas.width/2,canvas.height/2);


//main function, called when mouse is down and moving
function draw(e) {
	//conditional checking isDrawing flag, to stop the drawing when false
	if (!isDrawing) {
		return;
	}

	
	//commented out block will add seizure inducing background.  
	//uncomment at own risk!!


		// var R = Math.floor(Math.random()*256);
		// var G = Math.floor(Math.random()*256);
		// var B = Math.floor(Math.random()*256);
		// canvas.style.background = 'rgba('+ R + ', ' + G + ', ' + B + ', 1)';


	//draw methods
	c.lineJoin = 'round';
	c.lineCap = 'round';
	c.strokeStyle = 'hsl('+hue+', 100%, 50%)';
	c.beginPath();
	//start position set by mousedown event
	c.moveTo(lastX, lastY);
	c.lineTo(e.offsetX, e.offsetY);	
	c.stroke();

	//sets variables for start of line to current position of mouse when moving
	lastX = e.offsetX;
	lastY = e.offsetY;

	//increments hue variable every time mousemove event fires
	hue++;

	//resets hue variable when it exceeds max value
	if (hue>=360){
	hue = 0;
	}

	//checks max and min limits of the line width, and changes direction flag when reached
	if (c.lineWidth>=50 || c.lineWidth <=1) {
		direction = !direction;
	}

	//if direction is true, line is growing
	if (direction) {
		c.lineWidth+=1;
	//if direction is false, line is shrinking
	} else {
		c.lineWidth-=1;
	}
}

///////////event listeners///////////

//draw function is called everytime mouse moves, but draw function
//returns immediately unless...
canvas.addEventListener('mousemove', function (e) {
	draw(e);
});
//...mousedown event fires, setting isDrawing to true.
//this ensures that drawing only happens when mouse is held down.
canvas.addEventListener('mousedown', function (e) {
	isDrawing = true;
	lastX = e.offsetX;
	lastY = e.offsetY;
});

//these events prevent drawing when mouse isn't clicked or is off the screen
//without mouseout event, program won't register a mouseup when mouse is off the screen
canvas.addEventListener('mouseout', function () {
	isDrawing = false;	
});
canvas.addEventListener('mouseup', function () {
	isDrawing = false;
});