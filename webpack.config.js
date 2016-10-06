module.exports = {

  entry:  './src/EnviPass.js',
  output: {
    path: './dist',
    filename: 'enviPass.dist.js'
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
}
