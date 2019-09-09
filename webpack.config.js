const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: "BasiqConnect",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /.*\/src\/.*\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.*\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          "html-loader"
        ]
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "url-loader"
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff2" }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff" }
      },
    ]
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};
