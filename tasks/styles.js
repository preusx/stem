var config = require('./config.js');
var gulp   = require('gulp');


var paths = {
  source:      config.folder.dev + config.folder.styl + 'style.styl',
  destination: config.folder.dist + config.folder.css,
};


var watch  = config.folder.dev + config.folder.styl + '**/*.styl';


var dev    = function () {
  var stylus    = require('gulp-stylus');
  var prefixer  = require('gulp-autoprefixer');
  var plumber   = require('gulp-plumber');
  var combineMq = require('gulp-combine-mq');

  return gulp.src(paths.source)
    .pipe(config.WATCHING ? plumber({
      errorHandler: config.errorHandler,
    }) : config.noop())
    .pipe(stylus({
      pretty: config.DEBUG,
      'include css': true
    }))
    .pipe(combineMq({
        beautify: true
    }))
    .pipe(prefixer())
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