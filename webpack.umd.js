const webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin')
//TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: __dirname + '/module',
        filename: '[name].js',
        library: 'datetimepicker',
        libraryTarget: 'umd'
    },
    
    externals: [
        {
            react: 'react',
            'react-dom': 'react-dom',
            'prop-types': 'prop-types',
            'classnames': 'classnames',
            'react-intl': 'react-intl',
            '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome',
        },
        /bootstrap/,
    ],
    
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV !== 'production',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    limit: 20000
                }

            },
            {
                test: /\.ico$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 1
                }
            }
		]
	},
	resolve: {
		alias: {
			Config: `${__dirname}/config.json`
		},
		extensions: ['.jsx', '.js', '.styl']
	},
	plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
    ],
    
    
};
