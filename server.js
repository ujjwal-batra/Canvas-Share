var express = require('express');

var app = express();
// var server = app.listen(3000);

var server = app.listen(process.env.PORT || 3000, listen);

app.use(express.static('public'));

console.log("my server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){

    console.log('new connection' + socket.id);

    //on getting mouse var emits the data
    socket.on('mouse', mouseMessage);
    function mouseMessage(data){
        socket.broadcast.emit('mouse', data);
    }

    socket.on('clearCanvas', clearCan);
    function clearCan(data){
        socket.broadcast.emit('clearCanvas', data);
    }
}
