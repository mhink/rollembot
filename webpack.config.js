const path = require('path')
const webpack = require('webpack')
const fetch = require('node-fetch')
const { map, fromPairs } = require('lodash')
const paths = {
  source:   path.resolve('src'),
  output:   path.resolve('dist'),
  modules:  path.resolve('node_modules')
}
const pkg = require('./package.json')

const additionalModules = {
  'auth0-api-jwt-rsa-validation': true,
  'auth0-authz-rules-api': true,
  'auth0-oauth2-express': true,
  'auth0-sandbox-ext': true,
  'detective': true,
  'sandboxjs': true,
  'webtask-tools': true
}

const fetchModules = fetch(pkg.webtaskDependenciesUrl)
  .then(res     => res.json())
  .then(json    => json.modules)
  .then(modules => fromPairs(map(modules, module => [module.name, true])))
  .then(modules => Object.assign({}, modules, additionalModules))

const webpackConfig = fetchModules.then(externals => ({
  target: 'node',
  context: paths.source,
  node: false,

  entry: {
    [pkg.name]: './main.js',
  },
  externals, // result of fetchModules promise

  output: {
    path:          paths.output,
    filename:      "[name].js",
    library:       true,
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],

  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  }
}))

module.exports = webpackConfig
