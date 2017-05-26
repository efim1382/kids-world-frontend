/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config:project')
const argv = require('yargs').argv
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',
  isDemo: process.env.IS_DEMO || false,
  apiPath: process.env.API_PATH || 'http://localhost:8000/api/v1',
  fbAppId: process.env.FACEBOOK_APP_ID || '284585555286548',
  aviaryApiKey: process.env.AVIARY_API_KEY || '1cc3043ce2e049b097bdb63c7d4a6fab',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '.'),
  dir_src    : 'src',
  dir_dist   : 'dist',
  dir_vendor : 'dist/vendor-manifest.json',
  dir_public : 'src/public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel           : {},
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
debug(`API_PATH "${config.apiPath}"`)

// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  'API_PATH'     : JSON.stringify(config.apiPath),
  'IS_DEMO'      : JSON.stringify(config.isDemo),
  'FACEBOOK_APP_ID' : JSON.stringify(config.fbAppId),
  'AVIARY_API_KEY': JSON.stringify(config.aviaryApiKey),
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('./package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  src    : base.bind(null, config.dir_src),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist),
  vendor : base.bind(null, config.dir_vendor),
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments.config')
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
