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
var mouse = {x: 0, y: 0};
var start_mouse = {x: 0, y: 0};

canvas.width = browser_width * .9;
canvas.height = browser_height * .9;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Creating a temp canvas
var tmp_canvas = document.createElement('canvas');
var tmp_ctx = tmp_canvas.getContext('2d');
tmp_canvas.id = 'tmp_canvas';
tmp_canvas.width = canvas.width;
tmp_canvas.height = canvas.height;

var mode="draw";
var tool = "brush";
$(".pick").on("click", function(){ 
    mode=$(this).attr('mode'); 
    // tool=$(this).attr('id');     
    let sel_tool = $(this).attr('id');
    // console.log(mode, sel_tool);   
    set_tool(tool, sel_tool);    
    $('.active').removeClass('active');
    $(this).addClass('active');
    if($(this).attr('mode') == "stamp"){
        $('#pick_stamp').addClass('active');
    }
    // $(this).addClass('active').siblings().removeClass('active')
    
});


// Capture mouse movement
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

// Set stroke join and end types
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.strokeStyle = "black";
function getColor(color){ctx.strokeStyle = color;}

function getSize(size){ctx.lineWidth = size;}

function load_image(url){
    var image=new Image();
    image.onload=function(){
        var percent, img_width, img_height;
        if(image.width > canvas.width  || image.height > canvas.height){
            if (image.height > image.width){
                percent = canvas.height/image.height;           
            }else{
                percent = canvas.width/image.width;
            };
            img_width = image.width * percent;
            img_height = image.height * percent;
        } else {
            img_width = image.width;
            img_height = image.height;
        }
        ctx.drawImage(image,0,0,img_width,img_height);
    };
    image.src=url;    
}
//ctx.strokeStyle = 
//ctx.strokeStyle = document.settings.color[1].value;

canvas.addEventListener('mousedown', function(e) {
    if(mode == "stamp"){
        onStamp();
    }
    else {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
    }
    if(tool == 'line'){
        start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;

        onLine();
    }

}, false);

tmp_canvas.addEventListener('mousedown', function(e) {

    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
tmp_canvas.addEventListener('mousemove', onPaint, false);

if(colored) {
    tmp_ctx.strokeStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    tmp_ctx.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
} else {
    tmp_ctx.strokeStyle = 'black';
    tmp_ctx.globalAlpha = Math.random(); 
}

    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    start_mouse.x = mouse.x;
    start_mouse.y = mouse.y;
    
    onPaint();
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

tmp_canvas.addEventListener('mouseup', function() {
    tmp_canvas.removeEventListener('mousemove', onPaint, false);
    
    // Writing down to real canvas now
    ctx.drawImage(tmp_canvas, 0, 0);
    // Clearing tmp canvas
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
}, false);

var onPaint = function() {
    if(mode == "draw"){
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }    
};

var onStamp = function() {
    var w = ctx.lineWidth;
    ctx.lineWidth = 2;
    var rpt = 6;
    var x = mouse.x - (rpt*.9 * w);
    var y = mouse.y - (rpt*.9 * w);
    console.log(x, y);
    for (let i = 0; i < rpt; i++) {
        for (let j = 0; j < rpt; j++) {
            ctx.beginPath();
            // ctx.arc(x + j * (w*2.2) , y + i * (w*2.2), w, 0, Math.PI * 2, true);
            drawStamp(i, j, x, y, w);
            
        }}
    ctx.lineWidth = w;
}

var onLine = function() {
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    tmp_ctx.lineWidth = this.lineWidth;
    tmp_ctx.beginPath();
    tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
    tmp_ctx.lineTo(mouse.x, mouse.y);
    tmp_ctx.stroke();
    tmp_ctx.closePath();
} 

function drawStamp(i, j, x, y, w) {
    switch (tool) {
        case 'circles':
            ctx.arc(x + j * (w*2.2) , y + i * (w*2.2), w*.9, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        case 'squares':
            // ctx.strokeRect(x + j * (w*2.2) , y + i * (w*2.2), w, w);
            ctx.strokeRect(x + j * (w*2.2) , y + i * (w*2.2), w*1.7, w*1.7)
            ctx.stroke();
            break;        
    }
}

$('#reset').on("click", function() {     
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});


