const argv = require('yargs').argv;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const project = require('../project.config');
const debug = require('debug')('app:config:webpack');
const HappyPack = require('happypack');
const postcss = require('./postcss.config');

const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;
const __DLL__ = Boolean(process.env.DLL);
const APP_ENTRY = project.paths.src('application.jsx');

debug(`Creating configuration. Startup location ${APP_ENTRY}`);
debug(`Using DLL? ${__DLL__ && __DEV__ ? 'Yes' : 'No'}`);
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: __PROD__ ? 'source-map' : 'cheap-module-eval-source-map',
  performance: { hints: false },
  entry: {
    main: __DEV__
      ? [APP_ENTRY, 'react-hot-loader/patch'].concat(`webpack-hot-middleware/client?reload=true&path=${project.compiler_public_path}__webpack_hmr`)
      : [APP_ENTRY],
  },
  output: {
    filename: `[name].[${project.compiler_hash_type}].js`,
    path: project.paths.dist(),
    publicPath: project.compiler_public_path,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    chunkFilename: '[id].[hash].js',
  },
  resolve: {
    modules: [project.paths.src(), 'node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  module: {
    rules: [
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
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          header: false,
          skipEmptyLines: true,
        },
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
    new HtmlWebpackPlugin({
      template: project.paths.src('index.html'),
      hash: false,
      favicon: project.paths.public('favicon.png'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HappyPack({
      cache: __DEV__,
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
      minimize: __PROD__,
      debug: __DEV__,
      options: {
        context: project.paths.base(),
        postcss: postcss(),
      },
    }),
  ],
  context: project.paths.base()
};

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__ && __DLL__) {
  debug('Enabling DEVELOPMENT DLL loading...');
  webpackConfig.plugins.push(
    new webpack.DllReferencePlugin({
      context: project.paths.base(),
      manifest: require(project.paths.vendor()),
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve(project.paths.dist('vendor.dll.js')),
      includeSourcemap: false,
    })
  );
}

if (__DEV__) {
  debug('Enabling DEVELOPMENT plugins and rules...');
  webpackConfig.output.pathinfo = true;
  webpackConfig.plugins.push(
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
    new webpack.HotModuleReplacementPlugin(),
    new DuplicatePackageCheckerPlugin({
      verbose: true,
    })
  );

  webpackConfig.module.rules.push(
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
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
        failOnError: false,
        failOnWarning: false,
      },
    }
  );
} else if (__PROD__) {
  debug('Enabling PDODUCTION plugins (OccurenceOrder & UglifyJS).');
  webpackConfig.module.rules.push(
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?modules&camelCase&sourceMap&-minimize&localIdentName=[hash:base64:8]', 'postcss-loader'],
      }),
    },
    {
      test: /\.gcss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?camelCase&sourceMap&-minimize', 'postcss-loader'],
      }),
    }
  );
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi],
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
      ignoreOrder: true,
    })
  );
}

module.exports = webpackConfig;
