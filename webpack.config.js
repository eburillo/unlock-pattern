module.exports = {
  context: __dirname + "/app",

  entry: {
      js: "./js/app.js",
      html: "./index.html"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
        {test: /\.json$/,
        loader: 'json-loader'}
    ]
  },
  devServer: { inline: true }
};
