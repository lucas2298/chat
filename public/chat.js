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
        isUser: true,
        isSelectList: false,
        id: 0
    });
    message.value = "";
});

// Function

function chat_scrolldown() {
    $('#chat_log').animate({ scrollTop: $('#chat_log')[0].scrollHeight }, 500);
}

function chat_add_html(html) {
    $('#chat_log').append(html);
    chat_scrolldown();
}

// Listen for events
socket.on('chat', function(data){
    let message = data.message,
        class_suffix = data.isUser ? '_user' : "";
    if (data.isSelectList) {
        class_suffix = '_selectList';
        let html = '\
            <div class="chat_line">\
                <div>\
                    <button class="chat_bubble'+class_suffix+'" id='+class_suffix+data.id+'>'+message+'</button>\
                </div>\
            </div>\
        ';
        chat_add_html(html)
    }
    else {
        let html = '\
        <div class="chat_line">\
            <div class="chat_bubble'+class_suffix+'">\
                <div class="chat_triangle'+class_suffix+'"></div>\
                '+message+'\
            </div>\
        </div>\
        ';
        chat_add_html(html);
    }
});


// Jquery
$(function(){
    $('#message').on('keypress', function (event) { 
        if (event.which == 13 && $(this).val() != "") {
            socket.emit('chat', {
                message: $(this).val(),
                isUser: true,
                isSelectList: false,
                id: 0
            });
            $(this).val("");
        }
    });
});