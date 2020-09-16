const merge = require('webpack-merge'),
    webpack = require('webpack'),
    common = require('./webpack.common.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
    
module.exports = merge(common, {
    entry: ['./src/umd.jsx'],
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        port: 999,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/www/index.html`,
            filename: "index.html",
            inject: "body"
        }),
    ],
})
