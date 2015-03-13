var config = require('./config.js');
var gulp   = require('gulp');

var paths = {
  base: config.folder.dev + config.folder.jade,
  source: [
    config.folder.dev + config.folder.jade + 'template/**/*.jade',
    '!' + config.folder.dev + config.folder.jade + 'template/**/_*.jade'
  ],
  destination: config.folder.dist + config.folder.html,
};


var watch  = config.folder.dev + config.folder.jade + '**/*.jade';


var dev    = function () {
  var jade             = require('gulp-jade');
  var jadeAffected     = require('gulp-jade-find-affected');
  var jadeInheritance  = require('gulp-jade-inheritance');
  var jadeCompiler     = require('jade');
  var changed          = require('gulp-changed');

  return gulp.src(paths.source)
    .pipe(config.WATCHING ? plumber({
      errorHandler: config.errorHandler,
    }) : config.noop())
    .pipe(config.WATCHING ? changed(paths.destination, {
      extension: '.html'
    }) : config.noop())
    .pipe(jadeInheritance({
      basedir: paths.base,
    }))
    .pipe(jade({
      pretty: config.DEBUG,
      jade: jadeCompiler,
    }))
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