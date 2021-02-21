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

var User1 = {
    Name: '',
    Num:0
};
var User2 = {
    Name: '',
    Num:0
};

var i = 0;

//console.log(WIN.Name == 'k' );
//console.log(WIN.Num);

io.on('connection',function(socket){
    console.log('You are connected to the client');
    socket.on('myNum', function(data){
        console.log(data);
        io.emit('yourNum',data);
        if(i==0){
            User1 = data;
            console.log('User1: ',User1);
            i++;
            io.emit('call',User1);
        }
        else{
            User2 = data;
            console.log('User2: ',User2);
            i--;
            var WIN = {
                Name: '',
                Num:0,
                User1: User1,
                User2: User2
            };
            WIN.Num = Math.max(User1.Num, User2.Num);
            if(WIN.Num == User1.Num && WIN.Num != User2.Num){
                WIN.Name = User1.Name;
            }
            else if(WIN.Num == User2.Num && WIN.Num != User1.Num){
                WIN.Name = User2.Name;
            }
            else{
                io.emit('re-evaluate');
            }
            io.emit('winner',WIN);
        }
    });

    socket.on('disconnect',function(){
        console.log('You are disconnected to the client');
    })
})

server.listen(port, function(){
    console.log('The server has finally connected, on http://localhost:'+port);
});