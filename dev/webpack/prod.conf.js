const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./base.conf');
const { plugins } = config;

module.exports = merge(config, {
    entry: {
        schema: `${ config.context }/main`,
        vendor: ['jsplumb']
    },
    plugins: plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false,
                drop_debugger: true
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'jsplumb.min.js')
    ])
});
