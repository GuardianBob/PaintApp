

var colorLayerData,
    outlineLayerData,
    drawingAreaX = 0,
    drawingAreaY = 0,
    canvasHeight = canvas.height,
    canvasWidth = canvas.width,
    drawingAreaWidth = canvasWidth,
    drawingAreaHeight = canvasHeight,
    curColor = colorPicker.value,
    totalLoadResources = 3,
    curLoadResNum = 0,
    outlineImage = new Image(),
    swatchImage = new Image(),
    backgroundImage = new Image(),





matchOutlineColor = function (r, g, b, a) {

    return (r + g + b < 100 && a === 255);
},

matchStartColor = function (pixelPos, startR, startG, startB) {

    var r = outlineLayerData.data[pixelPos],
        g = outlineLayerData.data[pixelPos + 1],
        b = outlineLayerData.data[pixelPos + 2],
        a = outlineLayerData.data[pixelPos + 3];

    // console.log(colorPicker.value)
        // If current pixel of the outline image is black
    if (matchOutlineColor(r, g, b, a)) {
        return false;
    }
    console.log(r, g, b, a);

    r = colorLayerData.data[pixelPos];
    g = colorLayerData.data[pixelPos + 1];
    b = colorLayerData.data[pixelPos + 2];

    // If the current pixel matches the clicked color
    if (r === startR && g === startG && b === startB) {
        return true;
    }

    // If current pixel matches the new color
    if (r === curColor.r && g === curColor.g && b === curColor.b) {
        return false;
    }

    return true;
},

colorPixel = function (pixelPos, r, g, b, a) {

    colorLayerData.data[pixelPos] = r;
    colorLayerData.data[pixelPos + 1] = g;
    colorLayerData.data[pixelPos + 2] = b;
    colorLayerData.data[pixelPos + 3] = a !== undefined ? a : 255;
},

floodFill = function (startX, startY, startR, startG, startB) {

    console.log(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    var newPos,
        x,
        y,
        pixelPos,
        reachLeft,
        reachRight,
        drawingBoundLeft = drawingAreaX,
        drawingBoundTop = drawingAreaY,
        drawingBoundRight = drawingAreaX + drawingAreaWidth - 1,
        drawingBoundBottom = drawingAreaY + drawingAreaHeight - 1,
        pixelStack = [[startX, startY]];

        console.log(`pixelStack: ${startX}, ${startY}`)
    
    while (pixelStack.length) {
        newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];
        console.log(newPos, x, y);
        // Get current pixel position
        pixelPos = (y * canvasWidth + x) * 4;
        console.log(pixelPos);

        // Go up as long as the color matches and are inside the canvas
        while (y >= drawingBoundTop && matchStartColor(pixelPos, startR, startG, startB)) {
            y -= 1;
            pixelPos -= canvasWidth * 4;
        }

        pixelPos += canvasWidth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;
        console.log(pixelStack.length);
        console.log(pixelPos);
        console.log(curColor.r, curColor.g, curColor.b)
        // Go down as long as the color matches and in inside the canvas
        while (y <= drawingBoundBottom && matchStartColor(pixelPos, startR, startG, startB)) {
            y += 1;

            colorPixel(pixelPos, curColor.r, curColor.g, curColor.b);

            if (x > drawingBoundLeft) {
                if (matchStartColor(pixelPos - 4, startR, startG, startB)) {
                    if (!reachLeft) {
                        // Add pixel to stack
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < drawingBoundRight) {
                if (matchStartColor(pixelPos + 4, startR, startG, startB)) {
                    if (!reachRight) {
                        // Add pixel to stack
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pixelPos += canvasWidth * 4;
        }
    }
}, 

hexToRgbA = function (hex){
    var c;

    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return {r:(c>>16)&255, g:(c>>8)&255, b:c&255, a:1};
    }
    throw new Error('Bad Hex');
},

paintAt = function (startX, startY) {

    var pixelPos = (startY * canvasWidth + startX) * 4,
        r = colorLayerData.data[pixelPos],
        g = colorLayerData.data[pixelPos + 1],
        b = colorLayerData.data[pixelPos + 2],
        a = colorLayerData.data[pixelPos + 3];

    console.log(curColor);

    if (r === curColor.r && g === curColor.g && b === curColor.b) {
        // Return because trying to fill with the same color
        console.log('stopped')
        return;
    }

    if (matchOutlineColor(r, g, b, a)) {
        console.log('stopped');
        // Return because clicked outline
        return;
    }

    floodFill(startX, startY, r, g, b);

    redraw();
},

bucket_click = function (mouseX, mouseY, file){
    outlineImage.src = file;
    colorLayerData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    outlineLayerData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    curColor = hexToRgbA(colorPicker.value)
    paintAt(mouseX, mouseY);
},

redraw = function () {

    var locX,
        locY;

    // Make sure required resources are loaded before redrawing
    if (curLoadResNum < totalLoadResources) {
        return;
    }

    clearCanvas();

    // Draw the current state of the color layer to the canvas
    context.putImageData(colorLayerData, 0, 0);

    // Draw the background
    // context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    // Draw the color swatches
    // locX = 52;
    // locY = 19;
    // drawColorSwatch(colorPurple, locX, locY);

    // locY += 46;
    // drawColorSwatch(colorGreen, locX, locY);

    // locY += 46;
    // drawColorSwatch(colorYellow, locX, locY);

    // locY += 46;
    // drawColorSwatch(colorBrown, locX, locY);

    // Draw the outline image on top of everything. We could move this to a separate 
    //   canvas so we did not have to redraw this everyime.
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
},

resourceLoaded = function () {

    curLoadResNum += 1;
    if (curLoadResNum === totalLoadResources) {
        createMouseEvents();
        redraw();
    }
}