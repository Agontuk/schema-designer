const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./base.conf');
const port = 3000;
const { plugins } = config;

module.exports = merge(config, {
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${ port }`,
        'webpack/hot/only-dev-server',
        `${ config.context }/main`
    ],
    plugins: plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]),
    devtool: 'eval',
    devServer: {
        port: port
    }
});
