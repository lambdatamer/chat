const path = require('path')
const express = require("express")
const socketServer = require('./socketServer')
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


const server = app.listen(3000, function () {
	console.log("Listening on port 3000!")
})

socketServer(server)