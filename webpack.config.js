require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, process.env.DESTINATION_FOLDER),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: [
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000, // if less than 10 kb, add base64 encoded image to css
                            name: "assets/images/[hash].[ext]" // if more than 10 kb move to this folder in build using file-loader
                        },
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        overlay: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: require('html-webpack-template'),
            inject: false,
            title: process.env.APP_TITLE,
            appMountId: 'app',
        }),

        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css'
        }),
    ],
};

module.exports = (env, options) => {
    let production = options.mode === "production";
    config.devtool = production ? false : "eval-sourcemap";

    if (production)
        config.plugins = [
            ...config.plugins,
            new CopyWebpackPlugin([{ from: "./src/assets", to: "./assets" }])
        ];
    return config;
};