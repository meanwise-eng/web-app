const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const BASE_URL = {
    development: 'http://localhost:8000'
}

module.exports = {
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.tsx?$/,
            use: "source-map-loader",
            exclude: /node_modules/
        },{
            test: /\.tsx?$/,
            loader: ["ts-loader"],
            exclude: /node_modules/
        }],
    },
    devtool: 'inline-source-map',
}

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
            output: {
                comments: false,
            },
            sourceMap: false,
        })
    );
}
