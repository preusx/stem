var gulp   = require('gulp');
var path   = require('path');

var config = require('./config');
var Task = require('./plugin/task');

module.exports = Task.extend({
  paths: {
    base        : [config.folder.dev + config.folder.js],
    source      : config.folder.dev + config.folder.js + 'main.js',
    dest        : config.folder.dist + config.folder.js,
    filename    : 'main.js',
  },

  watch: [
    config.folder.dev + config.folder.js + '**/*.js',
    '!' + config.folder.dev + config.folder.js + 'vendor/**/*.js'
  ],

  pipes: {
    dev: function(pipe) {
      var browserify       = require('browserify');
      var coffeeify        = require('coffeeify');
      var sweetiefy        = require('./plugin/browserify-sweet.js');
      var uglify           = require('gulp-uglify');
      var babel            = require('gulp-babel');
      var babelify         = require('babelify');
      var sourcemaps       = require('gulp-sourcemaps');
      var buffer           = require('vinyl-buffer');
      var source           = require('vinyl-source-stream');
      var size             = require('gulp-size');
      var concat           = require('gulp-concat-sourcemap');

      var self = this;

      var bundler = browserify({
          insertGlobals : false,
          paths: this.paths.base,
          debug  : config.DEBUG
        })
        .transform({extensions: ['.coffee']}, coffeeify)
        .transform({extensions: ['.js']}, sweetiefy({
          sourceMap: false,
          modulesList: [
            './dev/js/macro/stem-js-macro/index.sjs',
          ],
        }))
        .transform(babelify.configure({
          loose: 'all',
        }))
        .require(this.paths.source, { entry: true });

      var bundle = function() {
          var result = bundler
            .bundle()
            .on('error', config.errorHandlerBrowserify)
            .pipe(source(self.paths.filename))
            .pipe(buffer())
            .pipe(sourcemaps.init({
              loadMaps: true
            }));

          if(!config.DEBUG) {
            result = result.pipe(uglify());
          }

          return result
            .pipe(sourcemaps.write())
            .pipe(size());
        };

      return bundle();
    }
  }
});