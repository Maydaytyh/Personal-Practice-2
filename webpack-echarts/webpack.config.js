var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
	entry:{
		app: [
		'webpack-dev-server/client?https://localhost:3000',
		'./app/index.js']
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js'
	},
	module:{
		rules:[
			{
				test:/\.less$/,
				loaders: ['style-loader','css-loader','less-loader'],
				include: path.resolve(__dirname,'app')
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'hello'
		})
	]
};
module.exports = config;