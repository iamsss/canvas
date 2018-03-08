var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var canvas =document.getElementById('canvasInAPerfectWorld');
var context = document.getElementById('canvasInAPerfectWorld').getContext("2d");
canvas.width = 490;
canvas.height = 220;

var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
var crayonTextureImage = new Image()
crayonTextureImage.src ="https://raw.githubusercontent.com/williammalone/Simple-HTML5-Drawing-App/master/images/crayon-texture.png";
console.log('Draw Work');
function handleMouseDown(e) {
    offsetX = canvas.offsetLeft;
    offsetY = canvas.offsetTop;
    var mouseX = e.pageX - offsetX;
    var mouseY = e.pageY - offsetY;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
}


function handleMouseMove(e) {
    console.log('Mouse Move');
    if(paint){
        addClick(e.pageX - offsetX, e.pageY - offsetY, true);
        redraw();
      }
}

function handleMouseUp(e) {
        paint = false;
}

function handleMouseLeave(e) {
    console.log('MouseLeave');
    paint = false;
}

//  save the click position
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
    console.log('Redraw Call');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.strokeStyle = "red";
    context.lineJoin = "round";
    context.lineWidth = 15;
              
    for(var i=0; i < clickX.length; i++) {	
        console.log('Inside For Loop');	
      context.beginPath();
      console.log(clickDrag[i],i);	
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
        
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       console.log('ClickXY',clickX[i-1], clickY[i-1])
       context.lineTo(clickX[i], clickY[i]);
       context.globalAlpha = 0.4;
       
       context.drawImage(crayonTextureImage, 0, 0, canvas.width, canvas.height);
       context.closePath();
       context.stroke();
    }
  }

  canvas.addEventListener("mousemove", handleMouseMove, false);
