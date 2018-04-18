var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-Webpack-plugin');

// Webpack Config
var webpackConfig = {
    entry: {
        'main': './wwwroot/main.browser.ts'
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './wwwroot/dist')
    },

    plugins: [
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        path.resolve(__dirname, './src'),
        {
            // your Angular Async Route paths relative to this root directory
        }
      ),
       new CopyWebpackPlugin([
           { from: './node_modules/jquery/dist/jquery.js', to: './libs/js' },
           { from: './bower_components/bootstrap/dist/js/bootstrap.js', to: './libs/js' },
           { from: './node_modules/fancybox/dist/js/jquery.fancybox.pack.js', to: './libs/js' },
           { from: './bower_components/alertify.js/lib/alertify.min.js', to: './libs/js' },
           { from: './bower_components/bootstrap/dist/css/bootstrap.css', to: './libs/css' },
           { from: './node_modules/fancybox/dist/css/jquery.fancybox.css', to: './libs/css' },
           { from: './bower_components/components-font-awesome/css/font-awesome.css', to: './libs/css' },
           { from: './bower_components/alertify.js/themes/alertify.core.css', to: './libs/css' },
           { from: './bower_components/alertify.js/themes/alertify.bootstrap.css', to: './libs/css' },
           { from: './bower_components/alertify.js/themes/alertify.default.css', to: './libs/css' }
       ]),

        new HtmlWebpackPlugin({
            template: './wwwroot/index.html'
        })
    ],

    module: {
        loaders: [
          // .ts files for TypeScript
          {
              test: /\.ts$/,
              loaders: [
                'awesome-typescript-loader',
                'angular2-template-loader',
                'angular2-router-loader'
              ]
          },
          { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
          { test: /\.html$/, loader: 'raw-loader' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
