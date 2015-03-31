var gulp   = require('gulp');

var config = require('./config');
var Task = require('./plugin/task');

module.exports = Task.extend({
  paths: {
    source: '',
    dest:   ''
  },

  watch: '',

  pipes: {
    dev: function(pipe) {
    var plumber  = require('gulp-plumber');

    return pipe
      .pipe(config.WATCHING ? plumber({
        errorHandler: config.errorHandler,
      }) : config.noop())
    }
  }
});