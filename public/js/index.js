let socket = io();

var meUser;

socket.on('connect',function(){
    console.log('You are connected to the server');
    document.querySelector('#GO-btn').addEventListener('click', function(event){
        event.preventDefault();
        console.log('Submit is cancelled');
        meUser = document.getElementById("input").value;
        socket.emit('myNum', {
            Name: meUser,
            Num: Math.floor((Math.random() * 6) + 1)
        });
    })
});

socket.on('disconnect',function(){
    console.log('You are disconnected to the server');
});

socket.on('yourNum',function(data){
    console.log(data);
});

socket.on('call',function(data){
    console.log('Start play');
    document.getElementById('result').innerHTML = data.Name+' has started the game!';
});

socket.on('re-evaluate',function(){
    socket.emit('myNum', {
        Name: meUser,
        Num: Math.floor((Math.random() * 6) + 1)
    });
})

socket.on('winner',function(data){
    console.log('The winner is '+data.Name+' as he got '+data.Num);
    document.getElementById('result').innerHTML =  data.User1.Name+' got '+data.User1.Num+' and '+data.User2.Name+' got '+data.User2.Num+' and '+'The winner is '+data.Name+' as he got '+data.Num;
});