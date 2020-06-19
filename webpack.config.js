'use strict';

const path = require('path');
const base = path.resolve(path.dirname(__dirname));
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AssetsManifest = require('webpack-assets-manifest');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
function _path(p) {
    return path.join(__dirname, p);
}
module.exports = (env, options) => {
    return {
        entry: __dirname + '/index.js',
        output: {
            path: __dirname + '/dist',
            publicPath: 'sites/s1/frontend/dist/',
            chunkFilename: options.mode === 'production'
                ? 'js/[name].[contenthash:8].min.js'
                : 'js/[name].[contenthash:8].js',
            filename: options.mode === 'production'
                ? 'js/[name].[contenthash:8].min.js'
                : 'js/[name].[contenthash:8].js'
        },
        optimization: {
            minimize: options.mode === 'production',
            minimizer: [
                new TerserJSPlugin({
                    terserOptions: {
                        compress: {
                            unsafe: true,
                            inline: true,
                            passes: 2,
                            keep_fargs: false,
                        },
                        output: {
                            beautify: false,
                        },
                        mangle: true,
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: ['default', {
                            "safe": true,
                            "map": { "inline": false },
                        }],
                    },
                })
            ],
            splitChunks: {
                chunks: options.mode === 'production'
                    ? 'all'
                    : 'async',
                maxInitialRequests: Infinity,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        reuseExistingChunk: true,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return packageName.replace('@', '');
                        },
                    },
                },
            },
        },
        devtool: options.mode !== 'production' ? 'inline-source-map' : '',
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: options.mode !== 'production',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
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
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }, {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["@babel/preset-env",
                                {
                                    "loose": true,
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: (url, resourcePath) => {
                        return /fonts/.test(resourcePath)
                            ? `fonts/${url}`
                            : `images/${url}`
                    },
                    name: options.mode === 'production'
                        ? '[name].[contenthash:8].[ext]'
                        : '[name].[contenthash:8].[ext]',
                },
            }]
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: false,
                cleanStaleWebpackAssets: true,
                dry: options.mode !== 'production',
            }),
            new AssetsManifest({
                output: __dirname + '/dist/manifest.json',
                filter: ({name}) => !name.endsWith('.map'),
                publicPath: true,
            }),
            new MiniCssExtractPlugin({
                path: __dirname + '/dist/css/',
                publicPath:'sites/s1/frontend/dist/css/',
                chunkFilename: options.mode === 'production'
                    ? 'css/[name].[contenthash:8].min.css'
                    : 'css/[name].[contenthash:8].css',
                filename: options.mode === 'production'
                    ? 'css/[name].[contenthash:8].min.css'
                    : 'css/[name].[contenthash:8].css',
            }),
            new CopyWebpackPlugin([{
                from: 'images/**/**',
                to: path.resolve(__dirname, 'dist'),
            }]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif)$/i,
                pngquant: '65-70',
                disable: options.mode !== 'production',
                plugins: [imageminMozjpeg({quality: 50})]
            }),
        ],
        externals: {
            jQuery: 'jQuery',
            $: 'jQuery',
            Swiper: 'Swiper'
        },
        resolve: {
            alias: {
                'inputmask.dependencyLib': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
                'inputmask' : _path('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
                'jquery.inputmask': _path('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
                'inputmask.phone.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.phone.extensions'),
                'inputmask.phone-codes-ru': _path('node_modules/jquery.inputmask/extra/phone-codes/phone-ru'),
            },
        },
    }
};