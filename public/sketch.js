var socket;

var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = .18;
var size;
var col = "blue";

var par;
var width;
var height;
var canvas;

// socket = io.connect('http://localhost:3000');
socket = io.connect('https://col-draw.herokuapp.com/');
socket.on('mouse', newDrawing);
// socket.on('color', colorChange);

//new drawing called when mouse var is changed
function newDrawing(data){ 
  stroke(data.col);
  strokeWeight(data.size);
  line(data.x, data.y, data.px, data.py);
}
// function colorChange(data){
//     col = 
// }
 



//basic setup
function setup() {
  smooth();
  par = document.getElementById("#cavas-container");
  size = 10;
  canvas = createCanvas(800, 500);
  canvas.id("game")
  canvas.parent("canvas-container")
  canvas.background(0);
}




// canvas drwing sketch code  |
//                           \ /

function mousePressed() {
  // Assign current mouse position to variables.
  x = mouseX;
  y = mouseY;
  px = mouseX;
  py = mouseY;
  // Prevent default functionality.
  return false;
}

function mouseDragged(){
  console.log("sending : " + mouseX + ',' + mouseY);
  var targetX = mouseX, targetY = mouseY;
  x += (targetX - x) * easing;
  y += (targetY - y) * easing;
  var data = {
    x: x,
    y: y,
    px: px,
    py: py,
    size: size,
    col: col
  }
  stroke(col);
  strokeWeight(size);
  line(x, y, px, py);
  // if (data.x >= 0 && data.x <= 800 && data.y >= 0 && data.y <= 500) {
  //   socket.emit('mouse', data);
  socket.emit('mouse', data);
  px = x;
  py = y;
  return false;
}

//                     / \
// canvas drawing code  |



function save_can() {
  saveCanvas(canvas, 'masterpiece', 'png');
}


function clearCanvas() {
  let x = {
   name: socket.id
  }
  console.log(x.name);
  socket.emit('clearCanvas', x);
}
socket.on('clearCanvas', clearIt);
function clearIt(data){
  console.log("ujjwal");
  canvas.clear();
  canvas.background(0);
  // showalert("Board cleared by "+ data.name,"danger")
  notification("Board cleared by " + data.name)
}


// socket.on('clearCanvas', (data) => {
//   canvas.clear();
//   canvas.background(0);
//   // showalert("Board cleared by "+ data.name,"danger")
//   notification("Board cleared by " + data.name)
// })



function notification(message) {
  console.log(message);
}
