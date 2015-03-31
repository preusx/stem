var gulp   = require('gulp');

var config = require('./config');
var Task = require('./plugin/task');

module.exports = Task.extend({
  paths: {
    source:      config.folder.dev + config.folder.styl + 'style.styl',
    dest:        config.folder.dist + config.folder.css,
  },

  watch: config.folder.dev + config.folder.styl + '**/*.styl',

  pipes: {
    dev: function(pipe) {
      var stylus    = require('gulp-stylus');
      var prefixer  = require('gulp-autoprefixer');
      var plumber   = require('gulp-plumber');
      var combineMq = require('gulp-combine-mq');

      return pipe.pipe(config.WATCHING ? plumber({
          errorHandler: config.errorHandler,
        }) : config.noop())
        .pipe(stylus({
          pretty: config.DEBUG,
          'include css': true
        }))
        .pipe(combineMq({
            beautify: true
        }))
        .pipe(prefixer());
    },

    build: function(pipe) {
      var csso = require('gulp-csso');

      return this.pipes.dev(pipe).pipe(csso(true));
    }
  }
});