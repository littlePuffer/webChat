var app = require('express')();
var http = require('http').Server(app);
var io=require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});


/**
	自定义的事件:
		chat:在聊天室里的聊天
		send:服务端发给客户端
		get: 客户端发给服务端(服务端获取)
*/

io.on('connection', function(socket){

	//io.emit('事件名',msg)给全部连接发送消息
	//socket.emit('事件名',msg)给该连接发送消息

	socket.on('chat', function(msg){
		console.log('chat: ' + msg);
		// 
		io.emit('send', msg);
	});
	socket.on('send', function(msg){
		console.log('new message ############: ' + msg);
		socket.emit('send','the message is'+msg);
	});
	socket.on('get', function(msg){
		console.log('new message ############: ' + msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});
