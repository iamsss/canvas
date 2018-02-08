window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    canvas.width = 240;
    canvas.height = 297;
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10, 220, 277);
};