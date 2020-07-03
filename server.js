var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("my server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){

    console.log('new connection' + socket.id);
    socket.on('mouse', mouseMessage);

    function mouseMessage(data){
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}