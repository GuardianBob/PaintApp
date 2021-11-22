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

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    console.log(mode);
    if(mode == "stamp"){
        onStamp();
    }else {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
    }    
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    if(mode == "draw"){
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }    
};

function onStamp() {
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


