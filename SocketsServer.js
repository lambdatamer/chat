io.sockets.on('connection', function(socket){
	//Connecting
	var id = (socket.id).toString().substr(0, 5)
	var time = (new Date).toLocaleTimeString()
	socket.json.send({
		'event': 'connected',
		'name': id,
		'time': time
	})
	socket.broadcast.json.send({
		'event': 'userConnected',
		'name': id,
		'time': time
	})
	//Events
	socket.on('message', function (msg) {
		var time = (new Date).toLocaleTimeString()
		socket.broadcast.json.send({
			event: 'messageReceived',
			name: 'id',
			text: msg,
			time: time
		})
		socket.json.send({
			event: 'messageSent',
			name: id,
			text: msg,
			time: time,
		})
	})

	socket.on('disconnect', function(){
		var time = (new Date).toLocaleTimeString
		io.sockets.json.send({
			'event': 'userDisconnected', 
			'name': id, 
			'time': time
		});
	})

})
