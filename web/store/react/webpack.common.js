const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist/public'),
		publicPath: '/static',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						"presets": [
							["@babel/preset-env", {
								"targets": {
									"browsers": [
										">0.25%",
										"not ie 11",
										"not op_mini all"
									]
								},
								"useBuiltIns": "usage",
								"corejs": 3,
							}],

							"@babel/preset-react"
						]
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css', '.scss']
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello Webpack bundled JavaScript Project',
			template: './src/index.html'
		})
	]
};

const serverConfig = {
	entry: './src/server.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js'
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						"presets": [
							"@babel/preset-react"
						]
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css', '.scss']
	},
	plugins: []
};

module.exports = {
	clientConfig,
	serverConfig
};
