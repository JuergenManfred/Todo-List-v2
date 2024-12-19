const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point for your JavaScript
  output: {
    filename: "bundle.js", // Name of the bundled file
    path: path.resolve(__dirname, "dist"), // Output directory for production
    clean: true, // Clean the output folder during build
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Match CSS files
        use: ["style-loader", "css-loader"], // Use style and CSS loaders
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Source HTML file
    }),
  ],
  devtool: "source-map", // Add source maps for easier debugging
  mode: "development", // Set mode to development
  devServer: {
    static: {
      directory: path.resolve(__dirname, "src"), // Serve files from the src folder
    },
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement (HMR)
    port: 8080, // Default port
  },
};
