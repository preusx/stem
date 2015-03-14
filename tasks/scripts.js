var config = require('./config.js');
var gulp   = require('gulp');
var path   = require('path');

var paths = {
  base        : [config.folder.dev + config.folder.js],
  source      : config.folder.dev + config.folder.js + 'main.js',
  destination : config.folder.dist + config.folder.js,
  filename    : 'main.js',
};


var watch  = [
  config.folder.dev + config.folder.js + '**/*.js',
  '!' + config.folder.dev + config.folder.js + 'vendor/**/*.js'
];


var dev    = function () {
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

  var bundler = browserify({
    insertGlobals : false,
    paths: paths.base,
    // extensions: ['.coffee', '.js'],
    debug  : config.DEBUG
  })
  .transform({extensions: ['.coffee']}, coffeeify)
  .transform({extensions: ['.js']}, sweetiefy({
    sourceMap: false,
    modulesList: [
      './dev/js/macro/stem-js-macro/index.sjs',
      // Same as previous. Just for showing the possibilities.
      // [
      //   './dev/js/macro/stem-js-macro/macros/utility.sjs',
      //   './dev/js/macro/stem-js-macro/macros/operators.sjs',
      //   './dev/js/macro/stem-js-macro/macros/catch.sjs',
      //   './dev/js/macro/stem-js-macro/macros/arrow-function.sjs',
      //   './dev/js/macro/stem-js-macro/macros/decorator.sjs',
      //   './dev/js/macro/stem-js-macro/macros/for.sjs',
      //   './dev/js/macro/stem-js-macro/macros/enum.sjs',
      // ],
    ],
  }))
  .transform(babelify.configure({
    loose: 'all',
  }))
  .require(paths.source, { entry: true });

  var bundle = function() {
    var result = bundler
      .bundle()
      .on('error', config.errorHandlerBrowserify)
      .pipe(source(paths.filename))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }));

    if(!config.DEBUG) {
      result = result.pipe(uglify());
    }

    return result
      .pipe(sourcemaps.write())
      .pipe(size())
      .pipe(gulp.dest(paths.destination));
  };

  bundle().on('end', function() {
    // Adding my sweetjs runtime.
    var pt = path.normalize(__dirname + '../../' + config.folder.dev + '/macro');

    gulp.src([pt + '/runtime.js', paths.destination + paths.filename])
      .pipe(sourcemaps.init({
            loadMaps: true
          }))
      .pipe(concat(paths.filename))
      .pipe(sourcemaps.write())
      .pipe(size())
      .pipe(gulp.dest(paths.destination));
  });
  // console.dir(bundle());
};


var build  = dev; // function() {};



/**
 * Export
 * ======================================================================== */

module.exports = {
  watch: watch,
  dev:   dev,
  build: build,
};