const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base');

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: "source-map",
    stats: {
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        builtAt: false,
        entrypoints: false,
        assets: false,
        version: false,
        errorDetails: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...baseConfig.plugins,
    ],
    devServer: {
        port: 8383,
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