/*
var path = require( 'path' );
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

*/

/* eslint-disable no-console */
var path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    TerserPlugin = require("terser-webpack-plugin");


var PROD = JSON.parse(process.env.PROD_ENV || '0'),
    plugins = [],
    copyPluginFiles = {
        patterns: [
            {
                from: './index.html',
                to: './index.html'
            },
            {
                from: './theme',
                to: './theme'
            },
            {
                from: './locales',
                to: './locales'
            },
            {
                from: './lib',
                to: './lib'
            }
        ]
    };

if (PROD) {
    console.log('\x1b[36m', '\n ☂', '\x1b[0m', 'PRODUCTION Built:');
}

plugins.push(new CopyWebpackPlugin(copyPluginFiles));
plugins.push(new HtmlWebpackPlugin(
    {
        inject: 'head',
        template: 'index.html'
    })
);

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: './src/ciOsk.js',
    mode: PROD === 1 ? 'production' : 'development',
    optimization:  PROD === 1  ? {
        nodeEnv: 'production',
        minimize: true,
        minimizer: [new TerserPlugin()] ,
        concatenateModules: false,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    } : {
        nodeEnv: 'production',
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'test')
                ]
            }]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: PROD === 1 ? 'ciOsk.min.[contenthash].js' : 'ciOsk.[contenthash].js'
    },
    resolve: {
        alias: {
            'main': path.resolve(__dirname, './src/main.js')
        },
        extensions: ['.js', '.json'],
        fallback: {
            fs: false,
            net: false,
            tls: false
        }
    },
    plugins: plugins
};