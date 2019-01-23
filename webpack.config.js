var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    //the starting file
    entry: ['@babel/polyfill', './app/index.js'],
    //where we want the final file to be injected:
    //create new folder named dist, inside of which put a file named index_bundle
    output: {
        //__dirname = create dist folder here (into the current one- the root folder)!
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
    ]
};