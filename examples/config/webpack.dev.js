const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const config = require("./config");

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...baseConfig.plugins,
    ],
    devServer: {
        port: config.devServerPort,
        host: 'localhost',
        contentBase: path.join(__dirname, '../public'),
        watchContentBase: true,
        publicPath: '/',
        compress: true,
        historyApiFallback: true,
        hot: true,
        clientLogLevel: 'error',
        open: true,
        overlay: false,
        quiet: false,
        noInfo: false,
        watchOptions: {
            ignored: /node_modules/
        },
        proxy: {}
    }
}