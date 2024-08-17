// webpack.config.js

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const outputDir = "dist";

module.exports = {
  entry: './src/game.js', // Sovelluksen pääsisääntulotiedosto
  output: {
    filename: 'bundle.js', // Kääntämisen tuottama tiedosto
    path: path.resolve(__dirname, outputDir), // Kääntämisen tulostiedostojen hakemisto
    clean: true, // Tyhjennä 'dist'-hakemisto ennen uuden paketin luontia
  },
  mode: 'production', // Aseta kääntämisen tila kehitykseen
  module: {
    rules: [
      {
        test: /\.js$/, // Sovella JavaScript-tiedostoihin
        exclude: /node_modules/, // Älä käytä node_modules-kansioon
        use: {
          loader: 'babel-loader', // Käytä Babelia nykyaikaisten JavaScript-ominaisuuksien kääntämiseen
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true, // Aktivoi minimointi
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Poista console.log-kutsut
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Generoidun HTML-tiedoston nimi
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html lang="fi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Webpack App with Canvas</title>
            <style>
              html, body {  background-color: black; display: flex; justify-content: center; }
            </style>
        </head>
        <body>
            <div id="app">
                <canvas id="game" width="800" height="600"></canvas>
            </div>
            ${htmlWebpackPlugin.tags.bodyTags}
        </body>
        </html>
      `,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets"}
      ],
    }),
  ],
  devServer: {
    static: {
	directory: path.join(__dirname, 'dist'),
    },
    compress: true, // Ota käyttöön gzip-pakkaus
    port: 9000, // Portti, jota kehityspalvelin käyttää
    open: true, // Avaa selain automaattisesti, kun palvelin käynnistyy
    hot: true, // Ota käyttöön hot module replacement
  },
};

