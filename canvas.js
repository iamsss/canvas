var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.fillRect(100,50,50,50);
c.fillRect(200,100,30,30);
c.fillRect(100,160,30,30);
c.fillRect(60,10,20,20);

// Line

c.beginPath();
c.moveTo(50,30);
c.lineTo(80,200);
c.stroke();

//Arc Circle 

//c.beginPath();
//c.arc(300,300,40,0,Math.PI * 2, false);
//c.strokeStyle='red';
//c.stroke();

// For Loop For Creating Multiple Shapes

for(var i = 0; i < 100; i++) {
    var x = Math.random() * window.innerWidth; // For Generating random position of width all over the window
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x,y,30,0,Math.PI *2, false);
    c.stroke();
}

