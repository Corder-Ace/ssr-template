const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const firstPlugin = require('./test');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: "[name].[hash:8].js",
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
                oneOf: [
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
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [autoprefixer({ browsers: 'last 4 versions' })],
                                    sourceMap: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        require('postcss-preset-env')(autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 2 versions',
                                                'Firefox ESR',
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }))],
                                },
                            },
                            'sass-loader',
                        ],
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
            inject: true,
            template: path.join(__dirname, '../public/index.html'),
            favicon: path.join(__dirname, '../public/favicon.ico'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV || 'production',
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, '../public/favicon.ico'), to: path.join(__dirname, '../dist') },
        ]),
        new firstPlugin()
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname),
        //     exclude: ['dll'],
        // }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../manifest.json'),
        // }),
    ],
};