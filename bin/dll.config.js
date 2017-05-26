const webpack = require('webpack');
const project = require('../project.config');
const debug = require('debug')('app:config:webpack');
const HappyPack = require('happypack');
const postcss = require('./postcss.config');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

/**
 * Place static libraries here
 */
const vendors = [
  'i18next',
  'isomorphic-fetch',
  'lodash',
  'mjml',
  'mjml-container',
  'mjml-core',
  'moment',
  'mustache',
  'rc-calendar',
  'rc-checkbox',
  'react',
  'react-autocomplete',
  'react-color',
  'react-cond',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-i18next',
  'react-icon-base',
  'react-numeric-input',
  'react-redux',
  'react-redux-form',
  'react-router',
  'react-router-redux',
  'recompose',
  'redux',
  'redux-api',
  'redux-thunk',
];

debug('Building vendors DLLs...');
const webpackConfig = {
  context: project.paths.base(),
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  entry: {
    vendor: vendors,
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    path: project.paths.dist(),
    publicPath: project.compiler_public_path,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=ctmCSS',
      },
      {
        test: /\.gcss$/,
        loader: 'happypack/loader?id=ctmCSS_GLOBAL',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ctmJS',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype',
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]',
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(project.globals),
    new HappyPack({
      cache: true,
      verbose: false,
      cacheContext: {
        env: process.env.NODE_ENV,
      },
      id: 'ctmJS',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        query: project.compiler_babel,
      }],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: project.paths.base(),
        postcss: postcss(),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HappyPack({
      cache: true,
      verbose: false,
      cacheContext: {
        env: process.env.NODE_ENV,
      },
      id: 'ctmCSS',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader',
        'css-loader?modules&camelCase&sourceMap&-minimize&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
      ],
    }),
    new HappyPack({
      cache: true,
      verbose: false,
      cacheContext: {
        env: process.env.NODE_ENV,
      },
      id: 'ctmCSS_GLOBAL',
      threadPool: HappyPack.ThreadPool({ size: 2 }),
      loaders: [
        'style-loader',
        'css-loader?camelCase&sourceMap&-minimize',
        'postcss-loader',
      ],
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: `${project.paths.dist()}/[name]-manifest.json`,
    }),
    new DuplicatePackageCheckerPlugin({
      verbose: true,
    }),
  ],
};

module.exports = webpackConfig;
