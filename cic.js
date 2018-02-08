
    
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var x=10, y=10, vw=220,vh=277;
canvas.width = 240;
canvas.height = 297;

var img = document.getElementById("scream");

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