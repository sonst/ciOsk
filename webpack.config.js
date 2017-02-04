var path = require( 'path' );
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var PROD = JSON.parse(process.env.PROD_ENV || '0');
var REFRESH = JSON.parse(process.env.REFRESH_ENV || '0');

var plugins = [];
var copyPluginFiles = [];



if(REFRESH){
  copyPluginFiles = [
    { from: './theme/ciOsk/css' , to:'./theme/ciOsk/css'},
    { from: './locales' , to:'./locales'}
  ]
} else {
  copyPluginFiles = [
    { from: './index.html'},
    { from: './theme' , to:'./theme'},
    { from: './locales' , to:'./locales'},
    { from: './lib' , to:'./lib'}
  ]
}

plugins.push(
  new webpack.ProvidePlugin({
    'jQuery': 'jquery',
    '$': 'jquery',
    'global.jQuery': 'jquery'
  })
);

plugins.push( new CopyWebpackPlugin(copyPluginFiles) );

if (PROD){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: true
    }
  }));
}

module.exports = {
  context: path.resolve(__dirname, './'),
  extensions: [ '', '.js' ],
  entry:  './src/ciOsk.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: PROD=='1' ? 'ciOsk.min.js' : 'ciOsk.js'
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'jquery-ui' : 'jquery-ui-dist/jquery-ui.js'
    },
    extensions: ['', '.js']
  },

  plugins: plugins
}
