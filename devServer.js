var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var wpds = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	proxy: {
		'/socket.io.js': {
			target: 'http://localhost:3001/socket.io/socket.io.js',
			secure: false
		},
		'/socket.io/**': {
			target: 'http://localhost:3001/socket.io/',
			secure: false
		}
	}
})
.listen(3000, 'localhost', function (err, result) {
	if (err) {
		return console.log(err)
	}

	console.log('Listening at http://localhost:3000/')
})


var io = require('socket.io').listen(3001)

console.log('Listening sockets at :3001')

io.sockets.on('connection', function(socket){
	//Connecting
	var id = (socket.id).toString().substr(0, 5)
	var time = new Date
	var rawTime = time.getTime()
	console.log('User connected: ' + id + ' at ' + time.toLocaleTimeString())
	socket.json.send({
		'event': 'connected',
		'name': id,
		'time': rawTime
	})
	socket.broadcast.json.send({
		'event': 'userConnected',
		'name': id,
		'time': rawTime
	})

	// socket.json.send({
	// 		event: 'message',
	// 		name: 'Server',
	// 		text: 'Hello, ' + id,
	// 		time: rawTime,
	// 	})

	//Events
	socket.on('message', function (msg) {
		var time = new Date
		var rawTime = time.getTime()
		socket.broadcast.json.send({
			event: 'messageReceived',
			name: id,
			text: msg,
			time: rawTime
		})
		socket.json.send({
			event: 'messageSent',
			name: id,
			text: msg,
			time: rawTime,
		})
	})

	socket.on('disconnect', function(){
		var time = new Date
		var rawTime = time.getTime()
		io.sockets.json.send({
			'event': 'userDisconnected', 
			'name': id, 
			'time': rawTime
		});
		console.log('User disconnected: ' + id + ' at ' + time.toLocaleTimeString())
	})

})
