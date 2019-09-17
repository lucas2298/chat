let express = require('express');
let socket = require('socket.io');
let bodyParser = require('body-parser');
let request = require('request-promise');

// App setup
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
let server = app.listen(process.env.PORT || 4000, function() {
});

// Static files
app.use(express.static('public'));

// async function
// Get answer from server
async function getResponse(req, res) {
    let options = {
        method: 'POST',
        uri: 'http://localhost:4001/postdata',
        body: req,
        json: true
    };
    let returndata = await request(options)
    return returndata;
}

// Socket setup
let io = socket(server);

io.on('connection', function(socket) {
    socket.on('chat', function(data){
        io.to(socket.id).emit('chat', data);
        // Testing
        getResponse(data.message)
        .then (function (parserdBody) {            
            io.to(socket.id).emit('chat', {
                message: parserdBody,
                isUser: false
            });
        });
        //
    });
});

// Test python server

app.get('/testing', async function(req, res) {
    let data = {
        data1: "ahihi"
    };
    let options = {
        method: 'POST',
        uri: 'http://localhost:4001/postdata',
        body: data,
        json: true
    };
    let returndata;
    let sendrequest = await request(options)
    .then(function (parserdBody){
        returndata = parserdBody;
    })
    .catch(function(err){
        console.log(err);
    });
    res.send(returndata);
});