const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pathsMap = require("./config");

module.exports = {
    entry: {
        app: path.resolve(pathsMap.appPath, "index.ts"),
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: pathsMap.buildPath,
        publicPath: pathsMap.publicPath,
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(j|t)sx?$/,
                        include: [pathsMap.appPath, path.resolve(__dirname, "../../src")],
                        exclude: pathsMap.node_modules_path,
                        use: "babel-loader",
                    },
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.css$/,
                        use: ["style-loader", "css-loader"]// 将 Sass 编译成 CSS-》将 CSS 转化成 CommonJS 模块-》将 JS 字符串生成为 style 节点
                    },
                    {
                        test: /\.(svg|jpg|jpeg|bmp|png|webp|gif|ico|ttf)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024, // 小于这个大小的图片，会自动base64编码后插入到代码中
                            name: 'img/[name].[hash:8].[ext]',
                        }
                    },
                    {
                        loader: 'file-loader',
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise be processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    }
                ]
            }

        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
        alias: {
            '@': path.resolve(__dirname, '../src/'), // 以 @ 表示src目录
            '@public': path.resolve(__dirname, '../public/'), // 以 @ 表示src目录
            'TOYGL': path.resolve(__dirname, "../../src/index.ts")
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public', ignore: ['index.html', '3dtiles/**/*', 'kml/**/*'] },
        ]),
        new HtmlWebpackPlugin({
            template: pathsMap.indexHtmlPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: false,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new CleanWebpackPlugin(),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            'VERSION': new Date().toLocaleString()
        })
    ]
}