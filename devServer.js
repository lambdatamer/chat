let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config')

let wpds = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	proxy: {
		'/socket.io/**': {
			target: 'http://localhost:3001/socket.io/',
			secure: false
		}
	}
})
.listen(3000, 'localhost', (err, result) => {
	if (err) {
		return console.log(err)
	}

	console.log('Listening at http://localhost:3000/')
})

/*
 * Socket.io
 */

let io = require('socket.io').listen(3001)

let clients = {}

io.on('connection', (socket) => {

	//Connecting
	socket.on('auth', (msg) => {
		let uid = msg.uid || undefined
		let nickname = msg.nickname || undefined

		//Check if user already connected
		if(uid !== undefined && uid in clients){
				clients[uid].connections.push(socket.id)
		}else{
			//Else check, is he already has nickname and uid
			//And generate them if needed
			if(uid === undefined){
				do{
					uid = 'u' + Math.floor(Math.random() * 10000000)
					while(uid.length < 8){
						uid += '0'
					}
				}while(clients[uid])
			}

			if(nickname === undefined){
				nickname = `Anonimous user #${uid.slice(1)}`
			}

			clients[uid] = {
				nickname: nickname,
				connections: [socket.id]
			}


			socket.broadcast.emit('userConnected',{
				nickname: clients[uid].nickname,
				uid: uid
			})

			let time = new Date()
			console.log(`User connected: ${clients[uid].nickname} at ${time.toLocaleTimeString()}`)
		}

		socket.uid = uid
		socket.nickname = clients[uid].nickname

		let allUids = Object.keys(clients)
		let usersList = []

		allUids.forEach((uid) => {
			if(uid !== socket.uid)
			usersList.push({
				uid: uid,
				nickname: clients[uid].nickname
			})
		})


		socket.emit('connected', {
			uid: socket.uid,
			nickname: socket.nickname,
			usersList: usersList
		})

		console.log("\nNow connected:")
		console.log(clients)
	})

	socket.on('disconnect', () => {
		let time = new Date()
		let rawTime = time.getTime()
		let uid = socket.uid
		let nickname = socket.nickname

		if(clients[uid] && clients[uid].connections.length === 1){
			io.sockets.emit('userDisconnected', {
				nickname: nickname,
				uid: uid
			})
			console.log(`User disconnected: ${clients[uid].nickname} at ${time.toLocaleTimeString()}`)
			delete clients[uid]
		}else if (clients[uid]){
			clients[uid].connections = clients[uid].connections.splice((clients[uid].connections.indexOf(uid)), 1)
		}
		console.log(clients)
	})

	//Events
	socket.on('message', (msg) => {
		let nickname = socket.nickname
		let time = new Date()
		let rawTime = time.getTime()
		io.emit('messageReceived', {
			name: nickname,
			text: msg,
			time: rawTime
		})
	})

	socket.on('nicknameChange', (msg) => {
		let nicknameTemp = msg.nickname
		
		nicknameTemp = nicknameTemp.length > 32 ? nicknameTemp.slice(0, 31) : nicknameTemp

		socket.nickname = clients[uid].nickname = msg.nickname
		
		socket.emit('nicknameChangeSuccess', {
			nickname: socket.nickname
		})
	})
})


console.log('Listening sockets at :3001')
