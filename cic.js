
    
const canvas = document.getElementById("myCanvas");
var img = document.getElementById("scream");
const ctx = canvas.getContext("2d");
var x=10, y=10, vw=img.width,vh=img.height;
canvas.width = 250;
canvas.height = 250;


img.addEventListener('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('clicked');
    console.log(vw);
    vw -= 10;
    vh -= 10;
    drawImg(ctx,x,y,vw,vh);
})

img.addEventListener('mouseover',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('clicked');
    console.log(vw);
    vw -= 10;
    vh -= 10;
    drawImg(ctx,x,y,vw,vh);
})

function drawImg(ctx,x,y,vw,vh) {
    ctx.drawImage(img, x, y, vw, vh);
}

    

window.onload = function() {
    drawImg(ctx,x,y,vw,vh);
};


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
var v=50;

slider.oninput = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('clicked');
    console.log(vw);
    var val = this.value - v;
   if((vw >= 250 && vh >= 250) || val>0) {
    vw += val*10;
    vh += val*10;
   }
    
    drawImg(ctx,x,y,vw,vh);
    
    output.innerHTML = this.value;
    v = this.value;
  }

  