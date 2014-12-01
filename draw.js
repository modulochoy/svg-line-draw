var scale = 1.0;
var rainbowColors = ['#FF8F8F', '#FFCC66', '#FFFA66', '#A0F7BD', '#A0E1F7', '#AA9CFF','#E18FFF'];
var rainbowStrings = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

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

function calcXCoord(radius, theta) {
    return Math.round(Math.sin(theta)*radius);
}

function calcYCoord(radius, theta) {
    return Math.round(Math.cos(theta)*radius);
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

//eye

starCircle(125, 125, 75, 40, 0, 'blue');
starCircle(125, 125, 75, 40, Math.PI/8, 'green');
starCircle(125, 125, 25, 40, Math.PI/16, 'white');

for(var i = 0; i <= 10; i++) {
    draw.line(0*scale, i*25*scale, i*25*scale, 250*scale).stroke({width: 1, color:getColor('rainbow')});
}

for(var i = 0; i <= 10; i++) {
    draw.line(250*scale, i*25*scale, i*25*scale, 0*scale).stroke({width: 1, color:getColor('rainbow')});
}


