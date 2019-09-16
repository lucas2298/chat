// Make connection

// Localhost
let socket = io.connect('http://localhost:4000');

// Live server
// let socket = io.connect('https://thanght.herokuapp.com');

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
    if (message.value.trim().length == 0) {
        message.value = "";
        return;
    }
    socket.emit('chat', {
        message: message.value,
    });
    message.value = "";
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p>' + data.message + '</p>';
});

$(function(){
    $('#message').on('keypress', function (event) { 
        if (event.which == 13 && $(this).val() != "") {
            console.log('ok');
        }
    });
});