const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            publicPath: './',
            name: '[name].[ext]'
        },
     },
     {
      test: /\.(glb|gltf)$/,
      use:
      [
          {
              loader: 'file-loader',
              options:
              {
                  outputPath: 'assets/models/'
              }
          }
      ]
  },
    ],
  },
};