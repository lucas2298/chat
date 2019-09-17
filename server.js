let express = require('express');
let socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(process.env.PORT || 4000, function() {
});

// Static files
app.use(express.static('public'));

// Socket setup
let io = socket(server);

io.on('connection', function(socket) {
    socket.on('chat', function(data){
        io.to(socket.id).emit('chat', data);
        io.to(socket.id).emit('chat', {
            message: data.message,
            isUser: false
        });
    });
});