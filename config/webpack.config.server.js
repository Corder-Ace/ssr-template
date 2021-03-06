const path = require('path');

module.exports = {
    mode: "production",
    target: "node",
    entry: path.join(__dirname, '../client/server.js'),
    output: {
        filename: "static/server.js",
        chunkFilename: 'static/js/[name].chunk.js',
        path: path.join(__dirname, '../dist'),
        publicPath: "/",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     enforce: 'pre',
            //     loader: 'eslint-loader',
            // },
            {
                test: /\.(js|jsx)/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options:{
                    cacheDirectory: true, // 缓存目录 babel-loader特性
                    cacheCompression: false // 不缓存gzip
                }
            },
            {
                test: /\.css?$/,
                use: ['isomorphic-style-loader', {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                }]
            }
        ]
    }
};