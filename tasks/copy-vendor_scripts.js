var gulp   = require('gulp');

var config = require('./config');
var CopyTask = require('./copy');

module.exports = CopyTask.extend({
  paths: {
    source: config.folder.dev + config.folder.js + 'vendor/**/*.*',
    dest:   config.folder.dist + config.folder.js + 'vendor/',
  },

  watch: config.folder.dev + config.folder.js + 'vendor/**/*.*',
});