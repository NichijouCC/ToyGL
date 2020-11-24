const config = require("./config");
const ora = require('ora');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");

const beProduction = process.env.NODE_ENV == "production";
const webpackConfig = beProduction ? require('./webpack.prod') : require('./webpack.dev');

(async () => {
    const file_prefix = process.argv[2];
    if (file_prefix != null) {
        webpackConfig.entry.app = await findeExampleFile();
    }
    if (!beProduction) {
        const compiler = webpack(webpackConfig);
        const devServerOptions = Object.assign({}, webpackConfig.devServer, {
            // open: true,
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
        });
        const server = new WebpackDevServer(compiler, devServerOptions);
        server.listen(devServerOptions.port, '127.0.0.1', () => {
            console.log(`Starting server on http://localhost:${devServerOptions.port}`);
        });
    } else {
        const spinner = ora('webpack编译开始...\n').start();
        webpack(webpackConfig, function (err, stats) {
            if (err) {
                spinner.fail('编译失败');
                console.log(err);
                return;
            } else {
                spinner.succeed('编译结束!\n');
                let statsLogs = stats.toString(
                    {
                        ...webpackConfig.stats,
                        colors: true
                    });
                process.stdout.write(statsLogs + '\n\n');
            }
        });
    }
})()




/**
 * 根据输入参数找到对应样例文件路径
 */
function findeExampleFile() {
    const file_prefix = process.argv[2];
    const path = require("path");
    const fs = require("fs");
    const exec = require('child_process').exec;
    let src_dir = path.resolve("./src");

    return new Promise((resolve) => {
        fs.readdir(src_dir, (err, items) => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].startsWith(file_prefix)) {
                    console.warn(`@@------------执行：${items[i]}-----------------------`);
                    resolve(path.resolve(src_dir, items[i]))
                    break;
                }
            }
        });
    })
}
