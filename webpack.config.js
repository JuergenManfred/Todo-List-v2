const path = require('path');

module.exports = {
  entry: './src/index.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map', // Add source maps for easier debugging
  mode: 'development', // Set mode to development
};
