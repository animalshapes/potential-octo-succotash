var canvas,ctx,mouseX=9999,mouseY=9999,distX,distY,circle;

var cursor_grab ="url(data:application/cur;base64,AAACAAEAICACAAcABQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA%2FAAAAfwAAAP%2BAAAH%2FgAAB%2F8AAA%2F%2FAAAd%2FwAAGf%2BAAAH9gAADbYAAA2yAAAZsAAAGbAAAAGAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FgH%2F%2F%2F4B%2F%2F%2F8Af%2F%2F%2BAD%2F%2F%2FAA%2F%2F%2FwAH%2F%2F4AB%2F%2F8AAf%2F%2FAAD%2F%2F5AA%2F%2F%2FgAP%2F%2F4AD%2F%2F8AF%2F%2F%2FAB%2F%2F%2F5A%2F%2F%2F%2F5%2F%2F%2F8%3D), move";
var cursor_drag ="url(data:application/cur;base64,AAACAAEAICACAAcABQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA%2FAAAAfwAAAP%2BAAAH%2FgAAB%2F8AAAH%2FAAAB%2FwAAA%2F0AAANsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FgH%2F%2F%2F4B%2F%2F%2F8Af%2F%2F%2BAD%2F%2F%2FAA%2F%2F%2FwAH%2F%2F%2BAB%2F%2F%2FwAf%2F%2F4AH%2F%2F%2BAD%2F%2F%2FyT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8%3D), move";

function init(){
    canvas = document.getElementById('dnd');
    ctx = canvas.getContext('2d');
    
    circle = {
        x: canvas.width/2,
        y: canvas.height/2,
        r: 50,
        mouse: false,
        drag: false
    }
    
    canvas.addEventListener('mousemove',updateCanvas,false);
    canvas.addEventListener('mousedown',startDrag,false);
    canvas.addEventListener('mouseup',stopDrag,false);
    
    canvas.addEventListener('selectstart',function(e){e.preventDefault();},false);	
    canvas.style.MozUserSelect = "none";
        
        
    drawCanvas();	
    
}

function findOffset(obj) {
    var curX = curY = 0;
    if (obj.offsetParent) {
        do {
            curX += obj.offsetLeft;
            curY += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return {x:curX,y:curY};
    }
}

function updateCanvas(e){
    
    var pos = findOffset(canvas);
    
    mouseX = e.pageX - pos.x;
    mouseY = e.pageY - pos.y;
    
    if(circle.mouse && !circle.drag){
        canvas.style.cursor = cursor_grab;
    } else if(circle.drag) {
        canvas.style.cursor = cursor_drag;
    } else {
        canvas.style.cursor = 'auto';
    }
    
    if(circle.drag){
        circle.x = mouseX - distX;
        circle.y = mouseY - distY;
    }
    
    drawCanvas();
}

function startDrag(){
    if(circle.mouse == true){
        circle.drag = true;
        distX = mouseX - circle.x;
        distY = mouseY - circle.y;
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor="rgba(0,0,0,.3)";
        ctx.shadowBlur = 5;
        drawCanvas();
    }
}

function stopDrag(){
    if(circle.drag == true){
        circle.drag = false;
        ctx.restore();
        drawCanvas();
    }
}

function drawCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2,false);
    ctx.isPointInPath(mouseX,mouseY) ? circle.mouse = true : circle.mouse = false;
    ctx.fill();

}