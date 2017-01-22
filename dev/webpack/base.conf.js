const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.join(__dirname, '..', '..');
const APP_PATH = `${ ROOT_PATH }/src`;

module.exports = {
    context: APP_PATH,
    output: {
        path: `${ ROOT_PATH }/build/`,
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize!sass'),
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            actions: `${ APP_PATH }/actions`,
            components: `${ APP_PATH }/components`,
            containers: `${ APP_PATH }/containers`,
            reducers: `${ APP_PATH }/reducers`
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${ ROOT_PATH }/index.html`
        }),
        new ExtractTextPlugin('[name].css')
    ]
};
