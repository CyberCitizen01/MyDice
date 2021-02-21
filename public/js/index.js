let socket = io();

socket.on('connect',function(){
    console.log('You are connected to the server');
});

socket.on('disconnect',function(){
    console.log('You are disconnected to the server');
});