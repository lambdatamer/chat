const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const precss = require('precss')

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index.jsx'
	],
	output: {
		path: 			path.join(__dirname, 'bundle'),
		filename: 	'bundle.js',
		publicPath: '/bundle/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),	
		// new webpack.optimize.CommonsChunkPlugin({
		// 	children: true,
		// 	async: 		true,
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		// 	beautify: false,
		// 	comments: false,
		// 	compress: {
		// 		sequences : 	true,
		// 		booleans : 		true,
		// 		loops : 			true,
		// 		unused : 			true,
		// 		warnings : 		false,
		// 		drop_console: true,
		// 		unsafe : 			true
		// 	}
		// }),
		// new webpack.optimize.OccurrenceOrderPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.jsx$/,
				include: path.join(__dirname, 'src'),
				use: [
					{loader: 'react-hot-loader'},
					{
						loader: 'babel-loader',
						options: {
							"presets": [
								"es2015",
								"stage-0",
								"react"
							]
						}
					},
					{loader:"eslint-loader"}
				]
			},{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function (){
								return [
									require('precss'),
									require('autoprefixer')
								]
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devtool: 'source-map'
}