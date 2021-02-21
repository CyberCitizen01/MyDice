const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicpath = path.join(__dirname, '/../public');
const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection',function(socket){
    console.log('You are connected to the client');

    socket.on('disconnect',function(){
        console.log('You are disconnected to the client');
    })
})

server.listen(port, function(){
    console.log('The server has finally connected, on http://localhost:'+port);
});