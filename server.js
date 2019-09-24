let express = require('express');
let socket = require('socket.io');
// let bodyParser = require('body-parser');
// let request = require('request-promise');
let spawn = require('child_process').spawn;

// App setup
let app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
let server = app.listen(process.env.PORT || 4000, function() {
});

// Static files
app.use(express.static('public'));

// async function
// Get answer from server

// Socket setup
let io = socket(server);

/*async function getResponse(req, res) {
    let options = {
        method: 'POST',
        // local
        uri: 'http://localhost:4001/postdata',
        // live
        // uri: 
        body: req,
        json: true
    };
    let returndata = await request(options)
    return returndata;
}*/

io.on('connection', function(socket) {
    socket.on('chat', function(data){
        io.to(socket.id).emit('chat', data);
        // Get answer from python
        // getResponse(data.message)
        // .then (function (parserdBody) {            
        //     io.to(socket.id).emit('chat', {
        //         message: parserdBody,
        //         isUser: false
        //     });
        // });

        // Using child_process
        let process = spawn('py', ["-u", "./main.py", "--foo", data.message]);
        // let process = spawn('py', ["-u", "./test.py", "--foo", data.message]);
        process.stdout.on('data', (data) => {
            io.to(socket.id).emit('chat', {
                message: `${data}`,
                isUser: false
            });
        });
        process.stderr.on('data', (data) => {
            // console.log(`error:${data}`);
        });
        process.stderr.on('close', () => {
            // console.log("Closed");
        });
    });
});
