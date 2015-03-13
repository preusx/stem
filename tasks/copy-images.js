var config = require('./config.js');
var gulp   = require('gulp');

var paths = {
  source: config.folder.dev + config.folder.img + '**/*.{png,jpg,gif,svg}',
  destination: config.folder.dist + config.folder.img,
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