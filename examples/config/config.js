const path = require('path');

module.exports = {
    buildPath: path.resolve(__dirname, '../build'),
    publicPath: "/",
    appPath: path.resolve(__dirname, '../src'),
    node_modules_path: path.resolve(__dirname, "../node_modules"),
    indexHtmlPath: path.resolve(__dirname, "../public/index.html"),
    devServerPort: 8383

}