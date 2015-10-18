var scale = 1.0;
var rainbowColors = ['#FF8F8F', '#FFCC66', '#FFFA66', '#A0F7BD', '#A0E1F7', '#AA9CFF','#E18FFF'];
var rainbowStrings = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

var GRID_SIZE_PX = 1000;
var GRID_STROKE_HEX = '#ff0000';
var GRID_FILL_COLOR = 'none';
var GRID_STROKE_WIDTH = 0.5;
var CIRCLE_RADIUS = 50;
var CIRCLE_FILL_COLOR = 'none';
var CIRCLE_STROKE_WIDTH = 0.5;

var draw = SVG('drawing');
//draw.rect(100,100).animate().fill('#f03').move(100,100)

//draw.line(0, 0, 250*scale, 250*scale).stroke({width: 0.5});
//draw.line(0, 250*scale, 250*scale, 0).stroke({width: 0.5});

function getColor(newColor) {
    var color = newColor;
    if(newColor == "rainbow") {
	color = rainbowColors[i%rainbowColors.length];
    } else if(rainbowStrings.indexOf(newColor) > -1) {
	color = rainbowColors[rainbowStrings.indexOf(newColor)];
    }    
    return color;
}

//draw.rect(100*scale, 100*scale).move(75*scale, 75*scale).fill('none').stroke({width:0.1})

function round2dec(num) {
    return Math.round(num*100)/100;
}

function calcXCoord(theta, r) {
    return round2dec(Math.cos(theta)*r);
}

function calcYCoord(theta, r) {
    return round2dec(Math.sin(theta)*r);
}

function translateXCoord(xCoord) {
    return GRID_SIZE_PX/2 + xCoord;
}

function translateYCoord(yCoord) {
    return GRID_SIZE_PX/2 - yCoord;
}

function circleCoordAdjust(coord, r) {
    return coord-r;
}

function circleYAdjust(yCoord, r) {
    return yCoord-r;
}

function starCircle(originX, originY, radius, numLines, rotation, color) {
    var x1 = originX;
    var y1 = originY;
    for(var i = 0; i < numLines; i++) {
	var x2 = calcXCoord(radius, ((Math.PI*2)/numLines)*i+rotation)+originX;
	var y2 = calcYCoord(radius, ((Math.PI*2)/numLines)*i+rotation)+originY;
	draw.line(x1, y1, x2, y2).stroke({width: 1, color:getColor(color)});
    }
}

function tangentCircle(originX, originY, radius, numLines) {
    for(var i = 1; i < numLines; i++) {
	var x1 = calcXCoord(radius, ((Math.PI*2)/numLines)*(i-1))+originX;
	var y1 = calcYCoord(radius, ((Math.PI*2)/numLines)*(i-1))+originY;
	var x2 = calcXCoord(radius, ((Math.PI*2)/numLines)*(i+1))+originX;
	var y2 = calcYCoord(radius, ((Math.PI*2)/numLines)*(i+1))+originY;
	draw.line(x1, y1, x2, y2).stroke({width: 1, color:'#eee'});
    }
}

function fibfor (n1, n2, count) {
    //console.log(n2);
    if (count === 0) {
	return n2;
    }
    return fibfor (n2, n1+n2, count-1);
}

function fib (count) {
    return fibfor (1, 1, count);
}

/*
 * @param x, y, are centre of circle
 */
function cartCircle(x, y, r, c) {
    var strokeColor = c ? c : '#000';
    draw.circle(2*r).move(translateXCoord(x)-r, translateYCoord(y)-r).fill(CIRCLE_FILL_COLOR).stroke({width: CIRCLE_STROKE_WIDTH, color: strokeColor});
}

/*
 * @param d is distance from centre
 */
function polarCircle(theta, r, _d, c) {
    var d = _d ? _d : 0;
    //var x = circleCoordAdjust(translateXCoord(calcXCoord(theta, r)), r);
    //var y = circleCoordAdjust(translateYCoord(calcYCoord(theta, r)), r);
    //draw.circle(2*r).move(x, y).fill(CIRCLE_FILL_COLOR).stroke({width: CIRCLE_STROKE_WIDTH});
    var x = calcXCoord(theta, r+d);
    var y = calcYCoord(theta, r+d);
    cartCircle(x, y, r, c);
}

function polarCircleRing(theta, angle, r, distance, numCircles, color) {
    for (var i = 0; i < numCircles; i++) {
	polarCircle((i*theta)+angle, r, distance, color);
    }
}

//grid
draw.rect(GRID_SIZE_PX, GRID_SIZE_PX).fill(GRID_FILL_COLOR).stroke({width: GRID_STROKE_WIDTH, color: GRID_STROKE_HEX});
draw.line(GRID_SIZE_PX/2, 0, GRID_SIZE_PX/2, GRID_SIZE_PX).stroke({ width: GRID_STROKE_WIDTH, color: GRID_STROKE_HEX});
draw.line(0, GRID_SIZE_PX/2, GRID_SIZE_PX, GRID_SIZE_PX/2).stroke({ width: 0.5, color: GRID_STROKE_HEX});

//draw.line(GRID_SIZE_PX/2, GRID_SIZE_PX/2, GRID_SIZE_PX/2+CIRCLE_RADIUS, GRID_SIZE_PX/2-CIRCLE_RADIUS).stroke({ width: 0.5, color: GRID_STROKE_HEX});

//circles
cartCircle(0, 0, CIRCLE_RADIUS);
//polarCircle(0, CIRCLE_RADIUS);
//cartCircle(CIRCLE_RADIUS, CIRCLE_RADIUS, CIRCLE_RADIUS);
//polarCircle(0, CIRCLE_RADIUS);
//polarCircle(Math.PI/2, CIRCLE_RADIUS);

var i = 0;
var numCircles = 6;

for (i = 0; i < numCircles; i++) {
    polarCircle(i*(Math.PI/3), CIRCLE_RADIUS, 0);
}

for (i = 0; i < numCircles; i++) {
    polarCircle(i*(Math.PI/3), CIRCLE_RADIUS, CIRCLE_RADIUS*i, '#ff00ff');
}

polarCircleRing(Math.PI/3, Math.PI/6, CIRCLE_RADIUS, CIRCLE_RADIUS/Math.SQRT2, 6);
polarCircleRing(Math.PI/3, 0, CIRCLE_RADIUS, CIRCLE_RADIUS, 6, '#000000');

//var circle = draw.circle(100).move(100,100).fill('#fff').stroke({width: 0.5});

//fib(10);

//eye
/*
starCircle(125, 125, 75, 40, 0, 'blue');
starCircle(125, 125, 75, 40, Math.PI/8, 'green');
starCircle(125, 125, 25, 40, Math.PI/16, 'white');

for(var i = 0; i <= 10; i++) {
    draw.line(0*scale, i*25*scale, i*25*scale, 250*scale).stroke({width: 1, color:getColor('rainbow')});
}

for(var i = 0; i <= 10; i++) {
    draw.line(250*scale, i*25*scale, i*25*scale, 0*scale).stroke({width: 1, color:getColor('rainbow')});
}
*/

