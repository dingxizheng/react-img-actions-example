/*
 * @Author: mover
 * @Date:   2016-09-16 23:40:54
 * @Last Modified by:   mover
 * @Last Modified time: 2016-09-16 23:47:43
 */

'use strict';

module.exports = {
	entry: "./src/app.js",
	output: {
		path: __dirname,
		filename: "build/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel'
		}]
	}
};