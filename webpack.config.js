var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss')

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, 'bundle'),
		filename: 'bundle.js',
		publicPath: '/bundle/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, 'src'),
			loaders: [
				'react-hot', 
				'babel'
			]
		},{
			test: /\.css$/,
			loaders: [
				'style-loader', 
				'css-loader',
				'postcss-loader'
			]
		},{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				{test: /\.jsx?$/, loaders: [ "babel-loader", "eslint-loader" ], exclude: /node_modules/}
				]
		}]
	},
	postcss: function () {
			return [autoprefixer, precss];
		}
};
