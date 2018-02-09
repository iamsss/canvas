

const canvas = document.getElementById("myCanvas");
var img = document.getElementById("scream");
const ctx = canvas.getContext("2d");
var x = 10, y = 10, vw = img.width, vh = img.height;
canvas.width = 250;
canvas.height = 250;
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
var left = vw + x - 250; // For stop sliding left when it is negative
var right = vh + y - 250; // For stop sliding down when it is negative
var zoom = 10; // It is value for zooming image strength in slider
var isDown = false; // Dragging Flag


function initilizeLR() {
    left = vw + x - 250; // For stop sliding left when it is negative
    right = vh + y - 250; // For stop sliding down when it is negative
}

function clear(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawImg(ctx, x, y, vw, vh) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, vw, vh);
}



window.onload = function () {
    drawImg(ctx, x, y, vw, vh);
};


// Slider Option 

var slider = document.getElementById("myRange");  // Selecting Range Slider
var v = 50; // default slider Value

slider.oninput = function () { // triggered when sliding start

    var val = this.value - v; // Getting Difference of slided now to previous slided
    initilizeLR(); // initializing left and right
    if (left > 0 && right > 0) { // Checking Is it not under flow  Image in slider

        if ((vw >= 250 && vh >= 250) || val > 0) { // val is positive than increase sliding and checking image is not less than canvas size
            vw += val * zoom;   // 
            vh += val * zoom;
            drawImg(ctx, x, y, vw, vh);
        }
        // Starting Case when Image try to underflow
    } else if (left > 0) {
        y = 250 - vh;
        if ((vw >= 250 && vh >= 250) || val > 0) {
            vw += val * zoom;
            vh += val * zoom;
            drawImg(ctx, x, y, vw, vh);
        }
    } else if (right > 0) {
        x = 250 - vw;
        if ((vw >= 250 && vh >= 250) || val > 0) {
            vw += val * zoom;
            vh += val * zoom;
            drawImg(ctx, x, y, vw, vh);
        }
    } else {
        x = 250 - vw;
        y = 250 - vh;
        if ((vw >= 250 && vh >= 250) || val > 0) {
            vw += val * zoom;
            vh += val * zoom;
            drawImg(ctx, x, y, vw, vh);
        }
    }

    v = this.value;
}

function handleMouseDown(e) {
    isDown = true; // setting the dragging flag
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // set the starting drag position 
    // this is needed in mousemove to determine how far we have dragged
    lastX = mouseX;
    lastY = mouseY;

}

function handleMouseUp(e) {
    isDown = false; // clear the dragging flag
}

function handleMouseMove(e) {

    if (!isDown) { return; }

    //get mouse coordinates
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // calc how much the mouse has moved since we were last here
    var dx = mouseX - lastX;
    var dy = mouseY - lastY;

    // set the lastXY for next time we're here
    lastX = mouseX;
    lastY = mouseY;

    x += dx;
    y += dy;

    maxX = -(vw - 250);
    maxY = -(vh - 250);
    minX = 10;
    minY = 10;
    
    initilizeLR(); // initializing left and right
    
    if (x <= 10 && y <= 10) {
        if (left >= 0 && right >= 0) {
            drawImg(ctx, x, y, vw, vh);
        } else if (left >= 0) {
            y = maxY;
            drawImg(ctx, x, y, vw, vh);
        } else if (right >= 0) {
            x = maxX;
            drawImg(ctx, x, y, vw, vh);
        } else {
            x = maxX;
            y = maxY;
        }
    } else if (x <= 10) {
        y = minY;
        drawImg(ctx, x, y, vw, vh);
    } else if (y <= 10) {
        x = minX;
        drawImg(ctx, x, y, vw, vh);
    } else {
        x = minX;
        y = minY;
    }
}
