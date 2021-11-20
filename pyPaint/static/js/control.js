let brush = {};
let eraser = {};
let stamp = {};
var tool = "brush";
var colorPicker = document.querySelector("#colorPicker");
var slider = document.getElementById("brush_size");
var output = document.getElementById("b_size");
output.innerHTML = slider.value;
eraser.size = "25";
stamp.size = "10";

slider.oninput = function() {
    output.innerHTML = this.value;
    getSize(this.value);
}

function startup() {        
    colorPicker.value = defaultColor;
    // colorPicker.addEventListener("input", updateFirst, false);
    // colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

colorPicker.addEventListener("input", watchColorPicker, false);

function watchColorPicker(event) {
    // $("#color_code").css('color', event.target.value);
    getColor(event.target.value);
    if(tool == "eraser"){
        tool = "brush";
        getSize(brush.size);
        output.innerHTML = brush.size;
        slider.value = brush.size;
        $("#brush").addClass('active').siblings().removeClass('active');
    }

}


function set_tool(tool, sel_tool){
    switch(tool) {
        case 'brush':
            brush.size = slider.value;
            brush.color = colorPicker.value;
            break;
        case 'eraser':
            eraser.size = slider.value;
            break;
        case 'circles':
        case 'squares':
            stamp.size = slider.value;
            stamp.color = colorPicker.value;
            break;
    };    
    switchTool(sel_tool);
}

function switchTool(sel_tool) {
    tool = sel_tool;
    switch(sel_tool) {
        case 'brush':
            typeof brush.size === 'undefined' ? null : slider.value = brush.size, output.innerHTML = brush.size, getSize(brush.size);
            typeof brush.color === 'undefined' ? null : colorPicker.value = brush.color, getColor(brush.color);
            break;
        case 'eraser':
            typeof eraser.size === 'undefined' ? null : slider.value = eraser.size, output.innerHTML = eraser.size, getColor('white'), getSize(eraser.size);
            break;
        case 'circles':
        case 'squares':
            typeof stamp.size === 'undefined' ? null : slider.value = stamp.size, output.innerHTML = stamp.size, getSize(stamp.size);
            typeof stamp.color === 'undefined' ? null : colorPicker.value = stamp.color, getColor(stamp.color);
            break;
        
    }
}