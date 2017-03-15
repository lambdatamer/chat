const path = require('path')
const express = require("express")
const app = express()

const webpack = require("webpack")
const webpackConfig = require("./webpack.config")
const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require("webpack-dev-middleware")


app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	lazy: false,
	watchOptions: {
		aggregateTimeout: 300,
		poll: true
	},
}))

app.use(express.static('static'))

const sendIndex = (req, res) => {
	res.sendFile(path.resolve(__dirname, 'static/index.html'))
}

app.get('/chat', sendIndex)
app.get('/login', sendIndex)

app.get('/')

const server = app.listen(3000, function () {
	console.log("Listening on port 3000!")
})

let clients = {}
let messages = []

const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
	//Connecting
	socket.on('signIn', (msg) => {
		let uid = msg.uid || undefined
		let nickname = msg.nickname || undefined

		//Check if user already connected
		if(uid !== undefined && uid in clients){
				clients[uid].connections.push(socket.id)
		}else{
			//Else check, is he already has a nickname and uid
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
			usersList: usersList,
			messages: messages
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
		let message = {
			name: nickname,
			text: msg,
			time: rawTime
		}
		messages.push(message)
		io.emit('messageReceived', message)
	})

	socket.on('nicknameChange', (msg) => {
		let nicknameTemp = msg.nickname
		
		nicknameTemp = nicknameTemp.length > 32 ? nicknameTemp.slice(0, 31) : nicknameTemp

		socket.nickname = clients[socket.uid].nickname = nicknameTemp
		
		socket.emit('nicknameChangeSuccess', {
			nickname: socket.nickname
		})
		
		socket.broadcast.emit('userChangedNickname', {
			nickname: socket.nickname,
			uid: socket.uid
		})
	})
})
