var config = require('./config.js');
var gulp   = require('gulp');

var paths = {
  source: config.folder.dev + config.folder.js + 'vendor/**/*.*',
  destination: config.folder.dist + config.folder.js + 'vendor/',
};


var watch  = paths.source;


var dev    = function () {
  var plumber  = require('gulp-plumber');

  return gulp.src(paths.source)
    .pipe(config.WATCHING ? plumber({
      errorHandler: config.errorHandler,
    }) : config.noop())
    .pipe(gulp.dest(paths.destination));
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