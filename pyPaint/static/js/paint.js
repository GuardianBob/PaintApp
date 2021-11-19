var canvas = document.getElementById('paint');
var ctx;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    // drawing code here
} else {
    alert("Unsupported");
}

// ctx.save();

var sketch = document.getElementById('sketch');
var sketch_style = getComputedStyle(sketch);
var browser_width = window.innerWidth;
var browser_height = window.innerHeight;
canvas.width = browser_width * .9;
canvas.height = browser_height * .9;

var mode="brush";
$("#brush").on("click", function(){ mode="brush"; });
$("#eraser").on("click", function(){ mode="eraser"; });

var mouse = {x: 0, y: 0};

/* Mouse Capturing Work */
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

/* Drawing on Paint App */
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.strokeStyle = "black";
function getColor(colour){ctx.strokeStyle = colour;}

function getSize(size){ctx.lineWidth = size;}


//ctx.strokeStyle = 
//ctx.strokeStyle = document.settings.colour[1].value;

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

$('#reset').on("click", function() {     
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});