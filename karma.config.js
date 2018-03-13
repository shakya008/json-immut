const webpack = require('webpack');
const path = require('path');

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*const CopyWebpackPlugin = require('copy-webpack-plugin');*/

const NODE_ENV = 'test';

module.exports = (config) => {
  const coverage = config.singleRun ? ['coverage'] : [];
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-remap-istanbul',
      'karma-spec-reporter',
      'karma-chrome-launcher'
    ],

    // list of files / patterns to load in the browser
    files: [
      './test.entry.ts',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true
      }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       './test.entry.ts': ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js', '.json']
      },

      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          },
          {
            test: /\.html/,
            loader: 'raw-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
              'to-string-loader',
              { loader: 'css-loader' },
              'postcss-loader',
            ],
            exclude: /node_modules/
          },
          {
            enforce: 'post',
            test: /^(.(?!\.test))*\.ts$/,
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            },
            exclude:  [
                path.join(__dirname, "../node_modules")
            ]
        },
        ]
      },

      stats: { colors: true, reasons: true },

      plugins: [

        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.ts$/ }),

        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),

        new CheckerPlugin(),

        new HtmlWebpackPlugin({
          filename: './index.html',
          template: './index.html',
          inject: 'body',
          minify: false
        }),

        new webpack.NoEmitOnErrorsPlugin(),

          new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
      ]
    },

    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec']
      .concat(coverage)
      .concat(coverage.length > 0 ? ['karma-remap-istanbul'] : []),


    remapIstanbulReporter: {
      src: 'coverage/chrome/coverage-final.json',
      reports: {
        html: 'coverage'
      }
    },

    // only output json report to be remapped by remap-istanbul
    coverageReporter: {
      type: 'html',
      dir: './coverage/',
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0]; // returns 'chrome'
      }
    },

    // web server port
    port: 9876,

    captureTimeout: 20000,
    browserNoActivityTimeout: 80000,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable/disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // fix for Chrome 55
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    reportSlowerThan: 1000
  });
};
