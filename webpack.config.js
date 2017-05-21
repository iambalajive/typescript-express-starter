const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');


module.exports = {
    entry: {
        app: './src/init.ts'
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        rules: [

            {
                test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/,
            }
        ]
    }
}