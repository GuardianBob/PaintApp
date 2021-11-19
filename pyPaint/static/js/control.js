var store_brush;
var store_color;
var colorPicker = document.querySelector("#colorPicker");
var slider = document.getElementById("brush_size");
var output = document.getElementById("b_size");
output.innerHTML = slider.value;
var store_eraser = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    getSize(this.value);
}

function startup() {        
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
    // $("#color_code").css('color', event.target.value);
    getColor(event.target.value)
    // $('#brush').trigger("click");
}

// remove this once controls are finished 
$('.btn-secondary').on("click", function() {
    $(this).addClass('active').siblings().removeClass('active')
});

$('#eraser').on("click", function() {
    $(this).addClass('active').siblings().removeClass('active')
    store_brush = slider.value;
    store_color = colorPicker.value;
    getSize(store_eraser);
    getColor('#FFFFFF');
    output.innerHTML = store_eraser;
    slider.value = store_eraser;
})

$('#brush').on("click", function() {
    store_eraser = slider.value;
    $(this).addClass('active').siblings().removeClass('active')
    getSize(store_brush);
    getColor(store_color);
    output.innerHTML = store_brush;
    slider.value = store_brush;
})