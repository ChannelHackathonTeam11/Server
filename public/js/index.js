'use strict';

var socket = io();

socket.on('connect', () => {
    var name = prompt('대화명을 입력해주세요.', '');
    socket.emit('newUserConnect', name);
});

socket.on('updateMessage', (data) => {
    var infoEl= document.getElementById('info');
    infoEl.innerHTML = data.message;
});

socket.on('disconnect', function(){
    var message = socket.name + '님이 퇴장했습니다';

    // io.socket은 나를 포함한 전체 소켓, io.broadcast는 나를 제외한 전체
    socket.broadcast.emit('updateMessage', {
        name : 'SERVER',
        message : message
    });
});