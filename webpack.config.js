const path = require('path');
const entry = require('webpack-glob-entry');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: entry('./scripts/src/*.js'),
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/scripts/public',
		publicPath: '/scripts',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: false,
						hotReload: true
					}
				}
			}
		]
	},
	mode,
	// plugins: [],
	devtool: prod ? false : 'source-map'
};
