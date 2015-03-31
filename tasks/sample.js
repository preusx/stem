var gulp   = require('gulp');

var config = require('./config');
var Task = require('./plugin/task');

module.exports = Task.extend({
  paths: {
    base        : [config.folder.dev + config.folder.],
    source      : config.folder.dev + config.folder. + ,
    dest        : config.folder.dist + config.folder.,
  },

  watch: config.folder.dev + config.folder.styl + '**/*.styl',

  pipes: {
    dev: function(pipe) {
      return pipe;
    }
  }
});