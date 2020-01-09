const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        app: [path.join(__dirname, '../client/index.js'), 'react-hot-loader/patch', 'webpack/hot/dev-server']
    },
    output: {
        filename: "static/[name].[hash:8].js",
        chunkFilename: 'static/js/[name].chunk.js',
        path: path.join(__dirname, '../dist'),
        publicPath: "/"
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
                oneOf: [
                    {
                        test: /\.css/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.scss/,
                        use: ['style-loader', 'css-loader', 'sass-loader']
                    },
                    {
                        test: [/.bmp$/, /.jpe?g$/, /.png$/, /.gif$/],
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/images/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        exclude: [ /\.(js|jsx)$/, /\.html$/, /\.json$/ ],
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]',
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html')
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV || 'development'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        inline: true,
        contentBase: path.join(__dirname, '../dist'),
        watchContentBase: true,
        historyApiFallback: true,
        hot: true,
        overlay: {
            errors: true,
        },
        stats: 'errors-only',
        compress: true,
    }
};