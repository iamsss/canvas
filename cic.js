

const canvas = document.getElementById("myCanvas");
var img;
const ctx = canvas.getContext("2d");
var x = 0, y = 0, vw = 0, vh = 0;
canvas.width = 250;
canvas.height = 250;
var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
var left = vw + x - 250; // For stop sliding left when it is negative
var right = vh + y - 250; // For stop sliding down when it is negative
var zoom = 100; // It is value for zooming image strength in slider
var isDown = false; // Dragging Flag


function setVwVh() {
    vw = img.width;
    vh = img.height;
};
function previewFile() {
    var preview = document.querySelector('img');
    var file = URL.createObjectURL(document.querySelector('input[type=file]').files[0]);
    var reader = new Image();

    reader.onload = function () {
        img = reader;
        console.log(img);
        setVwVh();
        drawImg(ctx, x, y, vw, vh)
    }

    if (file) {
        reader.src = file;
    } else {
        preview.src = "";
    }
}


function initilizeLR() {
    left = vw + x - 250; // For stop sliding left when it is negative
    right = vh + y - 250; // For stop sliding down when it is negative
}

function clear(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function checkVwVh(){
    if(vw<vh){
        pvw = vw;
        if(vw < 250){
            vw = 250;
        }
        ratio = vw/pvw;
        vh = vh * ratio;
    }else {
        pvh = vh;
        if(vh < 250){
            vh = 250;
        }
    
        ratio = vh/pvh;
        vw = vw * ratio;
    } 
}
function drawImg(ctx, x, y, vw, vh) {
     
    checkVwVh();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (img) {
        ctx.drawImage(img, x, y, vw, vh);
    }

}



window.onload = function () {
    drawImg(ctx, x, y, vw, vh);
};


// Slider Option 

var slider = document.getElementById("myRange");  // Selecting Range Slider
var v = 50; // default slider Value

function slideImg(val) {
    if(vw > vh) { 
    pvw = vw;
    vw += val * zoom;
    ratio = vw/pvw;
    vh = vh * ratio;
} else {
    pvh = vh;
    vh += val * zoom;
    ratio = vh/pvh;
    vw = vw * ratio;
}
    checkVwVh();
    console.log('X Y',x,y);
    console.log('vw vh',vw,vh);
    console.log(y+vh);
    console.log(x+vw);
    if(y+vh<=250){
        y = 250-vh;
    }
    
    if(x+vw<=250){
        x = 250-vw;
    }
    if(y>=0){
        y=0;
    }
    if(x>=0){
        x=0;
    }
    console.log(left);
    console.log(right);
    if(vw < 250){
        vw = 250;
    }
    if(vw >= 250 && vh >= 250 && left >= 0 && right >= 0) {
        
    drawImg(ctx, x, y, vw, vh);
    }
}

slider.oninput = function () { // triggered when sliding start

   
    var val = this.value - v; // Getting Difference of slided now to previous slided
    initilizeLR(); // initializing left and right
    console.log('Value',val);
    if (left > 0 && right > 0) { // Checking Is it not under flow  Image in slider

        if ((vw >= 250 && vh >= 250) || val > 0) { // val is positive than increase sliding and checking image is not less than canvas size
            slideImg(val);
        }
        // Starting Case when Image try to underflow
    } else if (left > 0) {
        y = 250 - vh;
        if ((vw >= 250 && vh >= 250) || val > 0) {
            slideImg(val);
        }
    } else if (right > 0) {
        x = 250 - vw;
        if ((vw >= 250 && vh >= 250) || val > 0) {
            slideImg(val);
        }
    } else {
        
        if ((vw >= 250 && vh >= 250) || val > 0) {
            slideImg(val);
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
    move(e.clientX, e.clientY);
}


canvas.addEventListener('touchstart', function (e) {
    isDown = true; // setting the dragging flag
    mouseX = parseInt(e.changedTouches[0].pageX - offsetX);
    mouseY = parseInt(e.changedTouches[0].pageY - offsetY);

    // set the starting drag position 
    // this is needed in mousemove to determine how far we have dragged
    lastX = mouseX;
    lastY = mouseY;
}, false);

canvas.addEventListener('touchend', function (e) {
    isDown = false; // clear the dragging flag
}, false);

canvas.addEventListener('touchmove', function (e) {
    move(e.changedTouches[0].pageX, e.changedTouches[0].pageY);

}, false);


function move(pageX, pageY) {
    if (!isDown) { return; }

    //get mouse coordinates 
    mouseX = parseInt(pageX - offsetX);
    mouseY = parseInt(pageY - offsetY);

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
    minX = 0;
    minY = 0;

    initilizeLR(); // initializing left and right
    console.log('X Y', x, y);
    console.log('vX VH', vw, vh);
    if (x <= 0 && y <= 0) {
        if (x + vw >= 250 && y + vh >= 250) {

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

        } else if (x + vw >= 250) {
            y = maxY;
            drawImg(ctx, x, y, vw, vh);
        } else if (y + vh >= 250) {
            x = maxX;
            drawImg(ctx, x, y, vw, vh);
        } else {
            x = maxX;
            y = maxY;
        }
    } else if (x <= 0) {
        
        y = minY;
        if (x + vw >= 250 && y + vh >= 250) { 
        drawImg(ctx, x, y, vw, vh);
        }
    } else if (y <= 0) {
        x = minX;
        if (x + vw >= 250 && y + vh >= 250) { 
            drawImg(ctx, x, y, vw, vh);
            }
    } else {
        x = minX;
        y = minY;
    }
}

function GImage() {  // to generate the image
    var img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = canvas.toDataURL();
    document.body.appendChild(img);

}