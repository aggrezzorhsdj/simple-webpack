const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = (env, options) => {
    return {
        entry: __dirname + '/index.js',
        mode: options.mode,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "js/main.js"
        },
        optimization: {
            minimize: options.mode === 'production',
            minimizer: [
                new OptimizeCssAssetsPlugin(),
                new TerserPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: ["/node_modules/"],
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["env"],
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'less-loader',
                    ]
                },
            ],
        },
        devtool: options.mode === 'production' ? 'cheap-source-map' : 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProvidePlugin({
                $: 'jQuery',
                jQuery: 'jQuery',
                'window.jQuery': 'jQuery'
            }),
            new MiniCssExtractPlugin({
                path: __dirname + '/css',
                filename: '/css/style.css'
            }),
        ]
    }
}