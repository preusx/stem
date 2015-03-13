var config = require('./config.js');
var gulp   = require('gulp');

var paths = {
  source: config.folder.dev + config.folder.font + '**/*.{eot,otf,svg,ttf,woff}',
  destination: config.folder.dist + config.folder.font,
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