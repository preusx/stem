var gulp   = require('gulp');

var config = require('./config');
var Task = require('./plugin/task');

module.exports = Task.extend({
  paths: {
    base: config.folder.dev + config.folder.jade,
    source: [
      config.folder.dev + config.folder.jade + 'templates/**/*.jade',
      '!' + config.folder.dev + config.folder.jade + 'templates/**/_*.jade'
    ],
    dest: config.folder.dist + config.folder.html,
  },

  watch: config.folder.dev + config.folder.jade + '**/*.jade',

  pipes: {
    dev: function(pipe) {
      var jade             = require('gulp-jade');
      var jadeAffected     = require('gulp-jade-find-affected');
      var jadeInheritance  = require('gulp-jade-inheritance');
      var jadeCompiler     = require('jade');
      var changed          = require('gulp-changed');
      var plumber          = require('gulp-plumber');

      return pipe
        .pipe(config.WATCHING ? plumber({
          errorHandler: config.errorHandler,
        }) : config.noop())
        .pipe(config.WATCHING ? changed(this.paths.dest, {
          extension: '.html'
        }) : config.noop())
        .pipe(jadeInheritance({
          basedir: this.paths.base,
        }))
        .pipe(jade({
          pretty: config.DEBUG,
          jade: jadeCompiler,
        }));
    }
  }
});