const webpack = require('webpack');
const path = require('path');

const vendor = [
    'react',
    'react-dom',
    'react-routes-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'axios',
];

module.exports = {
    entry: {
        dll: vendor,
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].dll.js',
        library: '_dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: process.cwd(),
        }),
    ],
};