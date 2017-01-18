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

/*
 * Socket.io
 */

var io = require('socket.io').listen(3001)

var clients = {}

io.on('connection', function(socket){

	console.log('user connected')
	//Connecting
	socket.on('auth', function(msg) {
		var uid = msg.uid
		var nickname = msg.nickname

		if(uid != undefined && uid in clients){
				clients[uid].connections.push(socket.id)
		}else{
			if(uid == undefined){
				uid = 'u' + Math.floor(Math.random() * 1000000)
				while(clients[uid]){
					uid = 'u' + Math.floor(Math.random() * 1000000)
				}
			}

			if(!nickname){
				nickname = 'Anonimous user #' + uid.slice(1)
			}

			clients[uid] = {
				nickname: nickname,
				connections: []
			}

			clients[uid].connections.push(socket.id)

			var time = new Date
			var rawTime = time.getTime()

			socket.broadcast.emit('userConnected',{
				name: nickname
			})

			console.log('User connected: ' + clients[uid].nickname + ' at ' + time.toLocaleTimeString())
		}
		socket.emit('connected', {
			uid: uid,
			nickname: nickname
		})

		socket.uid = uid
		socket.nickname = nickname

		console.log(clients)
	})

	socket.on('disconnect', function(){
		var time = new Date
		var rawTime = time.getTime()
		var uid = socket.uid
		var nickname = socket.nickname

		if(clients[uid] && clients[uid].connections.length === 1){
			io.sockets.emit('userDisconnected', {
				name: clients[uid].nickname
			})
			console.log('User disconnected: ' + clients[uid].nickname + ' at ' + time.toLocaleTimeString())
			delete clients[uid]
		}else if (clients[uid]){
			clients[uid].connections = clients[uid].connections.splice((clients[uid].connections.indexOf(uid)), 1)
		}
		console.log(clients)
	})

	//Events
	socket.on('message', function (msg) {
		var nickname = socket.nickname
		var time = new Date
		var rawTime = time.getTime()
		io.emit('messageReceived', {
			name: nickname,
			text: msg,
			time: rawTime
		})
	})
})


console.log('Listening sockets at :3001')
